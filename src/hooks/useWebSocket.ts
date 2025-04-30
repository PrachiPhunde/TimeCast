import { useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addRealtimeArticle, simulateNewArticle } from '../store/slices/newsSlice';
import { addNotification } from '../store/slices/uiSlice';
import { Article } from '../types';

// This is a simulated WebSocket hook since we don't have a real backend
export const useWebSocket = () => {
  const dispatch = useDispatch();
  const intervalRef = useRef<number | null>(null);

  const simulateNewArticleReceived = useCallback(() => {
    dispatch(simulateNewArticle());
    dispatch(addNotification({
      message: 'New article received!',
      type: 'info'
    }));
  }, [dispatch]);

  // Simulate receiving a new article every 20-30 seconds
  useEffect(() => {
    const startSimulation = () => {
      // Clear any existing interval
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }

      // Set a new random interval between 20-30 seconds
      const randomInterval = Math.floor(Math.random() * 10000) + 20000;
      intervalRef.current = window.setInterval(() => {
        simulateNewArticleReceived();
      }, randomInterval);
    };

    startSimulation();

    // Clean up on unmount
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [simulateNewArticleReceived]);

  // Function to manually add a real-time article (for demo purposes)
  const sendArticle = (article: Article) => {
    dispatch(addRealtimeArticle(article));
  };

  return {
    sendArticle,
    simulateNewArticle: simulateNewArticleReceived
  };
};

export default useWebSocket;