import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setSelectedCategory, toggleCategorySubscription } from '@/store/slices/newsSlice';
import { setSidebarOpen } from '@/store/slices/uiSlice';
import { Category } from '@/types';
import { categoryInfo } from '@/mock/data';
import { 
  Cpu, Briefcase, Trophy, Landmark, HeartPulse, Film, 
  FlaskConical, Home, X, Bell, Star
} from 'lucide-react';

// Map of category IDs to Lucide icons
const categoryIcons: Record<Category, React.ReactNode> = {
  tech: <Cpu size={18} />,
  business: <Briefcase size={18} />,
  sports: <Trophy size={18} />,
  politics: <Landmark size={18} />,
  health: <HeartPulse size={18} />,
  entertainment: <Film size={18} />,
  science: <FlaskConical size={18} />,
};

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedCategory, subscribedCategories } = useSelector((state: RootState) => state.news);
  const { sidebarOpen, darkMode } = useSelector((state: RootState) => state.ui);

  const handleCategoryClick = (category: Category | null) => {
    dispatch(setSelectedCategory(category));
    // On mobile, close sidebar after category selection
    if (window.innerWidth < 1024) {
      dispatch(setSidebarOpen(false));
    }
  };

  const handleSubscribeToggle = (e: React.MouseEvent, category: Category) => {
    e.stopPropagation();
    dispatch(toggleCategorySubscription(category));
  };

  const closeSidebar = () => {
    dispatch(setSidebarOpen(false));
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out z-30 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header with close button for mobile */}
          <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">The Time</span>
              <span className="text-xl font-bold text-gray-800 dark:text-gray-100">Cast</span>
            </div>
            <button
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white lg:hidden"
              onClick={closeSidebar}
            >
              <X size={20} />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto py-4 px-3">
            <nav className="space-y-1">
              <button
                className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  selectedCategory === null
                    ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
                onClick={() => handleCategoryClick(null)}
              >
                <Home size={18} className="mr-3" />
                All News
              </button>

              <div className="pt-3">
                <div className="px-3 py-2 flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Categories
                  </h3>
                </div>
                
                {Object.entries(categoryInfo).map(([id, info]) => (
                  <button
                    key={id}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium group ${
                      selectedCategory === id
                        ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => handleCategoryClick(id as Category)}
                  >
                    <div className="flex items-center">
                      <span className="mr-3">{categoryIcons[id as Category]}</span>
                      {info.name}
                    </div>
                    <button
                      className={`p-1 rounded-full ${
                        subscribedCategories.includes(id as Category) 
                          ? 'text-yellow-500 hover:text-yellow-600 dark:text-yellow-400 dark:hover:text-yellow-300' 
                          : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400'
                      } opacity-70 group-hover:opacity-100 transition-opacity`}
                      onClick={(e) => handleSubscribeToggle(e, id as Category)}
                      aria-label={subscribedCategories.includes(id as Category) ? `Unsubscribe from ${info.name}` : `Subscribe to ${info.name}`}
                    >
                      <Star size={16} fill={subscribedCategories.includes(id as Category) ? "currentColor" : "none"} />
                    </button>
                  </button>
                ))}
              </div>

              <div className="pt-3">
                <div className="px-3 py-2">
                  <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Your Feeds
                  </h3>
                </div>
                
                <button
                  className="w-full flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <Bell size={18} className="mr-3" />
                  Subscribed
                </button>
                
                <button
                  className="w-full flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <Star size={18} className="mr-3" />
                  Trending
                </button>
              </div>
            </nav>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                U
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">View profile</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;