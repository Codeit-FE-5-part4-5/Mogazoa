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
      <div className="flex justify-center">
        <div className="hidden md:flex">
          <SlideMenu categories={categories} />
        </div>
        <div className="flex flex-col md:pl-[25px] xl:flex-row xl:pl-[90px] xl:pr-[60px]">
          <div className="xl:order-2">
            <RankingList />
          </div>
          <div className="mt-[60px] xl:order-1">
            <h1 className="mb-[30px] text-[24px] font-semibold text-var-white">
              {name ? (
                `${name}의 모든 상품`
              ) : (
                <p>
                  지금 핫한 상품
                  <span className="bg-gradient-custom bg-clip-text text-transparent">
                    TOP 6
                  </span>
                </p>
              )}
            </h1>
            <div className="flex flex-wrap gap-[20px]">
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
      </div>
    </>
  );
}
