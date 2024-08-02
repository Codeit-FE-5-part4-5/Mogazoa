import { useEffect, useMemo, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import ProductCardList from '@/shared/components/ProductCardList/ProductCardList';
import Spinner from '@/shared/components/Spinner/Spinner';
import useGetCreatedProducts from '@/models/user/products/created-products/useGetCreatedProducts';
import useGetFavoriteProducts from '@/models/user/products/favorite-products/useGetFavoriteProducts';
import useGetReviewedProducts from '@/models/user/products/reviewed-products/useGetReviewedProducts';
import useGetMe from '@/models/auth/useGetMe';
import { ProductCategory } from '..';

interface ProductListProps {
  selectedCategory: ProductCategory;
}

const ProductList = ({ selectedCategory }: ProductListProps) => {
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

  const isLoading =
    isCreatedFetching || isFavoriteFetching || isReviewedFetching;

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
      {isLoading ? (
        <Spinner isLoading={isLoading} />
      ) : (
        <ProductCardList products={getProducts()} />
      )}
      <div ref={ref} />
    </>
  );
};

export default ProductList;
