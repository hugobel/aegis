import { combineReducers } from "@reduxjs/toolkit";
import * as status from "./reducers/status";
import * as movies from "./reducers/movies";
import * as selected from "./reducers/selected";
import * as directory from "./reducers/directory";
import * as filters from "./reducers/filters";

export const initialState = {
  status: status.initialState,
  movies: movies.initialState,
  selected: selected.initalState,
  directory: directory.initialState,
  filters: filters.initialState,
};

const reducer = combineReducers({
  status: status.default,
  movies: movies.default,
  selected: selected.default,
  directory: directory.default,
  filters: filters.default,
});

export * from "./types";

export const actions = {
  ...status.actions,
  ...movies.actions,
  ...selected.actions,
  ...filters.actions,
};

export * from "./selectors";

export default reducer;
