import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers';
import { getPersistentDataset, serializeMovies } from './utils';

const getPreloadedState = () => {
  const storedDataset = getPersistentDataset();
  if (!storedDataset) return;

  const { movies, version } = storedDataset;

  return {
    entities: {
      version,
      ...serializeMovies(movies),
    },
  };
};

const store = configureStore({
  reducer,
  preloadedState: getPreloadedState(),
});

export default store;
