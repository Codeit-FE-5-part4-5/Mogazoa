import { useRouter } from 'next/router';
import { validateArray } from '../utils/validateArray';
import { ChangeEvent, useEffect, useState } from 'react';

export default function useChangeRouter(): {
  currentPath: string;
  currentCategoryName: string;
  currentCategoryId: string;
  handleClickCategory: (value: { name: string; id: number }) => void;
  changeSearchKeyword: (keyword: ChangeEvent<HTMLInputElement>) => void;
  searchKeyword: string;
  searchInputValue: string;
  initInputValue: () => void;
} {
  const router = useRouter();
  const currentPath = router.pathname;
  const currentQuery = router.query;
  const { name, id, search } = router.query;
  const [searchInputValue, setSearchInputValue] = useState('');
  let searchTimerId: NodeJS.Timeout;

  const currentCategoryName = validateArray(name);
  const currentCategoryId = validateArray(id);
  const searchKeyword = validateArray(search);

  const handleClickCategory = (value: { name: string; id: number }) => {
    if (value) {
      router.push({
        pathname: currentPath,
        query: { name: value.name, id: value.id },
      });
    }
  };

  const changeSearchKeyword = (keyword: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(keyword.target.value);
  };

  const initInputValue = () => {
    setSearchInputValue('');
  };

  const changeSearchQuery = () => {
    router.push({
      pathname: currentPath,
      query: { ...currentQuery, search: searchInputValue },
    });
  };

  useEffect(() => {
    if (searchInputValue) {
      if (searchTimerId) {
        clearTimeout(searchTimerId);
      }

      searchTimerId = setTimeout(() => {
        changeSearchQuery();
      }, 500);

      return () => {
        clearTimeout(searchTimerId);
      };
    }
  }, [searchInputValue]);

  return {
    currentPath, // 현재 Pathname
    currentCategoryName, // 현재 선택한 카테고리이름
    currentCategoryId, // 현재 선택한 카테고리아이디
    handleClickCategory, // 클릭한 카테고리의 이름과 아이디를 url 쿼리로 넘겨주는 함수
    changeSearchKeyword, // 입력한 검색어 쿼리로 푸쉬하는 함수
    searchKeyword, // 현재 입력한 검색어
    searchInputValue,
    initInputValue,
  };
}
