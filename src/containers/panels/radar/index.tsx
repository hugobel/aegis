import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "store/selectors";
import { selected } from "store/actions";

export const RadarPanel = () => {
  const dispatch = useDispatch();
  const movies = useSelector(getMovies);

  return (
    <section>
      <h1>Radar Panel</h1>
      {Object.values(movies).map(({ id, title }, i) => (
        <p key={id} onClick={() => dispatch(selected.append(id))}>{`${i} / ${title}`}</p>
      ))}
    </section>
  );
};
