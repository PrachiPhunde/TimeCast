import React, { useState, useEffect } from 'react';
import { Search, Sun, Moon, Menu, Bell, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode, setSearchQuery, toggleSidebar } from '../store/slices/uiSlice';
import { RootState } from '../store';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);
  const searchQuery = useSelector((state: RootState) => state.ui.searchQuery);
  const notifications = useSelector((state: RootState) => state.ui.notifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
  };

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };

  const toggleNotificationsPanel = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <header 
      className={`sticky top-0 z-50 bg-dun-500 dark:bg-coffee-300 transition-all duration-200 ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <button
              className="p-2 rounded-md text-coffee-400 hover:text-coffee-600 dark:text-tan-400 dark:hover:text-tan-300 lg:hidden"
              onClick={handleSidebarToggle}
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center ml-2 lg:ml-0">
              <span className="text-2xl font-bold text-rawUmber-500 dark:text-tan-400">The Time</span>
              <span className="text-2xl font-bold text-coffee-500 dark:text-almond-500">Cast</span>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-coffee-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                className="w-full py-2 pl-10 pr-4 bg-almond-500 dark:bg-coffee-400 border-0 rounded-full focus:ring-2 focus:ring-rawUmber-400 dark:focus:ring-tan-400 text-coffee-500 dark:text-almond-500 placeholder-coffee-300 dark:placeholder-tan-300"
                placeholder="Search news..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              className="p-2 rounded-full hover:bg-almond-400 dark:hover:bg-coffee-400 text-coffee-400 dark:text-tan-400"
              onClick={toggleNotificationsPanel}
            >
              <div className="relative">
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rawUmber-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {notifications.length}
                  </span>
                )}
              </div>
            </button>
            <button
              className="p-2 rounded-full hover:bg-almond-400 dark:hover:bg-coffee-400 text-coffee-400 dark:text-tan-400"
              onClick={handleDarkModeToggle}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        <div className="pb-3 md:hidden">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-coffee-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              className="w-full py-2 pl-10 pr-4 bg-almond-500 dark:bg-coffee-400 border-0 rounded-full focus:ring-2 focus:ring-rawUmber-400 dark:focus:ring-tan-400 text-coffee-500 dark:text-almond-500 placeholder-coffee-300 dark:placeholder-tan-300"
              placeholder="Search news..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      {showNotifications && (
        <div className="absolute right-4 mt-2 w-80 bg-almond-500 dark:bg-coffee-400 rounded-md shadow-lg overflow-hidden z-50 border border-tan-300 dark:border-coffee-500">
          <div className="flex items-center justify-between px-4 py-2 bg-dun-500 dark:bg-coffee-300">
            <h3 className="text-sm font-semibold text-coffee-500 dark:text-almond-500">Notifications</h3>
            <button 
              className="text-coffee-400 hover:text-coffee-600 dark:text-tan-400 dark:hover:text-tan-300"
              onClick={toggleNotificationsPanel}
            >
              <X size={16} />
            </button>
          </div>
          <div className="max-h-60 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-6 text-center text-sm text-coffee-400 dark:text-tan-400">
                No new notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className="px-4 py-3 border-b border-tan-300 dark:border-coffee-500 hover:bg-dun-500 dark:hover:bg-coffee-300"
                >
                  <p className="text-sm text-coffee-500 dark:text-almond-500">{notification.message}</p>
                  <p className="text-xs text-coffee-400 dark:text-tan-400 mt-1">
                    {new Date(notification.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;