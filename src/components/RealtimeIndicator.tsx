import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Radio } from 'lucide-react';

const RealtimeIndicator: React.FC = () => {
  const lastUpdated = useSelector((state: RootState) => state.news.lastUpdated);
  const [isBlinking, setIsBlinking] = useState(false);
  
  // Blink indicator when new updates arrive
  useEffect(() => {
    if (lastUpdated) {
      setIsBlinking(true);
      const timer = setTimeout(() => {
        setIsBlinking(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [lastUpdated]);
  
  return (
    <div className={`fixed bottom-4 left-4 z-50 flex items-center space-x-2 px-3 py-2 rounded-full bg-white dark:bg-gray-800 shadow-md ${
      isBlinking ? 'animate-pulse' : ''
    }`}>
      <Radio size={16} className={`text-green-500 ${isBlinking ? 'animate-ping' : 'animate-pulse'}`} />
      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
        Real-time updates active
      </span>
    </div>
  );
};

export default RealtimeIndicator;