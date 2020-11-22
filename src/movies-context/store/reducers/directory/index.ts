import { createReducer } from "@reduxjs/toolkit";
import { setMovies } from "../movies";
import { buildDirectories } from "./utils";
import { Directory } from "./types";

export const initialState: Directory = {
  byDate: [],
  byTitle: [],
  byRevenue: [],
  byGenre: {},
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setMovies, (_, { payload }) => buildDirectories(payload));
});

export * from "./types";
export default reducer;
