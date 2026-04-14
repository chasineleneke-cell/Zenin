import React, { useState, useRef, useEffect } from 'react';
import { Bell, Menu, Search, Moon, Sun, Check, CheckCircle2, AlertCircle, Info, BookOpen, User, CreditCard, LayoutDashboard, FileText, ChevronRight, Building, Library } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

// Searchable index of portal pages
const searchIndex = [
  { id: 'dashboard', title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, description: 'View your overall academic summary and CGPA' },
  { id: 'registration', title: 'Course Registration', path: '/registration', icon: BookOpen, description: 'Register for classes and view available courses' },
  { id: 'results', title: 'Exam Results', path: '/results', icon: FileText, description: 'Check your current and past semester grades' },
  { id: 'fees', title: 'Fees & Payments', path: '/fees', icon: CreditCard, description: 'View outstanding balance and payment history' },
  { id: 'hostel', title: 'Hostel Management', path: '/hostel', icon: Building, description: 'Book and manage your accommodation' },
  { id: 'library', title: 'Library Center', path: '/library', icon: Library, description: 'Browse catalog and manage borrowed books' },
  { id: 'profile', title: 'Student Profile', path: '/profile', icon: User, description: 'Update contact details and view academic info' }
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useStore(state => state.user);
  const theme = useStore(state => state.theme);
  const toggleTheme = useStore(state => state.toggleTheme);
  const notifications = useStore(state => state.notifications);
  const markNotificationAsRead = useStore(state => state.markNotificationAsRead);
  const clearNotifications = useStore(state => state.clearNotifications);
  const sidebarOpen = useStore(state => state.sidebarOpen);
  const setSidebarOpen = useStore(state => state.setSidebarOpen);
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'warning': return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case 'system': return <Info className="w-5 h-5 text-blue-500" />;
      default: return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    }
  };
  
  // Filter search results
  const searchResults = searchQuery.trim() === '' 
    ? searchIndex 
    : searchIndex.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchQuery]);

  const handleKeyDown = (e) => {
    if (!showSearch) return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < searchResults.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
        handleSearchSelect(searchResults[selectedIndex].path);
      } else if (searchResults.length > 0) {
        handleSearchSelect(searchResults[0].path); // Fallback to first if none explicitly selected
      }
    } else if (e.key === 'Escape') {
      setShowSearch(false);
    }
  };

  const handleSearchSelect = (path) => {
    navigate(path);
    setShowSearch(false);
    setSearchQuery('');
    setSelectedIndex(-1);
  };
  
  // Format page title from pathname
  const getPageTitle = () => {
    const path = location.pathname.split('/')[1];
    if (!path) return 'Dashboard';
    if (path === 'registration') return 'Course Registration';
    if (path === 'fees') return 'Fees & Payments';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <header className="absolute top-0 right-0 left-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700/50 h-16 flex items-center justify-between px-6 z-10 transition-colors duration-300">
      
      {/* Mobile Menu Button - Hidden on desktop */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Page Title */}
      <div className="hidden md:block">
        <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100 transition-colors duration-300">
          {getPageTitle()}
        </h1>
      </div>

      {/* Right side interactions */}
      <div className="flex items-center space-x-4">
        
        {/* Search */}
        <div className="relative hidden lg:block" ref={searchRef}>
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-4 border border-transparent focus-within:border-primary-300 focus-within:bg-white dark:focus-within:bg-slate-900 focus-within:ring-4 focus-within:ring-primary-50 transition-all z-20">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search portal..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSearch(true)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm py-2 px-3 w-64 text-slate-700 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>

          {/* Search Dropdown */}
          {showSearch && (
            <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden z-50 animate-fade-in origin-top">
              <div className="p-3 border-b border-slate-100 dark:border-slate-700/50 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Quick Jump</span>
                <span className="text-xs text-slate-400 px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded-md">esc to close</span>
              </div>
              
              <div className="py-2 max-h-80 overflow-y-auto">
                {searchResults.length === 0 ? (
                  <div className="p-6 text-center text-slate-500 dark:text-slate-400">
                    <Search className="w-8 h-8 mx-auto mb-2 opacity-20" />
                    <p className="text-sm">No results found for "{searchQuery}"</p>
                  </div>
                ) : (
                  searchResults.map((result, idx) => (
                    <button
                      key={result.id}
                      onClick={() => handleSearchSelect(result.path)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors group focus:outline-none ${
                        selectedIndex === idx 
                          ? 'bg-primary-50 dark:bg-primary-900/10' 
                          : 'hover:bg-slate-50 dark:hover:bg-slate-700/30'
                      }`}
                    >
                      <div className={`p-2 rounded-lg transition-colors ${
                        selectedIndex === idx
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                          : 'bg-slate-100 dark:bg-slate-700/50 text-primary-600 dark:text-primary-400 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30'
                      }`}>
                        <result.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{result.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{result.description}</p>
                      </div>
                      <ChevronRight className={`w-4 h-4 self-center transition-colors ${
                        selectedIndex === idx 
                          ? 'text-primary-400' 
                          : 'text-slate-300 dark:text-slate-600 group-hover:text-primary-400'
                      }`} />
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          aria-label="Toggle Dark Mode"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2 rounded-full transition-colors ${showNotifications ? 'bg-slate-100 text-primary-600 dark:bg-slate-800 dark:text-primary-400' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white dark:border-slate-900 justify-center items-center">
                  <span className="text-[8px] font-bold text-white invisible">{unreadCount}</span>
                </span>
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden z-50 animate-fade-in origin-top-right transform transition-all">
              <div className="p-4 border-b border-slate-100 dark:border-slate-700/50 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                <h3 className="font-semibold text-slate-800 dark:text-white transition-colors duration-300">Notifications</h3>
                {notifications.length > 0 && (
                  <button 
                    onClick={clearNotifications}
                    className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>
              
              <div className="max-h-[min(calc(100vh-100px),400px)] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                    <Bell className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>No new notifications</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id}
                        onClick={() => markNotificationAsRead(notif.id)}
                        className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 cursor-pointer transition-colors flex gap-3 ${!notif.isRead ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''}`}
                      >
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notif.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${!notif.isRead ? 'text-slate-800 dark:text-slate-200' : 'text-slate-600 dark:text-slate-400'}`}>
                            {notif.title}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-500 line-clamp-2 mt-0.5">
                            {notif.message}
                          </p>
                          <p className="text-xs text-slate-400 mt-2 font-medium">
                            {notif.time}
                          </p>
                        </div>
                        {!notif.isRead && (
                          <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-primary-500"></div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {notifications.length > 0 && (
                <div className="p-3 border-t border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50">
                  <button className="w-full text-center text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                    View all notifications
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-tight transition-colors duration-300">{user?.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors duration-300">{user?.matricNo}</p>
          </div>
          <button className="h-9 w-9 rounded-full overflow-hidden border-2 border-primary-500/20 hover:border-primary-500 dark:border-primary-500/50 dark:hover:border-primary-400 transition-colors">
            <img src={user?.avatar} alt="Profile" className="h-full w-full object-cover bg-primary-50" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
