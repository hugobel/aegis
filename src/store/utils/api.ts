import get, { AxiosResponse } from 'axios';
import { parse } from 'papaparse';
import { pipe, sum, split, map, indexBy, prop } from 'ramda';
import { Movie, Movies } from 'index.d';

const BASE_URL = 'https://atlantic-dev-datasets.s3.us-east-2.amazonaws.com';

type CSVRow = {
  id: string;
  title: string;
  revenue: string;
  genres: string;
  releaseDate: string;
};

const expandProps = ({ genres, revenue, releaseDate, ...rest }: CSVRow): Movie => {
  const dailyRevenue = pipe(split('|'), map(Number))(revenue);

  return {
    ...rest,
    releaseDate: Number(releaseDate.replaceAll('-', '')),
    genres: split('|')(genres),
    revenue: dailyRevenue,
    total: sum(dailyRevenue),
  };
};

const parseCsv = ({ data }: AxiosResponse) => parse(data, { header: true }).data as Array<CSVRow>;

const enhanceEntries: (x: AxiosResponse) => Movies = pipe(
  parseCsv,
  map(expandProps),
  indexBy(prop('id'))
);

const fetchVersion = (): Promise<string> =>
  get(`${BASE_URL}/version.txt`).then(({ data }) => data.toString());

export const fetchMovies: (version: string) => Promise<Movies> = async (version) =>
  get(`${BASE_URL}/${version}.csv`).then(enhanceEntries);

export const compareVersions = async (local: string | null): Promise<string | null> => {
  const remote = await fetchVersion();
  return local === remote ? null : remote;
};
