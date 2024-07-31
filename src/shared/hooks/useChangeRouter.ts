import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { ParsedUrlQuery } from 'querystring';

const useChangeRouter = (): {
  currentPath: string;
  currentQuery: ParsedUrlQuery;
  updateQueryParam: (value: string | Record<string, string | number>) => void;
  appendQueryParam: (value: Record<string, string | number>) => void;
  handleRedirect: (value: string) => void;
} => {
  const router = useRouter();
  const currentPath = router.pathname;
  const currentQuery = router.query;

  const updateQueryParam = useCallback(
    (value: string | Record<string, string | number>) => {
      if (value) {
        router.push({
          pathname: currentPath,
          query: value,
        });
      }
    },
    [currentPath, router],
  );

  const appendQueryParam = useCallback(
    (currentValue: Record<string, string | number>) => {
      if (!currentValue) {
        return null;
      }
      const updatedQuery = { ...currentQuery, ...currentValue };

      return router.push({
        pathname: currentPath,
        query: updatedQuery,
      });
    },
    [router, currentPath, currentQuery],
  );

  const handleRedirect = useCallback(
    (value: string) => {
      if (value) {
        router.replace(value);
      }
    },
    [router],
  );

  return {
    currentPath, // 현재 Pathname
    currentQuery, // 현재 Query
    updateQueryParam, // 현재 패스에 새로운 쿼리를 업데이트해주는 함수
    appendQueryParam, // 현재 쿼리에 새로운 쿼리를 추가해주는 함수
    handleRedirect, // replace메서드로 리다이렉션 해주는 함수
  };
};

export default useChangeRouter;
