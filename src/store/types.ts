import { ThunkAction, AnyAction } from '@reduxjs/toolkit';
import reducer from './reducers';

export { Status as DatasetStatus } from './reducers/dataset/types';
export type { GenreDirectory, SortedTable } from './reducers/dataset/types';
export type State = ReturnType<typeof reducer>;
export type StoreThunk = ThunkAction<void, State, null, AnyAction>;
