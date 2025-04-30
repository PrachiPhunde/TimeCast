export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: Category;
  author: string;
  publishedAt: string;
  imageUrl: string;
  source: string;
  trending: boolean;
  readTime: number;
}

export type Category = 'tech' | 'business' | 'sports' | 'politics' | 'health' | 'entertainment' | 'science';

export interface CategoryInfo {
  id: Category;
  name: string;
  color: string;
  icon: string;
}