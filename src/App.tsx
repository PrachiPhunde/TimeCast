import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import NewsFeed from './components/NewsFeed';
import RealtimeIndicator from './components/RealtimeIndicator';
import TrendingArticles from './components/TrendingArticles';
import NotificationToast from './components/NotificationToast';
import useWebSocket from './hooks/useWebSocket';
import { fetchAllArticles } from './store/slices/newsSlice';

function App() {
  const dispatch = useDispatch();
  const { sidebarOpen, darkMode } = useSelector((state: RootState) => state.ui);
  useWebSocket(); // Initialize WebSocket connection
  
  // Fetch initial data on app mount
  useEffect(() => {
    dispatch(fetchAllArticles());
  }, [dispatch]);
  
  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  
  return (
    <div className={`min-h-screen bg-almond-500 dark:bg-coffee-200 transition-colors duration-200`}>
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-64' : ''
        }`}>
          <div className="max-w-7xl mx-auto">
            <NewsFeed />
            <TrendingArticles />
          </div>
        </main>
      </div>
      
      <RealtimeIndicator />
      <NotificationToast />
    </div>
  );
}

export default App;