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
} from 'ramda';
import { Movie, Movies } from 'index.d';
import { GenreDirectory } from 'store/types';

const appendMovieToGenreMap = <T>(prop: string, value: string, obj: T) => {
  const extended = pipe(view(lensProp(prop)), append(value) as (x: string[]) => string[])(obj);
  return assoc(prop, extended, obj);
};

const mapGenres = (acc: GenreDirectory, { id, genres }: Movie): GenreDirectory => {
  forEach((genre: string): void => {
    acc = appendMovieToGenreMap<GenreDirectory>(genre, id, acc);
  })(genres);

  return acc;
};

const buildDateTable: (movies: Array<Movie>) => Array<[number, string]> = pipe(
  sortBy(prop('releaseDate')),
  map(({ id, releaseDate }: Movie) => [releaseDate, id])
);

const buildRevenueTable: (movies: Array<Movie>) => Array<[number, string]> = pipe(
  sortBy(prop('total')),
  map(({ id, total }: Movie) => [total, id])
);

export const serializeMovies = (directory: Movies) => {
  const movies = values(directory);

  return {
    // entities: {
    movies: directory,
    genres: reduce(mapGenres, {})(movies),
    // },
    // tables: {
    //   byDate: buildDateTable(movies),
    //   byRevenue: buildRevenueTable(movies),
    // },
  };
};
