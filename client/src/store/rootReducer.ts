import { combineReducers } from "@reduxjs/toolkit";
import regionsSlice from "@/features/Regions/regions.slice";

export const rootReducer = combineReducers({
  regions: regionsSlice,
});
