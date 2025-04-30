import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Article } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { TrendingUp, ExternalLink } from 'lucide-react';
import { categoryInfo } from '@/mock/data';

const TrendingArticles: React.FC = () => {
  const { articles } = useSelector((state: RootState) => state.news);
  
  // Filter for trending articles and take the top 5
  const trendingArticles = articles
    .filter(article => article.trending)
    .slice(0, 5);
    
  if (trendingArticles.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-6 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-red-500" size={20} />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Trending Now
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {trendingArticles.map((article) => (
            <TrendingArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

const TrendingArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  const formattedDate = formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true });
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
      <div className="flex items-center mb-2">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryInfo[article.category].color}`}>
          {categoryInfo[article.category].name}
        </span>
        <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
          {formattedDate}
        </span>
      </div>
      
      <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
        {article.title}
      </h3>
      
      <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
        {article.summary}
      </p>
      
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500 dark:text-gray-400">
          {article.source}
        </span>
        <button className="text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline">
          Read <ExternalLink size={12} />
        </button>
      </div>
    </div>
  );
};

export default TrendingArticles;