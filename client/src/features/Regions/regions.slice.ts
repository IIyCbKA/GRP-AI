import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getRegions as regionsAPI,
  getRegionData as regionDataAPI,
} from "./regions.api";
import { SLICE_NAME } from "./regions.constants";
import { RootState } from "@/store/store";
import { LoadStatus } from "./regions.enums";
import {
  RegionData,
  RegionCreds,
  RegionsMap,
  RegionsSlice,
} from "./regions.types";

export const getRegionsMap = createAsyncThunk<RegionsMap>(
  `${SLICE_NAME}/regions`,
  async (): Promise<RegionsMap> => {
    const raw: RegionsMap = await regionsAPI();

    return Object.fromEntries(
      Object.entries(raw).map(([id, region]: [string, any]): [string, any] => [
        id,
        { ...region, status: LoadStatus.IDLE },
      ]),
    );
  },
);

export const getRegionData = createAsyncThunk<RegionData, RegionCreds>(
  `${SLICE_NAME}/region`,
  async (creds: RegionCreds): Promise<RegionData> => {
    return await regionDataAPI(creds);
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
    selectRegion: (state, action): void => {
      state.selectedRegion = action.payload.regionID;
    },
  },
  extraReducers: (builder): void => {
    builder
      .addCase(getRegionsMap.pending, (state): void => {
        state.status = LoadStatus.LOADING;
      })
      .addCase(getRegionsMap.fulfilled, (state, action): void => {
        state.regionsMap = action.payload;
        state.status = LoadStatus.SUCCEEDED;
      })
      .addCase(getRegionsMap.rejected, (state, action): void => {
        state.status = LoadStatus.FAILED;
        state.error = action.error.message;
      })
      .addCase(getRegionData.pending, (state, action): void => {
        const regionID = action.meta.arg.regionID;

        if (state.regionsMap[regionID]) {
          state.regionsMap[regionID].status = LoadStatus.LOADING;
        }
      })
      .addCase(getRegionData.fulfilled, (state, action): void => {
        const regionID = action.meta.arg.regionID;

        /* if region wasn't in state, but he was in server - adding record */
        state.regionsMap[regionID] = action.payload;
      })
      .addCase(getRegionData.rejected, (state, action): void => {
        const regionID = action.meta.arg.regionID;

        if (state.regionsMap[regionID]) {
          state.regionsMap[regionID].status = LoadStatus.FAILED;
        }
      });
  },
});

export const selectRegionsStatus = (state: RootState): LoadStatus =>
  state.regions.status;
export const selectRegionsMap = (state: RootState): RegionsMap =>
  state.regions.regionsMap;

export const { selectRegion } = regionsSlice.actions;
export default regionsSlice.reducer;
