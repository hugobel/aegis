import { assoc, mergeDeepRight } from 'ramda';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status, Entities } from './types';

type CollectionPayload = Pick<Entities, 'version' | 'movies' | 'genres'>;

const initialState: Entities = {
  status: Status.IDLE,
  movies: {},
  genres: {},
};

const slice = createSlice({
  name: '@entities',
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<Status>) => assoc('status', payload)(state),
    setError: (state, { payload }: PayloadAction<string>) =>
      mergeDeepRight({ status: Status.ERROR, error: payload })(state),
    setCollection: (_, { payload }: PayloadAction<CollectionPayload>) => ({
      status: Status.UPDATED,
      ...payload,
    }),
  },
});

export const entitiesActions = slice.actions;
export default slice.reducer;
