import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeNotification } from '../store/slices/uiSlice';
import { X, AlertCircle, Info, Check, AlertTriangle } from 'lucide-react';

const NotificationToast: React.FC = () => {
  const notifications = useSelector((state: RootState) => state.ui.notifications);
  const dispatch = useDispatch();

  const getIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="text-red-500" size={18} />;
      case 'warning':
        return <AlertTriangle className="text-amber-500" size={18} />;
      case 'success':
        return <Check className="text-green-500" size={18} />;
      default:
        return <Info className="text-blue-500" size={18} />;
    }
  };

  useEffect(() => {
    // Auto-dismiss notifications after 5 seconds
    if (notifications.length > 0) {
      const timerId = setTimeout(() => {
        dispatch(removeNotification(notifications[0].id));
      }, 5000);

      return () => clearTimeout(timerId);
    }
  }, [notifications, dispatch]);

  if (notifications.length === 0) {
    return null;
  }

  // Only show the most recent notification
  const notification = notifications[0];

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm w-full">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 p-4 transform transition-all duration-500 ease-in-out animate-slideUp">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {getIcon(notification.type)}
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {notification.message}
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {new Date(notification.timestamp).toLocaleTimeString()}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="bg-transparent rounded-md inline-flex text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 focus:outline-none"
              onClick={() => dispatch(removeNotification(notification.id))}
            >
              <span className="sr-only">Close</span>
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationToast;