export type Optional<T> = T | undefined;

export type Movie = {
  id: string;
  title: string;
  revenue: Array<number>;
  genres: Array<string>;
  releaseDate: string;
};
