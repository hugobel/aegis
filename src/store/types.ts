import { ThunkAction, AnyAction } from "@reduxjs/toolkit";
import reducer from "./reducers";
import { Status, GenreDirectory, SortedTable } from "./reducers/dataset/types";

export { Status as DatasetStatus };
export type DatasetTable = SortedTable;
export type DatasetGenreMap = GenreDirectory;
export type State = ReturnType<typeof reducer>;
export type StoreThunk = ThunkAction<void, State, null, AnyAction>;
