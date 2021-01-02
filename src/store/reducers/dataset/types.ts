import { Movies } from 'index.d';

export enum Status {
  IDLE = 'idle',
  FETCHING = 'fetching',
  UPDATED = 'updated',
  ERROR = 'error',
}

export type SortedTable = Array<[number, string]>;

export type GenreDirectory = Record<string, Array<string>>;

export type DatasetState = {
  version: string | null;
  status: Status;
  entities: {
    movies: Movies;
    genres: GenreDirectory;
  };
  tables: {
    byDate: SortedTable;
    byRevenue: SortedTable;
  };
  error: string | null;
};

export type CollectionPayload = Pick<DatasetState, 'version' | 'entities' | 'tables'>;
