import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { fetchAllArticles, setSelectedCategory } from '@/store/slices/newsSlice';
import ArticleCard from './ArticleCard';
import { Category } from '@/types';
import { RefreshCw } from 'lucide-react';
import { categoryInfo } from '@/mock/data';
import useWebSocket from '@/hooks/useWebSocket';
import { formatDistanceToNow } from 'date-fns';

const NewsFeed: React.FC = () => {
  const dispatch = useDispatch();
  const { 
    filteredArticles, 
    selectedCategory, 
    loading, 
    lastUpdated, 
    subscribedCategories 
  } = useSelector((state: RootState) => state.news);
  const { darkMode, searchQuery } = useSelector((state: RootState) => state.ui);
  const [newArticleIndices, setNewArticleIndices] = useState<Set<number>>(new Set());
  const { simulateNewArticle } = useWebSocket();
  
  // Fetch articles on mount
  useEffect(() => {
    dispatch(fetchAllArticles());
  }, [dispatch]);

  // Reset new article animations after 5 seconds
  useEffect(() => {
    if (newArticleIndices.size > 0) {
      const timer = setTimeout(() => {
        setNewArticleIndices(new Set());
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [newArticleIndices]);

  // Track new articles based on lastUpdated changes
  useEffect(() => {
    if (lastUpdated && filteredArticles.length > 0) {
      setNewArticleIndices(new Set([0]));
    }
  }, [lastUpdated, filteredArticles.length]);

  // Filter articles by search query
  const displayedArticles = searchQuery 
    ? filteredArticles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.source.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredArticles;

  const handleRefresh = () => {
    dispatch(fetchAllArticles());
  };

  const handleCategoryClick = (category: Category | null) => {
    dispatch(setSelectedCategory(category));
  };

  // Force trigger a new article (for demo purposes)
  const handleForceNewArticle = () => {
    simulateNewArticle();
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      {/* Feed Header with filters */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedCategory 
                ? `${categoryInfo[selectedCategory].name} News`
                : 'Latest News'}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {lastUpdated 
                ? `Last updated ${new Date(lastUpdated).toLocaleTimeString()}`
                : 'Updating in real-time'}
            </p>
          </div>
          
          <div className="flex gap-2">
            <button
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800 transition-colors"
              onClick={handleForceNewArticle}
            >
              <RefreshCw size={16} className="animate-pulse" />
              Demo New Article
            </button>
            <button
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors"
              onClick={handleRefresh}
              disabled={loading}
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>
        
        {/* Category Pills for Mobile/Tablet */}
        <div className="flex flex-wrap gap-2 mt-4 lg:hidden">
          <button
            className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
              selectedCategory === null 
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            }`}
            onClick={() => handleCategoryClick(null)}
          >
            All
          </button>
          
          {Object.entries(categoryInfo).map(([id, info]) => (
            <button
              key={id}
              className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
                selectedCategory === id 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              } ${!subscribedCategories.includes(id as Category) ? 'opacity-60' : ''}`}
              onClick={() => handleCategoryClick(id as Category)}
            >
              {info.name}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* No Results */}
      {!loading && displayedArticles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {searchQuery 
              ? `No articles found matching "${searchQuery}"`
              : 'No articles available in this category'}
          </p>
        </div>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedArticles.map((article, index) => (
          <ArticleCard 
            key={article.id} 
            article={article} 
            isNew={newArticleIndices.has(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;