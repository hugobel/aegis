import React, { createContext, FunctionComponent, useReducer } from "react";
import useMoviesService from "./use-movies-service";
import reducer, {
  initialState,
  State,
  actions,
  Filter,
  FilterKeys,
} from "./store";

export type Context = {
  state: State;
  selectMovie: (id: string) => void;
  addFilter: (filter: Filter) => void;
  removeFilter: (name: FilterKeys) => void;
  clearFilters: () => void;
};

const MoviesContext = createContext({} as Context);

export const MoviesProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useMoviesService(state, dispatch);

  return (
    <MoviesContext.Provider
      value={{
        state,
        selectMovie: (id: string) => dispatch(actions.appendSelected(id)),
        addFilter: (filter: Filter) => dispatch(actions.addFilter(filter)),
        removeFilter: (name: FilterKeys) =>
          dispatch(actions.removeFilter(name)),
        clearFilters: () => dispatch(actions.clearFilters()),
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export * from "./store";
export default MoviesContext;
