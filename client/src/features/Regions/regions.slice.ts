import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getRegionData as regionDataAPI,
  getRegions as regionsAPI,
} from "./regions.api";
import { SLICE_NAME } from "./regions.constants";
import { RootState } from "@/store/store";
import { LoadStatus } from "./regions.enums";
import {
  Region,
  RegionDataThunkCfg,
  RegionDTO,
  RegionEntities,
  RegionID,
  RegionsSlice,
} from "./regions.types";

export const getAllRegions = createAsyncThunk<RegionEntities>(
  `${SLICE_NAME}/regions`,
  async (): Promise<RegionEntities> => {
    const list: RegionDTO[] = await regionsAPI();

    return list.reduce<RegionEntities>(
      (acc: RegionEntities, { id, ...rest }: RegionDTO): RegionEntities => {
        acc[id] = { ...rest, status: LoadStatus.IDLE };
        return acc;
      },
      {},
    );
  },
);

export const getRegionData = createAsyncThunk<
  Region,
  RegionID,
  RegionDataThunkCfg
>(
  `${SLICE_NAME}/region`,
  async (regionID: RegionID): Promise<Region> => {
    return await regionDataAPI(regionID);
  },
  {
    condition: (regionID: RegionID, { getState }): boolean => {
      const { regionsMap } = getState().regions;
      const region: Region = regionsMap[regionID];
      return (
        region &&
        (region.status === LoadStatus.IDLE ||
          region.status === LoadStatus.FAILED)
      );
    },
  },
);

const regionsSlice = createSlice({
  name: SLICE_NAME,
  initialState: {
    regionsMap: {},
    selectedRegion: null,
    status: LoadStatus.IDLE,
  } as RegionsSlice,
  reducers: {
    selectRegion: (state, action: PayloadAction<RegionID>): void => {
      state.selectedRegion = action.payload;
    },
  },
  extraReducers: (builder): void => {
    builder
      .addCase(getAllRegions.pending, (state): void => {
        state.status = LoadStatus.LOADING;
      })
      .addCase(getAllRegions.fulfilled, (state, action): void => {
        state.regionsMap = action.payload;
        state.status = LoadStatus.SUCCEEDED;
      })
      .addCase(getAllRegions.rejected, (state, action): void => {
        state.status = LoadStatus.FAILED;
        state.error = action.error.message;
      })
      .addCase(getRegionData.pending, (state, action): void => {
        const regionID = action.meta.arg;

        state.regionsMap[regionID].status = LoadStatus.LOADING;
      })
      .addCase(getRegionData.fulfilled, (state, action): void => {
        const regionID = action.meta.arg;

        state.regionsMap[regionID] = action.payload;
        state.regionsMap[regionID].status = LoadStatus.SUCCEEDED;
      })
      .addCase(getRegionData.rejected, (state, action): void => {
        const regionID = action.meta.arg;

        state.regionsMap[regionID].status = LoadStatus.FAILED;
      });
  },
});

export const selectRegionsStatus = (state: RootState): LoadStatus =>
  state.regions.status;
export const selectRegionsMap = (state: RootState): RegionEntities =>
  state.regions.regionsMap;
export const selectSelectedRegion = (state: RootState): string | null =>
  state.regions.selectedRegion;

export const { selectRegion } = regionsSlice.actions;
export default regionsSlice.reducer;
