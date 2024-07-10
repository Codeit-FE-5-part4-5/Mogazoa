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
import { useEffect, useState } from 'react';
import useChangeRouter from '@/shared/hooks/useChangeRouter';
import SlideMenuBar from '@/shared/components/SlideMenuBar/SlideMenuBar';
import AppLayout from '@/shared/components/App/AppLayout';

export default function Home() {
  const {
    currentCategoryName,
    currentCategoryId,
    handleClickCategory,
    searchKeyword,
  } = useChangeRouter();
  const [currentSortOrder, setCurrentSortOrder] = useState(
    sortConverter(ORDER_VARIANTS[0]),
  );
  const token = getCookie('accessToken');
  const { login } = useMe();
  const { data: me, isSuccess: loginSuccess } = useGetMe(token);
  const { data: categories } = useGetCategory();
  const { data: products } = useGetProducts({
    categoryId: Number(currentCategoryId),
    order: currentSortOrder,
    keyword: searchKeyword,
  });

  useEffect(() => {
    if (loginSuccess) {
      login(me.data);
    }
  }, [loginSuccess]);

  return (
    <AppLayout>
      <div className="flex border-b border-var-black3 md:hidden">
        <SlideMenuBar
          categories={categories}
          currentCategory={currentCategoryName}
          onClick={handleClickCategory}
        />
      </div>
      <main className="flex justify-center">
        <div className="hidden md:flex">
          <CategoryMenu
            categories={categories}
            currentCategoryName={currentCategoryName}
            handleClickCategory={handleClickCategory}
          />
        </div>
        <div className="flex w-full max-w-[1250px] flex-col gap-[60px] md:min-w-0 xl:flex-row xl:gap-0">
          <RankingList />
          <ProductList
            currentCategoryName={currentCategoryName}
            products={products}
            handleChangeOrder={(order: string) =>
              setCurrentSortOrder(sortConverter(order))
            }
          />
        </div>
      </main>
    </AppLayout>
  );
}
