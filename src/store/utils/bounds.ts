import { pipe, pathOr, split, head } from "ramda";
import { DatasetTable } from "store/types";

const getPosVal = (pos: number) => pipe(pathOr("", [pos]), split("|"), head, Number);

const getLowerBound = (table: DatasetTable, min: number, start = 0, end = table.length): number => {
  if (start >= end) return end;

  const mPos = Math.floor((start + end) / 2);
  const ltMin = getPosVal(mPos)(table) < min;

  return getLowerBound(table, min, ltMin ? mPos + 1 : start, ltMin ? end : mPos);
};

const getUpperBound = (table: DatasetTable, max: number, start = 0, end = table.length): number => {
  if (start >= end) return end;

  const mPos = Math.floor((start + end) / 2);
  const gtMax = getPosVal(mPos)(table) > max;

  return getUpperBound(table, max, gtMax ? start : mPos + 1, gtMax ? mPos : end);
};

export const getItemsInRange = (min: number, max: number) => (table: DatasetTable) =>
  table.slice(getLowerBound(table, min), getUpperBound(table, max)).map((hash) => hash.split("|")[1]);

export const bounds = {
  le: getLowerBound,
  ge: getUpperBound,
};
