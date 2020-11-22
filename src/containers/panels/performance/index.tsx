import React, { useContext } from "react";
import MoviesContext, { getSelectedMovies } from "movies-context";

export const PerformancePanel = () => {
  const { state } = useContext(MoviesContext);
  const selectedMovies = getSelectedMovies(state);

  return (
    <section>
      <h1>Performance Panel</h1>
      {selectedMovies.map((movie) => (
        <p key={movie.id}>{movie.title}</p>
      ))}
    </section>
  );
};
