import { assoc, mergeDeepRight } from "ramda";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DatasetState, Status, CollectionPayload } from "./types";

const initialState: DatasetState = {
  version: null,
  status: Status.IDLE,
  entities: {
    movies: {},
    genres: {},
  },
  tables: {
    byDate: [],
    byRevenue: [],
  },
  error: null,
};

const slice = createSlice({
  name: "@dataset",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<Status>) => assoc("status", payload)(state),
    setError: (state, { payload }: PayloadAction<string>) =>
      mergeDeepRight({ status: Status.ERROR, error: payload })(state),
    setCollection: (_, { payload }: PayloadAction<CollectionPayload>) => ({
      status: Status.UPDATED,
      error: null,
      ...payload,
    }),
  },
});

export const { actions } = slice;
export default slice.reducer;
