import { useEffect, useMemo, useCallback } from 'react';

import useGetCreatedProducts from '@/models/queries/user/products/created-products/useGetCreatedProducts';
import useGetFavoriteProducts from '@/models/queries/user/products/favorite-products/useGetFavoriteProducts';
import useGetReviewedProducts from '@/models/queries/user/products/reviewed-products/useGetReviewedProducts';
import { Me } from '@/types/user/user';
import { ProductCategory } from '@/pages/user/[userId]';
import ProductCardList from '@/components/feature/product/ProductCardList/ProductCardList';
import { useIntersect } from '@/hooks';

interface ProductListProps {
  selectedCategory: ProductCategory;
  user: Me;
}

const ProductList = ({ selectedCategory, user }: ProductListProps) => {
  const {
    fetchNextPage: fetchNextCreatedPage,
    hasNextPage: hasNextCreatedPage,
    data: createdProducts,
    isLoading: createdLoading,
    isSuccess: createdSuccess,
  } = useGetCreatedProducts(user?.id);

  const {
    fetchNextPage: fetchNextFavoritePage,
    hasNextPage: hasNextFavoritePage,
    data: favoriteProducts,
    isLoading: favoriteLoading,
    isSuccess: favoriteSuccess,
  } = useGetFavoriteProducts(user?.id);

  const {
    fetchNextPage: fetchNextReviewedPage,
    hasNextPage: hasNextReviewedPage,
    data: reviewedProducts,
    isLoading: reviewedLoading,
    isSuccess: reviewedSuccess,
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

  const getProducts = useCallback(() => {
    switch (selectedCategory) {
      case ProductCategory.CREATED:
        return createdProductsList || [];
      case ProductCategory.FAVORITE:
        return favoriteProductsList || [];
      case ProductCategory.REVIEWED:
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
  const isLoading = createdLoading || favoriteLoading || reviewedLoading;
  const isSuccess = createdSuccess || favoriteSuccess || reviewedSuccess;
  const [ref, inView] = useIntersect<HTMLDivElement>(isLoading);

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
    <>
      <ProductCardList products={getProducts()} />
      {isSuccess && <div ref={ref} />}
    </>
  );
};

export default ProductList;
