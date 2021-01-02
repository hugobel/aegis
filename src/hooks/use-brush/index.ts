import { useState, useEffect, useRef } from 'react';
import { select, brushX, BrushBehavior } from 'd3';
import { attachEventHandlers, extendConfig } from './utils';
import { UseBrushParams, NullableRange } from './types';

export const useBrush = ({ callback, config: configParams = {} }: UseBrushParams) => {
  let brush = useRef<BrushBehavior<unknown>>();
  const container = useRef<SVGGElement>(null);
  const [draft, setDraft] = useState<NullableRange>(null);
  const config = extendConfig(configParams);

  useEffect(() => {
    if (!container.current) return;
    brush.current = brushX().extent(config.extent);
    select(container.current).call(brush.current);
  }, [container, config]);

  useEffect(() => {
    if (!brush.current) return;
    attachEventHandlers(setDraft, callback)(brush.current);
  }, [callback]);

  return { container, draft };
};

export default useBrush;
