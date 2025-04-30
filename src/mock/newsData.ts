export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  imageUrl?: string;
  source: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Technology',
    description: 'Latest tech news and innovations'
  },
  {
    id: '2',
    name: 'Business',
    description: 'Business and financial news'
  },
  {
    id: '3',
    name: 'Sports',
    description: 'Sports news and updates'
  },
  {
    id: '4',
    name: 'Entertainment',
    description: 'Entertainment and celebrity news'
  }
];

export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'New AI Breakthrough in Natural Language Processing',
    content: 'Researchers have developed a new AI model that can understand and generate human-like text with unprecedented accuracy...',
    category: 'Technology',
    author: 'John Smith',
    publishedAt: '2024-03-20T10:00:00Z',
    imageUrl: 'https://example.com/ai-image.jpg',
    source: 'Tech News Daily'
  },
  {
    id: '2',
    title: 'Global Markets Reach Record Highs',
    content: 'Stock markets around the world have reached new record highs as investor confidence grows...',
    category: 'Business',
    author: 'Jane Doe',
    publishedAt: '2024-03-20T09:30:00Z',
    imageUrl: 'https://example.com/market-image.jpg',
    source: 'Financial Times'
  },
  {
    id: '3',
    title: 'Championship Finals Set After Dramatic Semifinals',
    content: 'The championship finals are set after a series of dramatic semifinal matches that kept fans on the edge of their seats...',
    category: 'Sports',
    author: 'Mike Johnson',
    publishedAt: '2024-03-20T08:45:00Z',
    imageUrl: 'https://example.com/sports-image.jpg',
    source: 'Sports Network'
  },
  {
    id: '4',
    title: 'Award-Winning Film Director Announces New Project',
    content: 'The acclaimed director has announced their next project, which is set to begin production next month...',
    category: 'Entertainment',
    author: 'Sarah Williams',
    publishedAt: '2024-03-20T07:15:00Z',
    imageUrl: 'https://example.com/entertainment-image.jpg',
    source: 'Entertainment Weekly'
  }
]; 