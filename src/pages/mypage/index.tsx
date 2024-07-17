import ActivityCard from '@/shared/components/ActivityCard/ActivityCard';
import Floating from '@/shared/components/Floating/Floating';
import { Header } from '@/shared/components/header/header';
import MyProfileCard from '@/shared/components/MyProfileCard/MyProfileCard';
import useGetMe from '@/shared/models/auth/useGetMe';
import useGetCreatedProducts from '@/shared/models/user/products/created-products/useGetCreatedProducts';
import { getCookie } from '@/shared/utils/cookie';
import { useModal } from '@/shared/store/use-modal-store';
import useGetFavoriteProducts from '@/shared/models/user/products/favorite-products/useGetFavoriteProducts';
import useGetReviewedProducts from '@/shared/models/user/products/reviewed-products/useGetReviewedProducts';
import { useState } from 'react';
import ProductCardList from '@/shared/components/ProductCardList/ProductCardList';
import { ChevronDown } from 'lucide-react';

const MyPage = () => {
  const token = getCookie('accessToken');

  const { data: user } = useGetMe(token);

  const { data: createdProducts } = useGetCreatedProducts(
    Number(user?.data.id),
  );
  const { data: favoriteProducts } = useGetFavoriteProducts(
    Number(user?.data.id),
  );
  const { data: reviewedProducts } = useGetReviewedProducts(
    Number(user?.data.id),
  );

  const { onOpen } = useModal();

  const [selectedCategory, setSelectedCategory] = useState('리뷰 남긴 상품');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getProducts = () => {
    switch (selectedCategory) {
      case '등록한 상품':
        return createdProducts?.data.list || [];
      case '찜한 상품':
        return favoriteProducts?.data.list || [];
      case '리뷰 남긴 상품':
        return reviewedProducts?.data.list || [];
      default:
        return [];
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center px-5 text-var-white xl:flex-row xl:place-items-start xl:space-x-10">
        <div className="w-full max-w-[940px] xl:w-[340px]">
          <MyProfileCard user={user?.data} />
        </div>
        <div className="w-full space-y-20 xl:w-[940px]">
          <div className="mt-[50px] space-y-[30px] xl:mt-0">
            <div>활동 내역</div>
            <div className="flex space-x-2.5 xl:space-x-5">
              <div className="w-full">
                <ActivityCard
                  status="averageLeft"
                  conScore={user?.data?.averageRating}
                />
              </div>
              <div className="w-full">
                <ActivityCard
                  status="reviewsLeft"
                  conScore={user?.data?.reviewCount}
                />
              </div>
              <div className="w-full">
                <ActivityCard
                  status="interest"
                  text={user?.data?.mostFavoriteCategory?.name}
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
            <ProductCardList products={getProducts()} />
          </div>
        </div>
      </div>
      <div className="fixed" style={{ bottom: '10%', right: '10%' }}>
        <Floating onClick={() => onOpen('itemAdd')} />
      </div>
    </div>
  );
};

export default MyPage;
