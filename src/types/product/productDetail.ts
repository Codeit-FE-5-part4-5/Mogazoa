interface Category {
  id: number;
  name: string;
}

interface CategoryMetric {
  rating: number;
  favoriteCount: number;
  reviewCount: number;
}

export interface ProductDetail {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  favoriteCount: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  writerId: number;
  isFavorite: boolean;
  category: Category;
  categoryMetric: CategoryMetric;
}
