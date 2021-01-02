import React, { FC } from 'react';
import { scaleTime, timeMonth, timeFormat } from 'd3';
import { Dispatch } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import useBrush from 'hooks/use-brush';
import { State } from 'store/types';
import { filters } from 'store/actions';
import { Range, NullableRange } from 'index.d';
import { getDateFilter, getMovieCountByQuarter } from './selectors';

type Props = {
  selected: NullableRange;
  moviesByQ: Array<[string, number]> | undefined;
  onChange: (range: Range) => void;
  onClear: () => void;
};

const scale = scaleTime()
  .domain([new Date(2011, 0, 1), new Date(2020, 11, 1)])
  .rangeRound([0, 300]);

export const DateBrush: FC<Props> = ({ selected, moviesByQ, onChange, onClear }) => {
  console.info(selected);
  console.info(moviesByQ);

  const { container, draft } = useBrush({
    callback: (x: NullableRange) => {
      if (!!x) {
        const [x0, x1] = x.map(
          (d) => +timeFormat('%Y%m%d')(timeMonth.every(3)?.round(scale.invert(d)) as Date)
        );
        onChange([x0, x1]);
      } else {
        onClear();
      }
    },
  });

  return (
    <div>
      <svg width={300} height={70} style={{ background: 'cyan' }}>
        <g ref={container} />
      </svg>
      {!!draft && draft.join('x')}
    </div>
  );
};

const mapStateToProps = (store: State) => ({
  selected: getDateFilter(store) ?? null,
  moviesByQ: getMovieCountByQuarter(store),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onChange: (criteria: Range) => dispatch(filters.append({ type: 'date', criteria })),
  onClear: () => dispatch(filters.clear()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DateBrush);
