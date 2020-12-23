import React from "react";
import { useSelector } from "react-redux";
import { getSelectedMovies } from "store/selectors";

export const PerformancePanel = () => {
  const selectedMovies = useSelector(getSelectedMovies);

  return (
    <section>
      <h1>Performance Panel</h1>
      {selectedMovies.map((movie) => (
        <p key={movie.id}>{movie.title}</p>
      ))}
    </section>
  );
};
