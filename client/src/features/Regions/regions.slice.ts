import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getRegions as regionsAPI,
  getRegionData as regionDataAPI,
} from "./regions.api";
import { SLICE_NAME } from "./regions.constants";
import { RootState } from "@/store/store";
import { LoadStatus } from "./regions.enums";
import {
  Region,
  RegionCreds,
  RegionEntities,
  RegionsSlice,
  RegionDTO,
  RegionID,
} from "./regions.types";

export const getAllRegions = createAsyncThunk(
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

export const getRegionData = createAsyncThunk(
  `${SLICE_NAME}/region`,
  async (creds: RegionCreds): Promise<Region> => {
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
        const regionID = action.meta.arg.regionID;

        if (state.regionsMap[regionID]) {
          state.regionsMap[regionID].status = LoadStatus.LOADING;
        }
      })
      .addCase(getRegionData.fulfilled, (state, action): void => {
        const regionID = action.meta.arg.regionID;

        /* if region wasn't in state, but he was in server - adding record */
        state.regionsMap[regionID] = action.payload;
        state.regionsMap[regionID].status = LoadStatus.SUCCEEDED;
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
export const selectRegionsMap = (state: RootState): RegionEntities =>
  state.regions.regionsMap;
export const selectSelectedRegion = (state: RootState): string | null =>
  state.regions.selectedRegion;

export const { selectRegion } = regionsSlice.actions;
export default regionsSlice.reducer;
