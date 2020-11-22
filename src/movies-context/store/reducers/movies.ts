import { createAction, createReducer } from "@reduxjs/toolkit";
import { Movies } from "index.d";

export const initialState: Movies = {};

export const setMovies = createAction<Movies>("movies/set");

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setMovies, (_, { payload }) => payload);
});

export const actions = {
  setMovies,
};

export default reducer;
