import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

import useGetMe from '@/models/auth/useGetMe';
import useGetCreatedProducts from '@/models/user/products/created-products/useGetCreatedProducts';
import useGetFavoriteProducts from '@/models/user/products/favorite-products/useGetFavoriteProducts';
import useGetReviewedProducts from '@/models/user/products/reviewed-products/useGetReviewedProducts';

import MogazoaLayout from '@/components/layout/App/MogazoaLayout';
import MyProfileCard from '@/components/feature/profile/MyProfileCard/MyProfileCard';
import ActivityCard from '@/components/feature/product/ActivityCard/ActivityCard';
import ProductCardList from '@/components/feature/product/ProductCardList/ProductCardList';
import { Spinner } from '@/components/shared';

const MyPage = () => {
  const [ref, inView] = useInView();

  const { data: user } = useGetMe();

  const {
    fetchNextPage: fetchNextCreatedPage,
    hasNextPage: hasNextCreatedPage,
    isFetching: isCreatedFetching,
    data: createdProducts,
  } = useGetCreatedProducts(user?.id);

  const {
    fetchNextPage: fetchNextFavoritePage,
    hasNextPage: hasNextFavoritePage,
    isFetching: isFavoriteFetching,
    data: favoriteProducts,
  } = useGetFavoriteProducts(user?.id);

  const {
    fetchNextPage: fetchNextReviewedPage,
    hasNextPage: hasNextReviewedPage,
    isFetching: isReviewedFetching,
    data: reviewedProducts,
  } = useGetReviewedProducts(user?.id);

  const createdProductsList = useMemo(
    () => createdProducts?.pages.flatMap((page) => page.list) || [],
    [createdProducts],
  );

  const favoriteProductsList = useMemo(
    () => favoriteProducts?.pages.flatMap((page) => page.list) || [],
    [favoriteProducts],
  );

  const reviewedProductsList = useMemo(
    () => reviewedProducts?.pages.flatMap((page) => page.list) || [],
    [reviewedProducts],
  );

  const [selectedCategory, setSelectedCategory] = useState('리뷰 남긴 상품');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isLoading =
    isCreatedFetching || isFavoriteFetching || isReviewedFetching;

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getProducts = useCallback(() => {
    switch (selectedCategory) {
      case '등록한 상품':
        return createdProductsList || [];
      case '찜한 상품':
        return favoriteProductsList || [];
      case '리뷰 남긴 상품':
        return reviewedProductsList || [];
      default:
        return [];
    }
  }, [
    selectedCategory,
    createdProductsList,
    favoriteProductsList,
    reviewedProductsList,
  ]);

  useEffect(() => {
    if (inView && hasNextCreatedPage) fetchNextCreatedPage();
    if (inView && hasNextFavoritePage) fetchNextFavoritePage();
    if (inView && hasNextReviewedPage) fetchNextReviewedPage();
  }, [
    inView,
    hasNextCreatedPage,
    fetchNextCreatedPage,
    hasNextFavoritePage,
    fetchNextFavoritePage,
    hasNextReviewedPage,
    fetchNextReviewedPage,
    getProducts,
  ]);

  return (
    <MogazoaLayout>
      <div className="mt-10 flex flex-col items-center justify-center px-5 text-var-white xl:flex-row xl:place-items-start xl:space-x-10">
        <div className="w-full max-w-[940px] xl:w-[340px]">
          <MyProfileCard user={user} />
        </div>
        <div className="w-full space-y-20 xl:w-[940px]">
          <div className="mt-[50px] space-y-[30px] xl:mt-0">
            <div>활동 내역</div>
            <div className="flex space-x-2.5 xl:space-x-5">
              <div className="w-full">
                <ActivityCard
                  status="averageLeft"
                  conScore={user?.averageRating}
                />
              </div>
              <div className="w-full">
                <ActivityCard
                  status="reviewsLeft"
                  conScore={user?.reviewCount}
                />
              </div>
              <div className="w-full">
                <ActivityCard
                  status="interest"
                  text={user?.mostFavoriteCategory?.name}
                  color="#23b581"
                />
              </div>
            </div>
          </div>
          <div className="space-y-[30px]">
            <div className="relative xl:hidden">
              <div className="flex w-[130px] cursor-pointer items-center justify-between">
                <div onClick={handleDropdown}>{selectedCategory}</div>
                <ChevronDown
                  className={`${isDropdownOpen ? 'rotate-180 transform' : ''}`}
                />
              </div>
              {isDropdownOpen && (
                <div className="absolute z-10 inline-block cursor-pointer rounded-sm border border-var-gray1 bg-[#1c1c22] text-var-gray1">
                  <div
                    className="p-3 hover:text-var-white"
                    onClick={() => {
                      setSelectedCategory('리뷰 남긴 상품');
                    }}
                  >
                    리뷰 남긴 상품
                  </div>
                  <div
                    className="p-3 hover:text-var-white"
                    onClick={() => {
                      setSelectedCategory('등록한 상품');
                    }}
                  >
                    등록한 상품
                  </div>
                  <div
                    className="p-3 hover:text-var-white"
                    onClick={() => {
                      setSelectedCategory('찜한 상품');
                    }}
                  >
                    찜한 상품
                  </div>
                </div>
              )}
            </div>
            <div className="hidden space-x-10 text-var-gray1 xl:flex">
              <div
                className={`hover:text-var-white ${selectedCategory === '리뷰 남긴 상품' ? 'text-var-white' : ''}`}
                onClick={() => setSelectedCategory('리뷰 남긴 상품')}
              >
                리뷰 남긴 상품
              </div>
              <div
                className={`hover:text-var-white ${selectedCategory === '등록한 상품' ? 'text-var-white' : ''}`}
                onClick={() => setSelectedCategory('등록한 상품')}
              >
                등록한 상품
              </div>
              <div
                className={`hover:text-var-white ${selectedCategory === '찜한 상품' ? 'text-var-white' : ''}`}
                onClick={() => setSelectedCategory('찜한 상품')}
              >
                찜한 상품
              </div>
            </div>
            {isLoading ? (
              <Spinner isLoading={isLoading} />
            ) : (
              <ProductCardList products={getProducts()} />
            )}
            <div ref={ref} />
          </div>
        </div>
      </div>
    </MogazoaLayout>
  );
};

export default MyPage;
