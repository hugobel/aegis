import { createSelector } from "@reduxjs/toolkit";
import { sortBy, prop, pick, intersection, isEmpty } from "ramda";
import { getItemsInRange } from "../utils";
import { State } from "./types";

const getMovies = ({ movies }: State) => movies;
const getSelectedIds = ({ selected }: State) => selected;
const getDirectory = ({ directory }: State) => directory;
const getFilters = ({ filters }: State) => filters;

export const getSelectedMovies = createSelector(
  getMovies,
  getSelectedIds,
  (movies, selectedIds) => selectedIds.map((id) => movies[id])
);

export const getGenreList = createSelector(getDirectory, ({ byGenre }) =>
  sortBy(prop("title"))(
    Object.entries(byGenre).map(([title, ids]) => ({
      title,
      count: ids.length,
    }))
  )
);

export const getFilteredMovies = createSelector(
  getFilters,
  getDirectory,
  getMovies,
  (filters, directory, movies) => {
    if (isEmpty(filters)) return [];

    let ids = Object.keys(movies);
    const { genre, revenue, date } = filters;
    const { byGenre, byRevenue, byDate } = directory;

    if (genre) {
      ids = byGenre[genre];
    }

    if (revenue) {
      const [min, max] = revenue;
      ids = intersection(ids, getItemsInRange(min, max)(byRevenue));
    }

    if (date) {
      const [min, max] = date;
      ids = intersection(ids, getItemsInRange(min, max)(byDate));
    }

    return pick(ids)(movies);
  }
);

// TODO
export const getMoviesCoordinates = createSelector(getMovies, (movies) =>
  Object.values(movies).map(({ id }) => ({ id, x: 1, y: 1 }))
);
