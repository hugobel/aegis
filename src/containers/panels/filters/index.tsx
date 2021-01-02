import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filters as filterActions } from 'store/actions';
import { getGenreList, getActiveFilters } from 'store/selectors';
import { DateBrush, MoneyBrush } from 'components';

export const Slicers = () => {
  const dispatch = useDispatch();
  const genres = useSelector(getGenreList);
  const filters = useSelector(getActiveFilters);

  const handleGenreToggle = (name: string) => {
    if (filters.genre === name) {
      dispatch(filterActions.remove('genre'));
    } else {
      dispatch(filterActions.append({ type: 'genre', criteria: name }));
    }
  };

  return (
    <section>
      <h1>Filters Panel</h1>
      <DateBrush />
      <MoneyBrush />
      {!!filters.date && <> ||| {filters.date.join(',')}</>}
      {genres.map(({ title, count }) => (
        <p key={title} onClick={() => handleGenreToggle(title)}>
          {title} <b>({count})</b>
        </p>
      ))}
    </section>
  );
};
