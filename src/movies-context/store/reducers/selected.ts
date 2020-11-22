import { createAction, createReducer } from "@reduxjs/toolkit";
import { takeLast } from "ramda";

const MAX_SELECTED = 5;

export const initalState: Array<string> = [];

const appendSelected = createAction<string>("selected/append");
const removeSelected = createAction<string>("selected/remove");
const clearSelected = createAction<void>("selected/clear");

const reducer = createReducer(initalState, (builder) => {
  builder
    .addCase(appendSelected, (state, { payload }) => {
      const selectedIds = new Set(state).add(payload);
      return takeLast(MAX_SELECTED)(Array.from(selectedIds));
    })
    .addCase(removeSelected, (state, { payload }) => {
      const selectedIds = new Set(state);
      selectedIds.delete(payload);
      return Array.from(selectedIds);
    })
    .addCase(clearSelected, (state, { payload }) => []);
});

export const actions = {
  appendSelected,
  removeSelected,
  clearSelected,
};

export default reducer;
