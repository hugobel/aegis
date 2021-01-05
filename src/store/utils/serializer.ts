import { append, assoc, forEach, lensProp, pipe, reduce, values, view } from 'ramda';
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

export const serializeMovies = (directory: Movies) => {
  const movies = values(directory);

  return {
    movies: directory,
    genres: reduce(mapGenres, {})(movies),
  };
};
