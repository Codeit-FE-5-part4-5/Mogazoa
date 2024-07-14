import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { ParsedUrlQuery } from 'querystring';

const useChangeRouter = (): {
  currentPath: string;
  currentQuery: ParsedUrlQuery;
  handleRouterPush: (value: string | Record<string, string | number>) => void;
} => {
  const router = useRouter();
  const currentPath = router.pathname;
  const currentQuery = router.query;

  const handleRouterPush = useCallback(
    (value: string | Record<string, string | number>) => {
      if (value) {
        router.push({
          pathname: currentPath,
          query: value,
        });
      }
    },
    [currentPath],
  );

  return {
    currentPath, // 현재 Pathname
    currentQuery, // 현재 Query
    handleRouterPush, // 파라미터 값을 url 쿼리로 넘겨주는 함수
  };
};

export default useChangeRouter;
