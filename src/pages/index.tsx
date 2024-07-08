import CategoryFilter from '@/shared/components/Chip/CategoryFilter';
import { Header } from '@/shared/components/header/header';
import ProductCard from '@/shared/components/ProductCard/ProductCard';
import { RankingList } from '@/shared/components/RankingList/RankingList';
import { SlideMenu } from '@/shared/components/SlideMenu/SlideMenu';
import useGetMe from '@/shared/models/auth/useGetMe';
import useGetCategory from '@/shared/models/category/useGetCategory';
import useGetProducts from '@/shared/models/product/useGetProducts';
import { getCookie } from '@/shared/utils/cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [showCategory, setShowCategory] = useState(true);
  const token = getCookie('accessToken');
  const { isSuccess } = useGetMe(token);
  const router = useRouter();
  const { name, id } = router.query;
  const { data: categories } = useGetCategory();
  const { data: products } = useGetProducts({ categoryId: Number(id) });

  useEffect(() => {
    if (isSuccess) {
      setLoggedIn(true);
    }
  }, [isSuccess]);

  return (
    <>
      <Header me={isLoggedIn} />
      <main className="flex justify-center">
        <SlideMenu categories={categories} />
        <div className="flex w-full max-w-[1250px] flex-col gap-[60px] md:min-w-0 xl:flex-row xl:gap-0">
          <RankingList />
          <div className="mx-[20px] flex-1 xl:mt-[60px] xl:border-var-black3">
            <h1 className="mb-[30px] text-[24px] font-semibold text-var-white">
              {name ? (
                <>
                  <p className="mb-[30px]">{name}의 모든 상품</p>
                  <CategoryFilter
                    currentCategory={String(name)}
                    onClick={() => setShowCategory((prev) => !prev)}
                  />
                </>
              ) : (
                <p>
                  지금 핫한 상품&nbsp;
                  <span className="bg-gradient-custom bg-clip-text text-transparent">
                    TOP 6
                  </span>
                </p>
              )}
            </h1>
            <div className="grid grid-cols-2 gap-[20px] xl:grid-cols-3">
              {products?.length > 0 &&
                products.map((product: Product) => (
                  <ProductCard
                    key={product.id}
                    image={product.image}
                    name={product.name}
                    favoriteCount={product.favoriteCount}
                    rating={product.rating}
                    reviewCount={product.reviewCount}
                  />
                ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
