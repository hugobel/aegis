import { Movies } from "index.d";

const DATASET_MOVIES = "AEGIS_DATASET_MOVIES";
const DATASET_VERSION = "AEGIS_DATASET_VERSION";

export const getPersistentDataset = (): { version: string; movies: Movies } | null => {
  const localVersion = localStorage.getItem(DATASET_VERSION);
  const localDataset = localStorage.getItem(DATASET_MOVIES);

  if (!localDataset || !localVersion) return null;

  return {
    version: localVersion,
    movies: JSON.parse(localDataset) as Movies,
  };
};

export const storePersistentDataset = (dataset: Movies, version: string): void => {
  localStorage.setItem(DATASET_MOVIES, JSON.stringify(dataset));
  localStorage.setItem(DATASET_VERSION, version);
};
