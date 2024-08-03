import { useState } from 'react';
import { useParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

import useGetMe from '@/models/queries/auth/useGetMe';
import useGetCreatedProducts from '@/models/queries/user/products/created-products/useGetCreatedProducts';
import useGetFavoriteProducts from '@/models/queries/user/products/favorite-products/useGetFavoriteProducts';
import useGetReviewedProducts from '@/models/queries/user/products/reviewed-products/useGetReviewedProducts';
import useUserProfile from '@/models/queries/user/profile/useUserProfile';

import MogazoaLayout from '@/components/layout/App/MogazoaLayout';
import ActivityCard from '@/components/feature/product/ActivityCard/ActivityCard';
import ProductCardList from '@/components/feature/product/ProductCardList/ProductCardList';
import ProfileCard from '@/components/feature/profile/ProfileCard/ProfileCard';
import { Floating, Spinner } from '@/components/shared';

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
