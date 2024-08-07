import dynamic from 'next/dynamic';
import { GetServerSidePropsContext } from 'next';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { dehydrate, useQuery } from '@tanstack/react-query';
import queryClient from '@/lib/query';

import castArray from '@/utils/castArray';
import useGetMe from '@/models/queries/auth/useGetMe';
import userProfileService from '@/models/services/profile/userProfileService';

import MogazoaLayout from '@/components/layout/App/MogazoaLayout';
import ProfileCard from '@/components/feature/profile/ProfileCard/ProfileCard';
import ProductCardListSkeleton from '@/components/shared/Boundary/Fallback/Suspense/ProductCardListSkeleton';
import ActivitySection from './_components/ActivitySection';
import ProductCategorySelector from './_components/ProductCategorySelector';

const ProductList = dynamic(() => import('./_components/ProductList'), { ssr: false, loading: () => <ProductCardListSkeleton /> }); // prettier-ignore

export enum ProductCategory {
  REVIEWED = '리뷰 남긴 상품',
  CREATED = '등록한 상품',
  FAVORITE = '찜한 상품',
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { userId } = context.params!;

  if (userId) {
    await queryClient.prefetchQuery(
      userProfileService.queryOptions(castArray(Number(userId))),
    );
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const UserProfile = () => {
  const { userId } = useParams();
  const { data: me } = useGetMe();
  const { data: user } = useQuery(
    userProfileService.queryOptions(castArray(Number(userId))),
  );

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(
    ProductCategory.REVIEWED,
  );

  if (me?.id === Number(userId)) {
    window.location.replace('/mypage');
  }

  return (
    <MogazoaLayout>
      <div className="mt-10 flex flex-col items-center justify-center px-5 text-var-white xl:flex-row xl:place-items-start xl:space-x-10">
        <div className="top-[96px] size-full max-w-[940px] xl:sticky xl:w-[340px]">
          <ProfileCard user={user} />
        </div>
        <div className="w-full xl:w-[940px]">
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
