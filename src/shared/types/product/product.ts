import { ChangeEventHandler, SetStateAction } from 'react';

export interface Product {
  categoryId: number;
  createdAt: string;
  favoriteCount: number;
  id: number;
  image: string;
  name: string;
  rating: number;
  reviewCount: number;
  updatedAt: string;
  writerId: number;
}
export interface ItemListResponse {
  list: Product[];
  nextCursor: number;
}

export interface CompareUseInfiniteQuery {
  fetchNextPage: () => void;
  isFetching: boolean;
  hasNextPage: boolean | undefined;
}
export interface CompareDropDownProps extends CompareUseInfiniteQuery {
  itemList: ItemListResponse[];
  onClick: (arg: string) => void;
  Bedge: string;
  setBedge: React.Dispatch<SetStateAction<string>>;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  setIsTable: React.Dispatch<SetStateAction<boolean>>;
  setValue: React.Dispatch<SetStateAction<string>>;
  setProductId: React.Dispatch<SetStateAction<number | null>>;
}

export interface CompareItemListProps extends CompareUseInfiniteQuery {
  itemList: ItemListResponse['list'];
  onClick: (name: string, id: number) => void;
}
