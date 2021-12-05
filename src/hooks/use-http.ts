import { useState, useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (requestConfig, filterFnc) => {
    setIsLoading(true);
    try {
      const response = await fetch(requestConfig.url);
      if (!response.ok) throw new Error('Request failed! Please try again!');
      const data = await response.json();
      filterFnc(data);
      // fix any type
    } catch (err: any) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    fetchData,
  };
};

export default useHttp;
