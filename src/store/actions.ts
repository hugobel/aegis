import { actions as datasetActions } from "store/reducers/dataset";
import { actions as filtersActions } from "store/reducers/filters";
import { actions as selectedActions } from "store/reducers/selected";
import { getDatasetVersion } from "store/selectors";
import { StoreThunk, DatasetStatus } from "store/types";
import { compareVersions, fetchMovies, serializeMovies, storePersistentDataset } from "store/utils";

const { setStatus, setCollection, setError } = datasetActions;

export const reconcile = (): StoreThunk => async (dispatch, getState) => {
  dispatch(setStatus(DatasetStatus.FETCHING));

  try {
    const localVersion = getDatasetVersion(getState());
    const version = await compareVersions(localVersion);

    if (!version) {
      dispatch(setStatus(DatasetStatus.UPDATED));
    } else {
      const movies = await fetchMovies(version);

      dispatch(setCollection({ version, ...serializeMovies(movies) }));
      storePersistentDataset(movies, version);
    }
  } catch (e) {
    console.error(e);
    dispatch(setError("DEMO"));
  }
};

export const dataset = { ...datasetActions, reconcile };
export const filters = filtersActions;
export const selected = selectedActions;
