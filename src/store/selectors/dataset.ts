import { createSelector } from '@reduxjs/toolkit';
import { prop, sortBy, toPairs, isEmpty } from 'ramda';
import { State } from 'store/types';
import { Optional } from 'shared/types';

const intToDate = (int: number) => {
  const date = `${String(int).slice(0, 4)}-${String(int).slice(4, 6)}-${String(int).slice(6, 8)}`;
  console.info(date);
  return new Date(date);
};

export const getMovies = ({ dataset }: State) => dataset.entities.movies;
export const getGenres = ({ dataset }: State) => dataset.entities.genres;
export const getDatasetVersion = ({ dataset }: State) => dataset.version;
export const getTables = ({ dataset }: State) => dataset.tables;
export const getDatesTable = ({ dataset }: State) => dataset.tables.byDate;
export const getRevenueTable = ({ dataset }: State) => dataset.tables.byRevenue;

export const getGenreList = createSelector(getGenres, (genres) =>
  sortBy(prop('title'))(
    toPairs(genres).map(([title, ids]) => ({
      title,
      count: ids.length,
    }))
  )
);

export const getDateExtent = createSelector(
  getDatesTable,
  (moviesByDate): Optional<[Date, Date]> => {
    if (isEmpty(moviesByDate)) return;
    return [intToDate(moviesByDate[0][0]), intToDate(moviesByDate[moviesByDate.length - 1][0])];
  }
);

export const getRevenueExtent = createSelector(
  getRevenueTable,
  (moviesByRevenue): Optional<[number, number]> => {
    if (isEmpty(moviesByRevenue)) return;
    return [0, moviesByRevenue[moviesByRevenue.length - 1][0]];
  }
);
