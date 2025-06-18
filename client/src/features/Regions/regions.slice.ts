import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getRegionData as regionDataAPI,
  getRoot as regionsAPI,
} from "./regions.api";
import { SLICE_NAME } from "./regions.constants";
import { RootState } from "@/store/store";
import { LoadStatus } from "./regions.enums";
import {
  ParameterDTO,
  ParameterEntities,
  Region,
  RegionDataThunkCfg,
  RegionDTO,
  RegionEntities,
  RegionID,
  RegionsSlice,
  RootEntities,
  RegionDataDTO,
  RegionDataEntity,
  RootDTO,
} from "./regions.types";

export const getRootInfo = createAsyncThunk<RootEntities>(
  `${SLICE_NAME}/root`,
  async (): Promise<RootEntities> => {
    const data: RootDTO = await regionsAPI();

    const regions: RegionEntities = data.regions.reduce<RegionEntities>(
      (acc: RegionEntities, { id, ...rest }: RegionDTO): RegionEntities => {
        acc[id] = {
          name: rest.name,
          data: [],
          createdAt: rest.created_at,
          status: LoadStatus.IDLE,
        };
        return acc;
      },
      {},
    );

    const parameters: ParameterEntities =
      data.parameters.reduce<ParameterEntities>(
        (
          acc: ParameterEntities,
          { id, ...rest }: ParameterDTO,
        ): ParameterEntities => {
          acc[id] = { ...rest };
          return acc;
        },
        {},
      );

    return { regions, parameters };
  },
);

export const getRegionData = createAsyncThunk<
  Region,
  RegionID,
  RegionDataThunkCfg
>(
  `${SLICE_NAME}/region`,
  async (regionID: RegionID): Promise<Region> => {
    const regionData: RegionDTO = await regionDataAPI(regionID);
    return {
      name: regionData.name,
      createdAt: regionData.created_at,
      data: regionData.data.map(
        (dto: RegionDataDTO): RegionDataEntity => ({
          id: dto.id,
          regionID: dto.region_id,
          parameterID: dto.parameter_id,
          value: dto.value,
          year: dto.year,
        }),
      ),
    };
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
    parametersMap: {},
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
      .addCase(getRootInfo.pending, (state): void => {
        state.status = LoadStatus.LOADING;
      })
      .addCase(getRootInfo.fulfilled, (state, action): void => {
        state.regionsMap = action.payload.regions;
        state.parametersMap = action.payload.parameters;
        state.status = LoadStatus.SUCCEEDED;
      })
      .addCase(getRootInfo.rejected, (state, action): void => {
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
export const selectParametersMap = (state: RootState): ParameterEntities =>
  state.regions.parametersMap;
export const selectSelectedRegion = (state: RootState): RegionID | null =>
  state.regions.selectedRegion;
export const selectSelectedRegionData = (
  state: RootState,
): Region | undefined => {
  const { selectedRegion, regionsMap } = state.regions;
  return selectedRegion ? regionsMap[selectedRegion] : undefined;
};

export const { selectRegion } = regionsSlice.actions;
export default regionsSlice.reducer;
