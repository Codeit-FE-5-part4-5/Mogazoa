import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

import useGetMe from '@/models/queries/auth/useGetMe';
import useGetCreatedProducts from '@/models/queries/user/products/created-products/useGetCreatedProducts';
import useGetFavoriteProducts from '@/models/queries/user/products/favorite-products/useGetFavoriteProducts';
import useGetReviewedProducts from '@/models/queries/user/products/reviewed-products/useGetReviewedProducts';

import MogazoaLayout from '@/components/layout/App/MogazoaLayout';
import MyProfileCard from '@/components/feature/profile/MyProfileCard/MyProfileCard';
import ActivityCard from '@/components/feature/product/ActivityCard/ActivityCard';
import ProductCardList from '@/components/feature/product/ProductCardList/ProductCardList';
import { Spinner } from '@/components/shared';

const MyPage = () => {
  const { data: user } = useGetMe();

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(
    ProductCategory.REVIEWED,
  );

  return (
    <MogazoaLayout>
      <div className="mt-10 flex flex-col items-center justify-center px-5 text-var-white xl:flex-row xl:place-items-start xl:space-x-10">
        <div className="w-full max-w-[940px] xl:w-[340px]">
          <MyProfileCard user={user} />
        </div>
        <div className="w-full space-y-20 xl:w-[940px]">
          <ActivitySection />
          <ProductCategorySelector
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <ProductList selectedCategory={selectedCategory} />
        </div>
      </div>
    </MogazoaLayout>
  );
};

export default MyPage;
