import { append, assoc, forEach, lensProp, map, pipe, prop, reduce, sortBy, values, view } from "ramda";
import { Movie, Movies } from "index.d";
import { DatasetGenreMap } from "store/types";

const appendMovieToGenreMap = <T>(prop: string, value: string, obj: T) => {
  const extended = pipe(view(lensProp(prop)), append(value) as (x: string[]) => string[])(obj);
  return assoc(prop, extended, obj);
};

const mapGenres = (acc: DatasetGenreMap, { id, genres }: Movie): DatasetGenreMap => {
  forEach((genre: string): void => {
    acc = appendMovieToGenreMap<DatasetGenreMap>(genre, id, acc);
  })(genres);

  return acc;
};

const buildDateTable: (movies: Array<Movie>) => Array<string> = pipe(
  sortBy(prop("releaseDate")),
  map(({ id, releaseDate }: Movie): string => `${releaseDate}|${id}`)
);

const buildRevenueTable: (movies: Array<Movie>) => Array<string> = pipe(
  sortBy(prop("total")),
  map(({ id, total }: Movie): string => `${total}|${id}`)
);

export const serializeMovies = (directory: Movies) => {
  const movies = values(directory);

  return {
    entities: {
      movies: directory,
      genres: reduce(mapGenres, {})(movies),
    },
    tables: {
      byDate: buildDateTable(movies),
      byRevenue: buildRevenueTable(movies),
    },
  };
};
