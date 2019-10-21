export enum Category {
  BOOKS = 'Books',
  ELECTRONICS = 'Electronics',
  FURNITURE = 'Furniture'
}

export interface BasicProduct {
  id: string;
  category: Category;
  price: number;
  title: string;
  url: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

export interface Product extends BasicProduct {
  description?: string;
}
