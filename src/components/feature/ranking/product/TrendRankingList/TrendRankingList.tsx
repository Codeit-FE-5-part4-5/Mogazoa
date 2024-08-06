import { useSuspenseQuery } from '@tanstack/react-query';
import { Product } from '@/types/product/product';
import productsService from '@/models/services/product/productsService';
import { withFetchBoundary } from '@/components/shared';
import TrendRankingCard from '../TrendRankingCard/TrendRankingCard';

const TrendRankingList = () => {
  const { data: sortedProducts } = useSuspenseQuery(
    productsService.queryOptions({ order: 'reviewCount' }),
  );

  return (
    <div className="mt-[45px] flex animate-fadeIn flex-col gap-[20px] bg-[#1C1C22] text-[#F1F1F5] xl:order-1 xl:h-full xl:w-[300px]">
      <div className="ml-[20px] text-[14px] font-bold">요즘 뜨는 상품들</div>
      <div className="flex overflow-x-auto no-scrollbar xl:flex xl:flex-col xl:items-start xl:gap-[10px]">
        {sortedProducts?.map((product: Product) => (
          <TrendRankingCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const TrendRankingListWithBoundary = withFetchBoundary(
  TrendRankingList,
  'trendRankingList',
);

export default TrendRankingListWithBoundary;
