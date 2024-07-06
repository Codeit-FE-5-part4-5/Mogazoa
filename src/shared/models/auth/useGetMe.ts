import axios from '@/shared/utils/axios';
import { useQuery } from '@tanstack/react-query';

import { useEffect, useState } from 'react';

const useGetMe = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    setAccessToken(localStorage.getItem('accessToken'));
  }, []);

  return useQuery({
    queryKey: ['me'],
    queryFn: () => axios.get(`users/me`),
    enabled: !!accessToken,
    staleTime: 60 * 1000 * 30,
    gcTime: 60 * 1000 * 30,
    refetchOnWindowFocus: false,
  });
};

export default useGetMe;
