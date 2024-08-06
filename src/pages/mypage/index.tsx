import dynamic from 'next/dynamic';
import { useState } from 'react';

import useGetMe from '@/models/queries/auth/useGetMe';

import MogazoaLayout from '@/components/layout/App/MogazoaLayout';
import MyProfileCard from '@/components/feature/profile/MyProfileCard/MyProfileCard';
import { FetchBoundary } from '@/components/shared';
import ActivitySection from './_components/ActivitySection';
import ProductCategorySelector from './_components/ProductCategorySelector';
import { ProductCategory } from '../user/[userId]';

const ProductList = dynamic(() => import('./_components/ProductList'), { ssr: false }); // prettier-ignore

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
        <div className="w-full xl:w-[940px]">
          <ActivitySection />
          <ProductCategorySelector
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <FetchBoundary variant="productsCard">
            <ProductList selectedCategory={selectedCategory} user={user} />
          </FetchBoundary>
        </div>
      </div>
    </MogazoaLayout>
  );
};

export default MyPage;
