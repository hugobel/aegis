export type GenreMap = Record<string, Array<string>>;

export type SortedDirectory = Array<string>;

export type Directory = {
  byGenre: GenreMap;
  byDate: SortedDirectory;
  byTitle: SortedDirectory;
  byRevenue: SortedDirectory;
};
