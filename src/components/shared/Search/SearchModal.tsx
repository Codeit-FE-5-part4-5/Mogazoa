import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/shared/ui/dialog';
import Image from 'next/image';
import { ChangeEvent, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import productsService from '@/models/services/product/productsService';
import { CATEGORY_LIST } from '@/constants/category';
import { MAX_SEARCH_HISTORY_LENGTH } from '@/constants/search';
import { useChangeRouter, useInput, useIntersect } from '@/hooks';
import { Product } from '@/types/product/product';

import useSearch from '@/store/use-search-store';
import TextFieldInput from '../Input/TextFieldInput';

interface SearchResultProps {
  categoryId: number;
  id: number;
  name: string;
  favoriteCount: number;
  rating: number;
  reviewCount: number;
  onRedirectProductPage: (id: number, name: string) => void;
}

interface SearchInputProps {
  keyword: string;
  onChangeKeyword: (e: ChangeEvent<HTMLInputElement>) => void;
  initKeyword: () => void;
}

const SearchModal = () => {
  const { isOpen, onClose } = useSearch();
  const { handleRedirect } = useChangeRouter();
  const [keyword, onChangeKeyword, initKeyword] = useInput('');
  const {
    data: result,
    isFetching,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(productsService.searchQueryOption({ keyword }));
  const [ref, inView] = useIntersect<HTMLDivElement>(isFetching);

  const handleStorage = (productId: number, productName: string) => {
    let prevHistory = JSON.parse(localStorage.getItem('searchHistory')!);
    let nextHistory;

    if (!prevHistory) {
      prevHistory = [];
    }

    if (prevHistory?.length >= MAX_SEARCH_HISTORY_LENGTH) {
      prevHistory.unshift({ id: productId, name: productName });
      nextHistory = prevHistory.slice(0, 5);
    } else {
      prevHistory.unshift({
        id: productId,
        name: productName,
      });
      nextHistory = prevHistory.slice(0);
    }

    localStorage.setItem('searchHistory', JSON.stringify(nextHistory));
  };

  const handleRedirectProductPage = (
    productId: number,
    productName: string,
  ) => {
    handleRedirect(`/detail/${productId}`);
    handleStorage(productId, productName);
    onClose();
  };

  useEffect(() => {
    if (hasNextPage && inView && keyword) {
      fetchNextPage();
    }
  }, [hasNextPage, inView]);

  useEffect(() => {
    return () => {
      initKeyword();
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="top-[16px] mx-auto max-h-[80%] w-full max-w-[calc(100%-40px)] translate-y-0 grid-rows-[100px_1fr] gap-[24px] border-var-gray1 bg-[#1c1c22] text-var-white md:max-w-[70%]">
        <DialogHeader className="px-[8px]">
          <DialogTitle>
            <SearchModal.SearchInput
              keyword={keyword}
              onChangeKeyword={onChangeKeyword}
              initKeyword={initKeyword}
            />
          </DialogTitle>
          <DialogDescription className="mt-[12px] h-full">
            <SearchModal.RecentKeyword
              onRedirectProductPage={handleRedirectProductPage}
            />
          </DialogDescription>
        </DialogHeader>
        <div className="search_modal_scrollbar flex h-full flex-grow flex-col items-start gap-[12px] overflow-y-auto">
          {keyword
            ? result?.pages?.map((page) =>
                page.list.map((product: Product, idx: number) => {
                  if (page.list.length - 1 === idx) {
                    return (
                      <>
                        <SearchModal.SearchResult
                          key={product.id}
                          id={product.id}
                          categoryId={product.categoryId}
                          name={product.name}
                          favoriteCount={product.favoriteCount}
                          rating={product.rating}
                          reviewCount={product.reviewCount}
                          onRedirectProductPage={handleRedirectProductPage}
                        />
                        {isSuccess && <div ref={ref} />}
                      </>
                    );
                  }
                  return (
                    <SearchModal.SearchResult
                      key={product.id}
                      id={product.id}
                      categoryId={product.categoryId}
                      name={product.name}
                      favoriteCount={product.favoriteCount}
                      rating={product.rating}
                      reviewCount={product.reviewCount}
                      onRedirectProductPage={handleRedirectProductPage}
                    />
                  );
                }),
              )
            : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};

SearchModal.SearchInput = ({
  keyword,
  onChangeKeyword,
  initKeyword,
}: SearchInputProps) => {
  return (
    <div className="relative">
      <TextFieldInput
        value={keyword}
        onChange={onChangeKeyword}
        placeholder="원하는 상품을 검색하세요"
        className="mt-[18px] pl-[48px] font-light"
      />
      <Image
        src="/images/search.svg"
        alt="검색창 열기 버튼"
        width={24}
        height={24}
        className="absolute top-[50%] ml-[12px] -translate-y-[3px]"
      />
      {keyword && (
        <button
          type="button"
          onClick={initKeyword}
          className="absolute right-[12px] top-[50%]"
        >
          <Image src="/close.svg" alt="검색초기화버튼" width={16} height={16} />
        </button>
      )}
    </div>
  );
};

SearchModal.SearchResult = ({
  categoryId,
  id,
  name,
  favoriteCount,
  rating,
  reviewCount,
  onRedirectProductPage,
}: SearchResultProps) => {
  const category = CATEGORY_LIST.find((item) => item.id === categoryId)!;
  return (
    <button
      type="button"
      onClick={() => onRedirectProductPage(id, name)}
      className="flex w-full flex-col rounded-[12px] px-[8px] py-[8px] text-var-gray1 hover:bg-var-black3"
    >
      <p className="text-[14px]">{category.name}</p>
      <h1 className="text-[18px] text-var-white">{name}</h1>
      <div className="flex gap-[12px] text-[12px]">
        <p>찜 {favoriteCount}</p>
        <p>리뷰 {reviewCount}</p>
        <p>별점 {rating}</p>
      </div>
    </button>
  );
};

SearchModal.RecentKeyword = ({
  onRedirectProductPage,
}: {
  onRedirectProductPage: (productId: number, productName: string) => void;
}) => {
  const recentKeyword = JSON.parse(localStorage.getItem('searchHistory')!);

  return (
    <div className="flex flex-wrap">
      {recentKeyword && (
        <>
          <p>최근 검색 :</p>&nbsp;
        </>
      )}
      {recentKeyword?.map(
        (keyword: { id: number; name: string }, idx: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <>
            <button
              type="button"
              onClick={() => onRedirectProductPage(keyword.id, keyword.name)}
              className="hover:underline"
              key={keyword.id}
            >
              {keyword.name}
            </button>
            {recentKeyword.length - 1 !== idx ? ',' : ''}&nbsp;
          </>
        ),
      )}
    </div>
  );
};

export default SearchModal;
