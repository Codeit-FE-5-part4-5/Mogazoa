import { useSuspenseQuery } from '@tanstack/react-query';
import { Product } from '@/types/product/product';
import sortedProductsService from '@/models/services/product/sortedProductsService';
import TrendRankingCard from './TrendRankingCard/TrendRankingCard';

const BestProductList = () => {
  const { data: sortedProducts } = useSuspenseQuery(
    sortedProductsService.queryOptions('reviewCount'),
  );

  return (
    <div className="mt-[45px] flex flex-col gap-[20px] overflow-x-auto bg-[#1C1C22] text-[#F1F1F5] no-scrollbar xl:order-1 xl:h-full xl:w-[300px]">
      <div className="ml-[20px] text-[14px] font-bold">핫한 상품 랭킹</div>
      <div className="flex xl:flex xl:flex-col xl:items-start xl:gap-[10px]">
        {sortedProducts?.list.map((product: Product) => (
          <TrendRankingCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestProductList;
