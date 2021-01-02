import React, { FC } from 'react';
import { connect } from 'react-redux';
import { State } from 'store/types';
import useBrush from 'hooks/use-brush';
import { getMovieCountByRevenue } from './selectors';

type Props = {
  revenueBlocks: Array<[string, number]> | undefined;
};

export const MoneyBrush: FC<Props> = ({ revenueBlocks }) => {
  const { container, draft } = useBrush({ callback: () => console.info('hey') });

  return (
    <div>
      <svg width={300} height={70} style={{ background: 'orange' }}>
        <g ref={container} />
      </svg>
      {!!draft && draft.join('x')}
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  revenueBlocks: getMovieCountByRevenue(state),
});

export default connect(mapStateToProps)(MoneyBrush);
