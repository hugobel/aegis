import React, { useState, useContext, FormEvent } from "react";
import MoviesContext, { getFilteredMovies, getGenreList } from "movies-context";

export const FiltersPanel = () => {
  const [min, setMin] = useState((0).toString());
  const [max, setMax] = useState((1e9).toString());
  const { state, addFilter, removeFilter } = useContext(MoviesContext);
  const genres = getGenreList(state);
  const filteredMovies = getFilteredMovies(state);

  console.info(filteredMovies);

  const handleGenreToggle = (name: string) => {
    if (state.filters.genre === name) {
      removeFilter("genre");
    } else {
      addFilter({ type: "genre", criteria: name });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addFilter({ type: "revenue", criteria: [Number(min), Number(max)] });
  };

  return (
    <section>
      <h1>Filters Panel</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="min">Min</label>
        <input
          id="min"
          type="text"
          value={min}
          onChange={(event) => setMin(event.target.value)}
        />
        <label htmlFor="max">Max</label>
        <input
          id="max"
          type="text"
          value={max}
          onChange={(event) => setMax(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      {genres.map(({ title, count }) => (
        <p
          key={title}
          onClick={() => handleGenreToggle(title)}
        >{`${title} (${count})`}</p>
      ))}
    </section>
  );
};
