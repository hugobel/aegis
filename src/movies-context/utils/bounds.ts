import { pipe, pathOr, split, head } from "ramda";
import { SortedDirectory } from "../store/types";

const getPosVal = (pos: number) =>
  pipe(pathOr("", [pos]), split("|"), head, Number);

const getLowerBound = (
  dir: SortedDirectory,
  min: number,
  start = 0,
  end = dir.length
): number => {
  if (start >= end) return end;

  const mPos = Math.floor((start + end) / 2);
  const ltMin = getPosVal(mPos)(dir) < min;

  return getLowerBound(dir, min, ltMin ? mPos + 1 : start, ltMin ? end : mPos);
};

const getUpperBound = (
  dir: SortedDirectory,
  max: number,
  start = 0,
  end = dir.length
): number => {
  if (start >= end) return end;

  const mPos = Math.floor((start + end) / 2);
  const gtMax = getPosVal(mPos)(dir) > max;

  return getUpperBound(dir, max, gtMax ? start : mPos + 1, gtMax ? mPos : end);
};

export const getItemsInRange = (min: number, max: number) => (
  directory: SortedDirectory
) =>
  directory
    .slice(getLowerBound(directory, min), getUpperBound(directory, max))
    .map((hash) => hash.split("|")[1]);

export const bounds = {
  le: getLowerBound,
  ge: getUpperBound,
};
