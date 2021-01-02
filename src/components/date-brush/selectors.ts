import { createSelector } from '@reduxjs/toolkit';
import { append } from 'ramda';
import { timeFormat, TimeInterval, timeMonth } from 'd3';
import { getActiveFilters, getDatesTable, getDateExtent } from 'store/selectors';
import { getLowerBound, getUpperBound } from 'store/utils';

const dateToInt = (date: Date) => +timeFormat('%Y%m%d')(date);
const quarterInterval = timeMonth.every(3) as TimeInterval;

const countByStep = (table: Array<[number, string]>) => (
  prev: Array<[label: string, count: number]>,
  start: Date
) => {
  const end = quarterInterval.ceil(new Date(+start + 1));
  const label = timeFormat('%Y Q%q')(start);
  const count = getUpperBound(table, dateToInt(end)) - getLowerBound(table, dateToInt(start));

  return append([label, count])(prev);
};

export const getDateFilter = createSelector(getActiveFilters, (filters) => filters.date);

export const getMovieCountByQuarter = createSelector(
  getDatesTable,
  getDateExtent,
  (moviesByDate, dateExtent) => {
    if (!dateExtent) return undefined;

    const [minDate, maxDate] = dateExtent;

    return quarterInterval
      .range(quarterInterval.floor(minDate), quarterInterval.ceil(maxDate))
      .reduce(countByStep(moviesByDate), []);
  }
);
