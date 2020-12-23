import { createSelector } from "@reduxjs/toolkit";
import { isEmpty, intersection, pick, values } from "ramda";
import { State } from "store/types";
import { getItemsInRange } from "store/utils";
import { getTables, getGenres, getMovies } from "./dataset";

export const getActiveFilters = ({ filters }: State) => filters;

export const getFilteredMovies = createSelector(
  getActiveFilters,
  getTables,
  getGenres,
  getMovies,
  (filters, tables, genres, movies) => {
    if (isEmpty(filters)) return [];

    let ids = Object.keys(movies);
    const { genre, revenue, date } = filters;
    const { byRevenue, byDate } = tables;

    if (genre) {
      ids = genres[genre];
    }

    if (revenue) {
      const [min, max] = revenue;
      ids = intersection(ids, getItemsInRange(min, max)(byRevenue));
    }

    if (date) {
      const [min, max] = date;
      ids = intersection(ids, getItemsInRange(min, max)(byDate));
    }

    return values(pick(ids)(movies));
  }
);
