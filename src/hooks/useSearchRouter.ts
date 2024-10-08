import { useRouter } from 'next/router';
import { ChangeEvent, useEffect } from 'react';
import useInput from './useInput';
import castArray from '../utils/castArray';

type TSearchRouter = () => {
  searchKeyword: string;
  initKeyword: () => void;
  searchQuery: string;
  onChangeSearchKeyword: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

/**
 *
 * @todo 검색 관련 로직 수정 예정 (기능은 함)
 */
const useSearchRouter: TSearchRouter = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  const currentQuery = router.query;
  const { search } = router.query;
  const [searchKeyword, onChangeSearchKeyword, initKeyword] = useInput('');

  let searchTimerId: NodeJS.Timeout;

  const searchQuery = castArray(search);

  const changeSearchQuery = (currentValue: string) => {
    if (!currentValue) {
      delete currentQuery.search;
      return router.push({
        pathname: currentPath,
        query: currentQuery,
      });
    }

    return router.push({
      pathname: currentPath,
      query: { ...currentQuery, search: currentValue },
    });
  };

  useEffect(() => {
    if (searchTimerId) {
      clearTimeout(searchTimerId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    searchTimerId = setTimeout(() => {
      if (searchKeyword) {
        changeSearchQuery(searchKeyword);
      }
    }, 500);

    return () => {
      clearTimeout(searchTimerId);
    };
  }, [searchKeyword]);

  return {
    searchKeyword, // 현재 입력한 검색어
    onChangeSearchKeyword, // 검색어 onChange 함수
    initKeyword, // 검색창 입력값 초기화
    searchQuery, // 쿼리로 보낼 준비가 된 검색어
  };
};

export default useSearchRouter;
