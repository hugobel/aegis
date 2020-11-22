import { useEffect, Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { pipe } from "ramda";
import { actions, State, Status } from "./store";
import {
  getVersionToUpdate,
  fetchDataset,
  storeLocalDataset,
  getLocalDataset,
} from "./utils";

const { setStatus, setMovies } = actions;

const useMoviesService = (state: State, dispatch: Dispatch<AnyAction>) => {
  const { status } = state;

  useEffect(() => {
    const fetchAPI = async (version: string) => {
      dispatch(setStatus(Status.FETCHING_DATASET));

      try {
        const dataset = await fetchDataset(version);
        dispatch(setStatus(Status.SAVING_LOCALLY));

        storeLocalDataset(dataset, version);
        dispatch(setStatus(Status.READY));
      } catch {
        dispatch(setStatus(Status.ERROR));
      }
    };

    const compareVersions = async () => {
      dispatch(setStatus(Status.FETCHING_VERSION));

      try {
        const version = await getVersionToUpdate();

        if (!!version) {
          fetchAPI(version);
          return;
        }
      } catch {
        dispatch(setStatus(Status.ERROR));
        return;
      }

      dispatch(setStatus(Status.READY));
    };

    compareVersions();
  }, [dispatch]);

  // Once dataset is in LocalStorage
  useEffect(() => {
    if (status === Status.READY) {
      pipe(getLocalDataset, setMovies, dispatch)();
    }
  }, [status, dispatch]);
};

export default useMoviesService;
