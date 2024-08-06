const ProductCardListSkeleton = ({
  hasCarousel,
}: {
  hasCarousel?: boolean;
}) => {
  if (hasCarousel) {
    return (
      <div className="mx-[20px] mb-[20px] flex-1 animate-pulse xl:mt-[60px]">
        <ProductCardListSkeleton.Carousel />
        <div className="mb-[60px] flex justify-between">
          <div className="skeleton-base h-[32px] w-[200px]" />
          <div className="skeleton-base h-[32px] w-[100px]" />
        </div>
        <div className="mb-[20px] grid grid-cols-2 gap-5 overflow-y-scroll no-scrollbar xl:grid-cols-3">
          <ProductCardListSkeleton.Card />
          <ProductCardListSkeleton.Card />
          <ProductCardListSkeleton.Card />
          <ProductCardListSkeleton.Card />
        </div>
      </div>
    );
  }
  return (
    <div className="mb-[20px] grid animate-pulse grid-cols-2 gap-5 overflow-y-scroll no-scrollbar xl:grid-cols-3">
      <ProductCardListSkeleton.Card />
      <ProductCardListSkeleton.Card />
      <ProductCardListSkeleton.Card />
      <ProductCardListSkeleton.Card />
    </div>
  );
};

ProductCardListSkeleton.Carousel = () => {
  return (
    <>
      <div className="skeleton-base mb-[30px] h-[28px] w-[120px]" />
      <div className="skeleton-base relative mb-[30px] h-[300px] w-full rounded-[8px]">
        <div className="skeleton-base absolute bottom-0">
          <div />
        </div>
      </div>
    </>
  );
};

ProductCardListSkeleton.Card = () => {
  return (
    <div className="group cursor-pointer overflow-hidden rounded-[8px] border border-[#353542] bg-[#252530]">
      <div className="skeleton-base relative h-[120px] overflow-hidden rounded-none md:h-[160px] xl:h-[200px]">
        <div />
      </div>
      <div className="px-[12px] py-[12px]">
        <div className="skeleton-base h-[18px] w-[40px] font-medium md:text-[16px]" />
        <div className="flex flex-col md:mt-[10px] md:flex-row md:justify-between">
          <div className="flex flex-1 gap-[8px]">
            <div className="skeleton-base my-[5px] flex h-[18px] w-[50px] gap-[10px] md:my-0 md:gap-[15px]" />
            <div className="skeleton-base my-[5px] flex h-[18px] w-[50px] gap-[10px] md:my-0 md:gap-[15px]" />
          </div>
          <div className="skeleton-base my-[5px] flex h-[18px] w-[50px] gap-[10px] md:my-0 md:gap-[15px]" />
        </div>
      </div>
    </div>
  );
};
export default ProductCardListSkeleton;
