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
