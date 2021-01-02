const moviesByRevenue = ['3|A', '5|B', '5|C', '7|D', '9|E', '11|F', '14|G', '19|H'];

const getLowerBound = (arr, x, start = 0, end = arr.length) => {
  if (start >= end) return end;

  const mid = Math.floor((start + end) / 2);
  const revenue = arr[mid].split('|')[0];

  return getLowerBound(arr, x, revenue < x ? mid + 1 : start, revenue < x ? end : mid);
};

const getUpperBound = (arr, x, start = 0, end = arr.length) => {
  if (start >= end) return end;

  const mid = Math.floor((start + end) / 2);
  const revenue = arr[mid].split('|')[0];

  return getUpperBound(arr, x, revenue >= x ? start : mid + 1, revenue >= x ? mid : end);
};

const bounds = {
  le: getLowerBound,
  ge: getUpperBound,
};

const getMoviesInRange = (low, high) =>
  moviesByRevenue
    .slice(bounds.le(moviesByRevenue, low), bounds.ge(moviesByRevenue, high))
    .map((hash) => hash.split('|')[1]);

console.info(getMoviesInRange(5, 9));
console.info(getMoviesInRange(0, 9));
console.info(getMoviesInRange(0, 500));
console.info(getMoviesInRange(8, 14));
