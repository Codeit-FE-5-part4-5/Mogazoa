import { useState } from 'react';
import { useParams } from 'next/navigation';

import MogazoaLayout from '@/shared/components/App/MogazoaLayout';
import ProfileCard from '@/shared/components/ProfileCard/ProfileCard';
import useGetMe from '@/models/auth/useGetMe';
import useUserProfile from '@/models/user/profile/useUserProfile';
import ActivitySection from './_components/ActivitySection';
import ProductCategorySelector from './_components/ProductCategorySelector';
import ProductList from './_components/ProductList';

export enum ProductCategory {
  REVIEWED = '리뷰 남긴 상품',
  CREATED = '등록한 상품',
  FAVORITE = '찜한 상품',
}

const UserProfile = () => {
  const params = useParams();
  const { data: me } = useGetMe();
  const { data: user } = useUserProfile(Number(params?.userId));

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(
    ProductCategory.REVIEWED,
  );

  if (me?.id === Number(params?.userId)) {
    window.location.replace('/mypage');
  }

  return (
    <MogazoaLayout>
      <div className="mt-10 flex flex-col items-center justify-center px-5 text-var-white xl:flex-row xl:place-items-start xl:space-x-10">
        <div className="w-full max-w-[940px] xl:w-[340px]">
          <ProfileCard user={user?.data} />
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

export default UserProfile;
