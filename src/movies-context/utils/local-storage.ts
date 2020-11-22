import { Movies } from "index.d";

export const getLocalDataset = (): Movies => {
  const localDataset = localStorage.getItem("dataset");
  return localDataset ? JSON.parse(localDataset) : {};
};

export const storeLocalDataset = (dataset: Movies, version: string): void => {
  localStorage.setItem("dataset", JSON.stringify(dataset));
  localStorage.setItem("datasetVersion", version);
};
