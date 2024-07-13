import { useRouter } from 'next/router';
import { validateArray } from '../utils/validateArray';
import { useCallback } from 'react';

const useChangeRouter = (): {
  currentPath: string;
  currentCategoryName: string;
  currentCategoryId: string;
  handleClickCategory: (value: { name: string; id: number }) => void;
} => {
  const router = useRouter();
  const currentPath = router.pathname;
  const { name, id } = router.query;

  const currentCategoryName = validateArray(name);
  const currentCategoryId = validateArray(id);

  const handleClickCategory = useCallback(
    (value: { name: string; id: number }) => {
      if (value) {
        router.push({
          pathname: currentPath,
          query: { name: value.name, id: value.id },
        });
      }
    },
    [],
  );

  return {
    currentPath, // 현재 Pathname
    currentCategoryName, // 현재 선택한 카테고리이름
    currentCategoryId, // 현재 선택한 카테고리아이디
    handleClickCategory, // 클릭한 카테고리의 이름과 아이디를 url 쿼리로 넘겨주는 함수
  };
};

export default useChangeRouter;
