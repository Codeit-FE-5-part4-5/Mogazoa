import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { dehydrate } from '@tanstack/react-query';

import queryClient from '@/lib/query';
import getServerToken from '@/lib/getServerToken';
import meService from '@/models/services/auth/meService';
import useGetMe from '@/models/queries/auth/useGetMe';

import MogazoaLayout from '@/components/layout/App/MogazoaLayout';
import MyProfileCard from '@/components/feature/profile/MyProfileCard/MyProfileCard';
import ActivitySection from './_components/ActivitySection';
import ProductCategorySelector from './_components/ProductCategorySelector';
import ProductList from './_components/ProductList';
import { ProductCategory } from '../user/[userId]';

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const accessToken = getServerToken(context);

  if (accessToken) {
    await queryClient.prefetchQuery(meService.queryOptions(accessToken));
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
