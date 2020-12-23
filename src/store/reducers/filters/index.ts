import { dissoc } from "ramda";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FiltersState, Filter } from "./types";

const initialState: FiltersState = {};

const slice = createSlice({
  name: "@filters",
  initialState,
  reducers: {
    append: (state, { payload }: PayloadAction<Filter>) => ({
      ...state,
      [payload.type]: payload.criteria,
    }),
    remove: (state, { payload }: PayloadAction<keyof FiltersState>) => dissoc(payload)(state),
    clear: () => initialState,
  },
});

export const { actions } = slice;
export default slice.reducer;
