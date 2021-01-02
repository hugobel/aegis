import { createSelector } from '@reduxjs/toolkit';
import { range, format } from 'd3';
import { append } from 'ramda';
import { getRevenueTable, getRevenueExtent } from 'store/selectors';
import { getLowerBound, getUpperBound } from 'store/utils';

const STEP = 5e7;

const countByStep = (table: Array<[number, string]>) => (
  prev: Array<[label: string, count: number]>,
  lowerLimit: number
) => {
  const upperLimit = lowerLimit + STEP;
  const label = `${format('~s')(lowerLimit)} - ${format('~s')(upperLimit)}`;
  const count = getUpperBound(table, upperLimit) - getLowerBound(table, lowerLimit);

  return append([label, count])(prev);
};

export const getMovieCountByRevenue = createSelector(
  getRevenueTable,
  getRevenueExtent,
  (moviesByRevenue, revenueExtent) => {
    return !revenueExtent
      ? undefined
      : range(revenueExtent[0], revenueExtent[1], STEP).reduce(countByStep(moviesByRevenue), []);
  }
);
