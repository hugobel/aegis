export type FilterBounds = [number, number];

export type DateFilter = {
  type: 'date';
  criteria: FilterBounds;
};

export type RevenueFilter = {
  type: 'revenue';
  criteria: FilterBounds;
};

export type GenreFilter = {
  type: 'genre';
  criteria: string;
};

export type Filter = DateFilter | GenreFilter | RevenueFilter;

export type FiltersState = {
  date?: FilterBounds;
  revenue?: FilterBounds;
  genre?: string;
};
