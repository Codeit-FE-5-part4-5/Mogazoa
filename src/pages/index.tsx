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
import { useEffect, useState } from 'react';

/**
 * @TODO 검색기능, 사이드바메뉴(카테고리, 로그인, 로그아웃)
 */

export default function Home() {
<<<<<<< HEAD
  return <div></div>;
=======
  const [currentSortOrder, setCurrentSortOrder] = useState(
    sortConverter(ORDER_VARIANTS[0]),
  );
  const [searchKeyword, setSearchKeyword] = useState('');
  const router = useRouter();
  const currentPath = router.pathname;
  const { name: currentCategoryName, id: currentCategoryId } = router.query;
  const token = getCookie('accessToken');
  const { login, isLoggedIn } = useMe();
  const { data, isSuccess } = useGetMe(token);
  const { data: categories } = useGetCategory();
  const { data: products } = useGetProducts({
    categoryId: Number(currentCategoryId),
    order: currentSortOrder,
    keyword: searchKeyword,
  });

  const handleItemClick = (value: { name: string; id: number }) => {
    router.push({
      pathname: currentPath,
      query: { name: value.name, id: value.id },
    });
  };

  const changeSortOrder = (order: string) => {
    setCurrentSortOrder(sortConverter(order));
  };

  const validateArray = (arr: any, idx = 0) => {
    return Array.isArray(arr) ? arr[idx] : arr;
  };

  useEffect(() => {
    if (isSuccess) {
      login(data.data);
    }
  }, [isSuccess]);

  return (
    <>
      <Header me={isLoggedIn} />
      <main className="flex justify-center">
        <div className="hidden md:flex">
          <CategoryMenu
            categories={categories}
            onClick={handleItemClick}
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
>>>>>>> dev
}
