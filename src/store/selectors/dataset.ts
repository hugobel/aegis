import { createSelector } from "@reduxjs/toolkit";
import { prop, sortBy, toPairs } from "ramda";
import { State } from "store/types";

export const getMovies = ({ dataset }: State) => dataset.entities.movies;
export const getGenres = ({ dataset }: State) => dataset.entities.genres;
export const getDatasetVersion = ({ dataset }: State) => dataset.version;
export const getTables = ({ dataset }: State) => dataset.tables;

export const getGenreList = createSelector(getGenres, (genres) =>
  sortBy(prop("title"))(
    toPairs(genres).map(([title, ids]) => ({
      title,
      count: ids.length,
    }))
  )
);
