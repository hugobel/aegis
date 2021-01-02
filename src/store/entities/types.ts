import { Movies } from 'index.d';

export enum Status {
  IDLE = 'idle',
  FETCHING = 'fetching',
  UPDATED = 'updated',
  ERROR = 'error',
}

export type Entities = {
  status: Status;
  version?: string;
  error?: string;
  movies: Movies;
  genres: Record<string, Array<string>>;
};
