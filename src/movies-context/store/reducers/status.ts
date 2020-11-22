import { createReducer, createAction } from "@reduxjs/toolkit";
import { Status } from "../types";

export const initialState = Status.IDLE;

const setStatus = createAction<Status>("status/set");

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setStatus, (_, { payload }) => payload);
});

export const actions = {
  setStatus,
};

export default reducer;
