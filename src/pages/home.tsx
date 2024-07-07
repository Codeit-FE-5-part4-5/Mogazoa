import { Header } from '@/shared/components/header/header';
import ProductCard from '@/shared/components/ProductCard/ProductCard';
import { RankingList } from '@/shared/components/RankingList/RankingList';
import { SlideMenu } from '@/shared/components/SlideMenu/SlideMenu';

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="flex justify-center">
        <div className="hidden md:flex">
          <SlideMenu />
        </div>
        <div className="flex flex-col md:pl-[25px] xl:flex-row xl:pl-[90px] xl:pr-[60px]">
          <div className="xl:order-2">
            <RankingList />
          </div>
          <div className="mt-[60px] xl:order-1">
            <h1 className="mb-[30px] text-[24px] font-semibold text-var-white">
              지금 핫한 상품
              <span className="bg-gradient-custom bg-clip-text text-transparent">
                TOP 6
              </span>
            </h1>
            <div className="flex flex-wrap gap-[20px]">
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
