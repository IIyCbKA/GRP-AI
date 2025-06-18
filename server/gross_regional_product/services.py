from pathlib import Path
import json, numpy as np, torch, torch.nn as nn, pandas as pd

from .models import Data
from .constants import *

if hasattr(torch, "xpu") and torch.xpu.is_available():
  DEVICE = torch.device("xpu")
else:
  DEVICE = torch.device("cpu")

_ASSETS = Path(__file__).resolve().parent / "model_assets"


class RegionForecastLSTM(nn.Module):
  def __init__(
    self,
    n_regions: int,
    in_dim: int,
    embed_dim: int = 10,
    hid_dim: int = 50
  ):
    super().__init__()
    self.region_emb = nn.Embedding(n_regions, embed_dim)
    self.lstm = nn.LSTM(in_dim + embed_dim, hid_dim, batch_first=True)
    self.fc = nn.Linear(hid_dim, in_dim)

  def forward(self, r_idx: torch.Tensor, x: torch.Tensor) -> torch.Tensor:
    e = self.region_emb(r_idx).unsqueeze(1).expand(-1, x.size(1), -1)
    _, (h_n, _) = self.lstm(torch.cat([x, e], dim=2))

    return self.fc(h_n[-1])


_model = None
_scaler = None
_meta: dict[str, object] = {}


def lazy_load():
  global _model, _scaler, _meta
  if _model is not None:
    return

  with open(_ASSETS / MODEL_META_FILENAME, encoding="utf-8") as fp:
    _meta = json.load(fp)
  mean = np.load(_ASSETS / PARAMS_MEANS_FILENAME)
  std = np.load(_ASSETS / PARAMS_STDS_FILENAME)

  import sklearn.preprocessing as skp
  _scaler = skp.StandardScaler()
  _scaler.mean_, _scaler.scale_, _scaler.var_ = mean, std, std ** 2

  in_dim = len(_meta["param_order"]) if "param_order" in _meta else len(mean)
  _model = RegionForecastLSTM(len(_meta["region_to_idx"]), in_dim)
  _model.load_state_dict(torch.load(
    _ASSETS / FORECAST_MODEL_FILENAME,
    map_location=DEVICE)
  )
  _model.to(DEVICE).eval()


def predict_region_period(
  region_id: int,
  start_year: int,
  period: int,
  window: int = LOOKBACK_YEARS
) -> list[dict[str, float]]:
  lazy_load()
  r2i = {int(k): v for k, v in _meta["region_to_idx"].items()}
  if region_id not in r2i:
    raise ValueError("Регион не обучался")

  hist_from = start_year - window
  qs = (Data.objects.filter(region_id=region_id, year__range=(
    hist_from, start_year - 1)).select_related("parameter").order_by("year"))

  df = (
    pd.DataFrame.from_records(qs.values("year", "parameter_id", "value")).pivot(
      index="year", columns="parameter_id", values="value"))

  if df.shape[0] < window:
    raise ValueError(
      f"Недостаточно данных: нужно ≥{window} лет до {start_year}")

  df = df.reindex(range(hist_from, start_year))
  df = df.interpolate(limit_direction="both").fillna(df.mean())

  seq_norm = _scaler.transform(df.values)
  param_ids = df.columns.tolist()

  out: list[dict[str, float]] = []
  reg_tensor = torch.tensor([r2i[region_id]], dtype=torch.long, device=DEVICE)

  for step in range(period):
    x_tensor = torch.tensor(seq_norm, dtype=torch.float32).unsqueeze(0).to(DEVICE)
    with torch.no_grad():
      pred_norm = _model(reg_tensor, x_tensor).cpu().numpy().squeeze()
    pred = pred_norm * _scaler.scale_ + _scaler.mean_

    target_year = start_year + step
    out.append({"year": target_year,
       **{int(pid): float(val) for pid, val in zip(param_ids, pred)}})

    seq_norm = np.vstack([seq_norm[1:], pred_norm])

  return out
