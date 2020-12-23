import { takeLast } from "ramda";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const MAX_SELECTED = 5;

export const initialState: Array<string> = [];

const slice = createSlice({
  name: "@selected",
  initialState,
  reducers: {
    append: (state, { payload }: PayloadAction<string>) => {
      const selectedIds = new Set(state).add(payload);
      return takeLast(MAX_SELECTED)(Array.from(selectedIds));
    },
    remove: (state, { payload }: PayloadAction<string>) => {
      const selectedIds = new Set(state);
      selectedIds.delete(payload);
      return Array.from(selectedIds);
    },
    clear: () => [],
  },
});

export const { actions } = slice;
export default slice.reducer;
