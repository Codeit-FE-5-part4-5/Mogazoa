import { useState } from 'react';
import MogazoaLayout from '@/shared/components/App/MogazoaLayout';
import MyProfileCard from '@/shared/components/MyProfileCard/MyProfileCard';
import useGetMe from '@/models/auth/useGetMe';
import ActivitySection from './_components/ActivitySection';
import ProductList from './_components/ProductList';
import ProductCategorySelector from './_components/ProductCategorySelector';

export enum ProductCategory {
  REVIEWED = '리뷰 남긴 상품',
  CREATED = '등록한 상품',
  FAVORITE = '찜한 상품',
}

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
