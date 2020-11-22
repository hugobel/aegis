import React, { useContext } from "react";
import MoviesContext, { getMoviesCoordinates } from "movies-context";

export const RadarPanel = () => {
  const { state, selectMovie } = useContext(MoviesContext);
  const coordinates = getMoviesCoordinates(state);

  return (
    <section>
      <h1>Radar Panel</h1>
      {coordinates.map(({ id, x, y }, i) => (
        <p key={id} onClick={() => selectMovie(id)}>{`${i}/${x}/${y}`}</p>
      ))}
    </section>
  );
};
