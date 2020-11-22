import {
  append,
  assoc,
  forEach,
  lensProp,
  map,
  pipe,
  prop,
  reduce,
  sortBy,
  values,
  view,
} from "ramda";
import { GenreMap, Directory } from "./types";
import { Movie, Movies } from "index.d";

const appendMovieToGenreMap = (prop: string, value: string, obj: GenreMap) => {
  const extended = pipe(
    view(lensProp(prop)),
    append(value) as (x: string[]) => string[]
  )(obj);
  return assoc(prop, extended, obj);
};

const mapGenres = (acc: GenreMap, { id, genres }: Movie): GenreMap => {
  forEach((genre: string): void => {
    acc = appendMovieToGenreMap(genre, id, acc);
  })(genres);

  return acc;
};

const buildTitleMap: (entity: Array<Movie>) => Array<string> = map(
  ({ id, title }) => `${title.replace(/\W/g, "").toLowerCase()}|${id}`
);

const buildDateMap: (movies: Array<Movie>) => Array<string> = pipe(
  sortBy(prop("releaseDate")),
  map(({ id, releaseDate }: Movie): string => `${releaseDate}|${id}`)
);

const buildRevenueMap: (movies: Array<Movie>) => Array<string> = pipe(
  sortBy(prop("total")),
  map(({ id, total }: Movie): string => `${total}|${id}`)
);

export const buildDirectories = (collection: Movies): Directory => {
  const movies = values(collection);

  return {
    byTitle: buildTitleMap(movies),
    byDate: buildDateMap(movies),
    byGenre: reduce(mapGenres, {})(movies),
    byRevenue: buildRevenueMap(movies),
  };
};
