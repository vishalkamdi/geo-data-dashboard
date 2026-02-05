import { useEffect, useState } from "react";
import { fetchGeoData } from "../services/api";

export const useGeoData = (page, limit) => {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchGeoData({ page, limit }).then((res) => {
      setRows(res.rows);
      setTotal(res.total);
      setLoading(false);
    });
  }, [page, limit]);

  return { rows, total, loading };
};
