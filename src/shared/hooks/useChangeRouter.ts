import { useRouter } from 'next/router';
import { validateArray } from '../utils/validateArray';
import { useEffect } from 'react';
import useInput from './useInput';

const useChangeRouter = (): {
  currentPath: string;
  currentCategoryName: string;
  currentCategoryId: string;
  handleClickCategory: (value: { name: string; id: number }) => void;
  searchKeyword: string;
  onChangeSearchKeyword: () => void;
  initKeyword: () => void;
  searchQuery: string;
} => {
  const router = useRouter();
  const currentPath = router.pathname;
  const currentQuery = router.query;
  const { name, id, search } = router.query;
  const [searchKeyword, onChangeSearchKeyword, initKeyword] = useInput('');

  let searchTimerId: NodeJS.Timeout;

  const currentCategoryName = validateArray(name);
  const currentCategoryId = validateArray(id);
  const searchQuery = validateArray(search);

  const handleClickCategory = (value: { name: string; id: number }) => {
    if (value) {
      router.push({
        pathname: currentPath,
        query: { name: value.name, id: value.id },
      });
    }
  };

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
    currentPath, // 현재 Pathname
    currentCategoryName, // 현재 선택한 카테고리이름
    currentCategoryId, // 현재 선택한 카테고리아이디
    handleClickCategory, // 클릭한 카테고리의 이름과 아이디를 url 쿼리로 넘겨주는 함수
    searchKeyword, // 현재 입력한 검색어
    onChangeSearchKeyword, // 검색어 onChange 함수
    initKeyword, // 검색창 입력값 초기화
    searchQuery, // 쿼리로 보낼 준비가 된 검색어
  };
};

export default useChangeRouter;
