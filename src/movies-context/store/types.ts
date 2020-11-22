import { Movies } from "index.d";
import { Directory } from "./reducers/directory";

export * from "./reducers/directory";

export type FilterKeys = "date" | "revenue" | "genre";

export type DateFilter = { type: "date"; criteria: [number, number] };

export type RevenueFilter = { type: "revenue"; criteria: [number, number] };

export type GenreFilter = { type: "genre"; criteria: string };

export type Filter = DateFilter | GenreFilter | RevenueFilter;

export enum Status {
  IDLE,
  FETCHING_VERSION,
  FETCHING_DATASET,
  SAVING_LOCALLY,
  READY,
  ERROR,
}

export type State = {
  status: Status;
  movies: Movies;
  selected: Array<string>;
  directory: Directory;
  filters: {
    date?: [number, number];
    revenue?: [number, number];
    genre?: string;
  };
};
