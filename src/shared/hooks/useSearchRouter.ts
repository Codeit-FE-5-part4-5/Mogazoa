import { useRouter } from 'next/router';
import useInput from './useInput';
import { validateArray } from '../utils/validateArray';
import { useEffect } from 'react';

const useSearchRouter = (): {
  searchKeyword: string;
  onChangeSearchKeyword: () => void;
  initKeyword: () => void;
  searchQuery: string;
} => {
  const router = useRouter();
  const currentPath = router.pathname;
  const currentQuery = router.query;
  const { search } = router.query;
  const [searchKeyword, onChangeSearchKeyword, initKeyword] = useInput('');

  let searchTimerId: NodeJS.Timeout;

  const searchQuery = validateArray(search);

  const changeSearchQuery = (currentValue: string) => {
    router.push({
      pathname: currentPath,
      query: { ...currentQuery, search: currentValue },
    });
  };

  useEffect(() => {
    if (searchTimerId) {
      clearTimeout(searchTimerId);
    }

    searchTimerId = setTimeout(() => {
      if (searchKeyword) {
        changeSearchQuery(searchKeyword);
      } else {
        changeSearchQuery('');
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
