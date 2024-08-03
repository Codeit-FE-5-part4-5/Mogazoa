import { useParams } from 'next/navigation';
import { useEffect, useMemo, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

import useGetCreatedProducts from '@/models/queries/user/products/created-products/useGetCreatedProducts';
import useGetFavoriteProducts from '@/models/queries/user/products/favorite-products/useGetFavoriteProducts';
import useGetReviewedProducts from '@/models/queries/user/products/reviewed-products/useGetReviewedProducts';

import ProductCardList from '@/components/feature/product/ProductCardList/ProductCardList';
import { ProductCategory } from '..';

interface ProductListProps {
  selectedCategory: ProductCategory;
}

const ProductList = ({ selectedCategory }: ProductListProps) => {
  const [ref, inView] = useInView();

  const params = useParams();

  const {
    fetchNextPage: fetchNextCreatedPage,
    hasNextPage: hasNextCreatedPage,
    data: createdProducts,
  } = useGetCreatedProducts(params?.userId);

  const {
    fetchNextPage: fetchNextFavoritePage,
    hasNextPage: hasNextFavoritePage,
    data: favoriteProducts,
  } = useGetFavoriteProducts(params?.userId);

  const {
    fetchNextPage: fetchNextReviewedPage,
    hasNextPage: hasNextReviewedPage,
    data: reviewedProducts,
  } = useGetReviewedProducts(params?.userId);

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
      <div ref={ref} />
    </>
  );
};

export default ProductList;
