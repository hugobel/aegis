import { createSelector } from "@reduxjs/toolkit";
import { pick, values } from "ramda";
import { State } from "store/types";
import { getMovies } from "./dataset";

export const getSelectedIds = ({ selected }: State) => selected;

export const getSelectedMovies = createSelector(getMovies, getSelectedIds, (movies, ids) =>
  values(pick(ids)(movies))
);
