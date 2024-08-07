import dynamic from 'next/dynamic';
import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { dehydrate } from '@tanstack/react-query';
import queryClient from '@/lib/query';

import getServerCookie from '@/lib/getServerCookie';
import meService from '@/models/services/auth/meService';
import useGetMe from '@/models/queries/auth/useGetMe';

import MogazoaLayout from '@/components/layout/App/MogazoaLayout';
import MyProfileCard from '@/components/feature/profile/MyProfileCard/MyProfileCard';
import ProductCardListSkeleton from '@/components/shared/Boundary/Fallback/Suspense/ProductCardListSkeleton';
import ActivitySection from './_components/ActivitySection';
import ProductCategorySelector from './_components/ProductCategorySelector';
import { ProductCategory } from '../user/[userId]';

const ProductList = dynamic(() => import('./_components/ProductList'), { ssr: false, loading: () => <ProductCardListSkeleton />}); // prettier-ignore

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const accessToken = getServerCookie(context, 'accessToken');

  if (accessToken) {
    await queryClient.prefetchQuery(meService.queryOptions(accessToken!));
  } else {
    queryClient.removeQueries({ queryKey: ['me'] });
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const MyPage = () => {
  const { data: user } = useGetMe();

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(
    ProductCategory.REVIEWED,
  );

  return (
    <MogazoaLayout>
      <div className="mt-10 flex flex-col items-center justify-center px-5 text-var-white xl:flex-row xl:place-items-start xl:space-x-10">
        <div className="top-[80px] size-full max-w-[940px] xl:sticky xl:w-[340px]">
          <MyProfileCard user={user} />
        </div>
        <div className="w-full xl:w-[940px]">
          <ActivitySection />
          <ProductCategorySelector
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <ProductList selectedCategory={selectedCategory} user={user} />
        </div>
      </div>
    </MogazoaLayout>
  );
};

export default MyPage;
