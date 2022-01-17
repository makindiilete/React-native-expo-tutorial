import { useEffect, useState } from "react";
import listingApi from "../api/listings";

export default function useApi(apiFunc) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async () => {
    setLoading(true);
    const response = await apiFunc();
    setLoading(false);

    if (!response.ok) {
      setError(true);
      return response;
    }

    setError(false);
    setData(response.data);
    return response;
  };
  return {
    data,
    error,
    loading,
    request,
  };
}
