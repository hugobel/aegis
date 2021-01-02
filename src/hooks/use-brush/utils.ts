import debounce from 'lodash.debounce';
import { BrushBehavior } from 'd3';
import { mergeDeepRight } from 'ramda';
import { EventCallback, BrushEvent } from './types';

const config = {
  width: 300,
  height: 70,
  margin: 0,
};

const extent: [[number, number], [number, number]] = [
  [config.margin, config.margin],
  [config.width - config.margin, config.height - config.margin],
];

export const attachEventHandlers = (onMove: EventCallback, onEnd: EventCallback) => (target: BrushBehavior<unknown>) =>
  target
    .on(
      'brush',
      debounce((event: BrushEvent) => onMove(event.selection), 500)
    )
    .on('end', (event: BrushEvent) => onEnd(event.selection));

export const extendConfig = (config: {}) =>
  mergeDeepRight({
    extent,
  })(config);
