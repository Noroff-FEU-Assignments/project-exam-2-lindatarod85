import { useState, useEffect } from "react";

const useApi = (url, authToken) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: authToken,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }

        const json = await response.json();
        setData(json);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, authToken]);

  return { data, isLoading, isError };
};

export default useApi;
