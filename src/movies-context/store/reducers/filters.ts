import { createAction, createReducer } from "@reduxjs/toolkit";
import { dissoc } from "ramda";
import { Filter, FilterKeys } from "../types";

export const initialState = {};

export const addFilter = createAction<Filter>("filters/add");
export const removeFilter = createAction<FilterKeys>("filters/remove");
export const clearFilters = createAction("filters/clear");

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addFilter, (state, { payload }) => ({
      ...state,
      [payload.type]: payload.criteria,
    }))
    .addCase(removeFilter, (state, { payload }) => dissoc(payload)(state))
    .addCase(clearFilters, () => ({}));
});

export const actions = {
  addFilter,
  removeFilter,
  clearFilters,
};

export default reducer;
