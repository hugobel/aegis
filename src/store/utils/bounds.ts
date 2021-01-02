import { pipe, pathOr, head, last } from 'ramda';
import { SortedTable } from 'store/types';

const getPosVal = (pos: number) => pipe(pathOr([], [pos]), head, Number);

export const getLowerBound = (table: SortedTable, min: number, start = 0, end = table.length): number => {
  if (start >= end) return end;

  const mPos = Math.floor((start + end) / 2);
  const ltMin = getPosVal(mPos)(table) < min;

  return getLowerBound(table, min, ltMin ? mPos + 1 : start, ltMin ? end : mPos);
};

export const getUpperBound = (table: SortedTable, max: number, start = 0, end = table.length): number => {
  if (start >= end) return end;

  const mPos = Math.floor((start + end) / 2);
  const gtMax = getPosVal(mPos)(table) >= max;

  return getUpperBound(table, max, gtMax ? start : mPos + 1, gtMax ? mPos : end);
};

export const getItemsInRange = (min: number, max: number) => (table: SortedTable) =>
  table.slice(getLowerBound(table, min), getUpperBound(table, max)).map<string>(last);

export const bounds = {
  le: getLowerBound,
  ge: getUpperBound,
};
