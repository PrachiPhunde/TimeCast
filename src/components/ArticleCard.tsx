import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Article, Category } from '../types';
import { categoryInfo } from '../mock/data';
import { Clock, TrendingUp } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  isNew?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, isNew = false }) => {
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);

  const formattedDate = formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true });

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 h-full flex flex-col ${
        isNew ? 'animate-fadeIn relative' : ''
      }`}
    >
      {isNew && (
        <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded-bl-lg z-10">
          NEW
        </div>
      )}
      
      {article.trending && (
        <div className="absolute top-0 left-0 bg-amber-500 text-white px-2 py-1 text-xs font-semibold rounded-br-lg flex items-center gap-1 z-10">
          <TrendingUp size={12} /> TRENDING
        </div>
      )}
      
      <div className="relative h-48 overflow-hidden">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryInfo[article.category].color}`}>
            {categoryInfo[article.category].name}
          </span>
        </div>
      </div>
      
      <div className="flex-1 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {article.summary}
        </p>
      </div>
      
      <div className="px-4 pb-4 mt-auto">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <span>{article.source}</span>
            <span className="mx-2">•</span>
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{article.readTime} min read</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;