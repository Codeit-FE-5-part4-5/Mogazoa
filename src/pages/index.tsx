import { Header } from '@/shared/components/header/header';
import ProductList from '@/shared/components/ProductList/ProductList';
import { RankingList } from '@/shared/components/RankingList/RankingList';
import { CategoryMenu } from '@/shared/components/CategoryMenu/CategoryMenu';
import { ORDER_VARIANTS } from '@/shared/constants/products';
import useMe from '@/shared/hooks/use-me';
import useGetMe from '@/shared/models/auth/useGetMe';
import useGetCategory from '@/shared/models/category/useGetCategory';
import useGetProducts from '@/shared/models/product/useGetProducts';
import { getCookie } from '@/shared/utils/cookie';
import sortConverter from '@/shared/utils/sortConverter';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import useInput from '@/shared/hooks/useInput';
import { validateArray } from '@/shared/utils/validateArray';

/**
 * @TODO 좌우 스크롤(터치로 구현, 좌우측 남은 공간 있을시 애니메이션)
 * @TODO 언마운트시 페이드아웃 애니메이션 이왕이면 커스텀훅으로
 */

export default function Home() {
  const router = useRouter();
  const currentPath = router.pathname;
  const { name: currentCategoryName, id: currentCategoryId } = router.query;
  const [currentSortOrder, setCurrentSortOrder] = useState(
    sortConverter(ORDER_VARIANTS[0]),
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [searchKeyword, onChangeSearchKeyword, initSearchKeyword] =
    useInput('');
  const token = getCookie('accessToken');
  const { login, isLoggedIn, logout } = useMe();
  const { data, isSuccess: loginSuccess } = useGetMe(token);
  const { data: categories } = useGetCategory();
  const { data: products, isSuccess: productsSuccess } = useGetProducts({
    categoryId: Number(currentCategoryId),
    order: currentSortOrder,
    keyword: searchQuery,
  });
  let searchTimerId: NodeJS.Timeout;

  const handleCategoryClick = (value: { name: string; id: number }) => {
    router.push({
      pathname: currentPath,
      query: { name: value.name, id: value.id },
    });
  };

  const changeSortOrder = (order: string) => {
    setCurrentSortOrder(sortConverter(order));
  };

  const changeSearchKeyword = (keyword: ChangeEvent) => {
    if (searchTimerId) {
      clearTimeout(searchTimerId);
    }

    searchTimerId = setTimeout(() => {
      onChangeSearchKeyword(keyword);
    }, 1000);
  };

  useEffect(() => {
    if (loginSuccess) {
      login(data.data);
    }
  }, [loginSuccess]);

  useEffect(() => {
    if (searchKeyword) {
      setSearchQuery(searchKeyword);
    } else if (!searchKeyword) {
      setSearchQuery('');
    }
  }, [searchKeyword, productsSuccess]);

  return (
    <>
      <Header
        logout={logout}
        isLoggedIn={isLoggedIn}
        onChange={changeSearchKeyword}
        initSearchKeyword={initSearchKeyword}
        categories={categories}
        currentCategory={validateArray(currentCategoryName)}
        onClick={handleCategoryClick}
      />
      <main className="flex justify-center">
        <div className="hidden md:flex">
          <CategoryMenu
            categories={categories}
            onClick={handleCategoryClick}
            currentCategoryName={validateArray(currentCategoryName)}
          />
        </div>
        <div className="flex w-full max-w-[1250px] flex-col gap-[60px] md:min-w-0 xl:flex-row xl:gap-0">
          <RankingList />
          <ProductList
            currentCategoryName={validateArray(
              currentCategoryName,
            )} /** 라우터에서 받은 스트링은 string | string[] | undefined 타입이라서 필요한 검증 */
            products={products}
            handleChangeOrder={changeSortOrder}
          />
        </div>
      </main>
    </>
  );
}
