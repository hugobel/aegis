export type Range = [number, number];

export type NullableRange = Range | null;

export type Movie = {
  id: string;
  title: string;
  revenue: Array<number>;
  // total: number;
  genres: Array<string>;
  releaseDate: string;
};

export type Movies = Record<string, Movie>;
