import data from "../data/mockData.json";

export const fetchGeoData = ({ page, limit }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = page * limit;
      resolve({
        rows: data.slice(start, start + limit),
        total: data.length,
      });
    }, 300);
  });
};
