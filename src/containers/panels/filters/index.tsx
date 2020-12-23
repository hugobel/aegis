import React, { FormEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filters as filterActions } from "store/actions";
import { getGenreList, getActiveFilters } from "store/selectors";

export const FiltersPanel = () => {
  const [min, setMin] = useState((0).toString());
  const [max, setMax] = useState((1e9).toString());
  const dispatch = useDispatch();
  const genres = useSelector(getGenreList);
  const filters = useSelector(getActiveFilters);

  const handleGenreToggle = (name: string) => {
    if (filters.genre === name) {
      dispatch(filterActions.remove("genre"));
    } else {
      dispatch(filterActions.append({ type: "genre", criteria: name }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(filterActions.append({ type: "revenue", criteria: [Number(min), Number(max)] }));
  };

  return (
    <section>
      <h1>Filters Panel</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="min">Min</label>
        <input id="min" type="text" value={min} onChange={(event) => setMin(event.target.value)} />
        <label htmlFor="max">Max</label>
        <input id="max" type="text" value={max} onChange={(event) => setMax(event.target.value)} />
        <button type="submit">Send</button>
      </form>
      {genres.map(({ title, count }) => (
        <p key={title} onClick={() => handleGenreToggle(title)}>
          {title} <b>({count})</b>
        </p>
      ))}
    </section>
  );
};
