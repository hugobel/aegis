import { extendConfig } from './utils';

export type NullableRange = [number, number] | null;

export type EventCallback = (range: NullableRange) => void;

export type BrushEvent = { selection: NullableRange };

export type BrushConfig = ReturnType<typeof extendConfig>;

export type UseBrushParams = {
  config?: Partial<BrushConfig>;
  callback: EventCallback;
  // type: "date" | "money";
};
