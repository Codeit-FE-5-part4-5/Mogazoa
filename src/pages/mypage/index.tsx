import dynamic from 'next/dynamic';
import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { dehydrate, useQuery } from '@tanstack/react-query';
import getServerCookie from '@/lib/getServerCookie';
import queryClient from '@/lib/query';
import { getCookie } from '@/lib/cookie';

import meService from '@/models/services/auth/meService';

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

  await queryClient.prefetchQuery(meService.queryOptions(accessToken));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const MyPage = () => {
  const token = getCookie('accessToken');
  const { data: user } = useQuery(meService.queryOptions(token));

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
          <ProductList selectedCategory={selectedCategory} user={user} />
        </div>
      </div>
    </MogazoaLayout>
  );
};

export default MyPage;
