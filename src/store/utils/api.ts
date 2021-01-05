import get, { AxiosResponse } from 'axios';
import { pipe, split, map, indexBy, prop } from 'ramda';
import { parse } from 'papaparse';
import { Movies } from 'index.d';

const BASE_URL = 'https://atlantic-dev-datasets.s3.us-east-2.amazonaws.com';

type CSVRow = {
  id: string;
  title: string;
  revenue: string;
  genres: string;
  releaseDate: string;
};

const parseCsv = ({ data }: AxiosResponse) => parse(data, { header: true }).data as Array<CSVRow>;

const expandProps = ({ genres, revenue, ...rest }: CSVRow) => ({
  genres: split('|')(genres),
  revenue: pipe(split('|'), map(Number))(revenue),
  ...rest,
});

const fetchVersion = (): Promise<string> =>
  get(`${BASE_URL}/version.txt`).then(({ data }) => data.toString());

export const fetchMovies: (version: string) => Promise<Movies> = async (version) =>
  get(`${BASE_URL}/${version}.csv`).then(pipe(parseCsv, map(expandProps), indexBy(prop('id'))));

export const compareVersions = async (local: string | null): Promise<string | null> => {
  const remote = await fetchVersion();
  return local === remote ? null : remote;
};
