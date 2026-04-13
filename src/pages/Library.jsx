import React, { useState } from 'react';
import { Book, Search, Library as LibraryIcon, Star, Filter, Clock, ArrowRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Modal from '../components/Modal';
import Toast from '../components/Toast';

const books = [
  { id: 1, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'Computer Science', status: 'Available', rating: 4.8 },
  { id: 2, title: 'Clean Code', author: 'Robert C. Martin', category: 'Software Engineering', status: 'Borrowed', returnDate: 'Nov 12', rating: 4.9 },
  { id: 3, title: 'Design Patterns', author: 'Erich Gamma', category: 'Software Engineering', status: 'Available', rating: 4.7 },
  { id: 4, title: 'Database System Concepts', author: 'Abraham Silberschatz', category: 'Database Systems', status: 'Available', rating: 4.6 },
  { id: 5, title: 'Computer Networks', author: 'Andrew S. Tanenbaum', category: 'Networking', status: 'Available', rating: 4.8 },
  { id: 6, title: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell', category: 'AI', status: 'Available', rating: 4.9 },
];

const Library = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [isProcessing, setIsProcessing] = useState(false);

  const categories = ['All', ...new Set(books.map(book => book.category))];

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleAction = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowModal(false);
      setToast({
        show: true,
        type: selectedBook?.status === 'Available' ? 'success' : 'error',
        message: selectedBook?.status === 'Available' 
          ? `Successfully borrowed "${selectedBook.title}"` 
          : `Added to waiting list for "${selectedBook.title}"`
      });
      setSelectedBook(null);
    }, 1200);
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PageTransition>
      <div className="space-y-6 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <LibraryIcon className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold">Virtual Library</h1>
              </div>
              <p className="text-blue-100 max-w-xl text-lg font-light">
                Access thousands of academic resources, books, and journals anytime, anywhere.
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
              <div className="text-center px-4 border-r border-white/20">
                <p className="text-3xl font-bold">12</p>
                <p className="text-blue-200 text-sm">Borrowed</p>
              </div>
              <div className="text-center px-4">
                <p className="text-3xl font-bold">4</p>
                <p className="text-blue-200 text-sm">Overdue</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 transition-colors">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white transition-colors"
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
            <Filter className="w-5 h-5 text-slate-400 shrink-0" />
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category 
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div key={book.id} className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700/50 hover:shadow-md hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-300 group flex flex-col h-full">
                
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${book.status === 'Available' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'} transition-colors`}>
                    <Book className="w-6 h-6" />
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${book.status === 'Available' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400'} transition-colors`}>
                    {book.status}
                  </span>
                </div>

                <div className="flex-1">
                  <span className="text-xs font-medium text-primary-600 dark:text-primary-400 mb-2 block">{book.category}</span>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-tight mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{book.author}</p>
                </div>
                
                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
                  {book.status === 'Available' ? (
                    <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium">{book.rating}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-medium">
                      <Clock className="w-4 h-4" />
                      Due {book.returnDate}
                    </div>
                  )}
                  
                  <button 
                    onClick={() => handleBookClick(book)}
                    className="flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                  >
                    {book.status === 'Available' ? 'Borrow' : 'Details'} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 transition-colors">
              <Book className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">No books found</h3>
              <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or category filter.</p>
            </div>
          )}
        </div>

        {/* Book Details Modal */}
        <Modal 
          isOpen={showModal} 
          onClose={() => !isProcessing && setShowModal(false)}
          title={selectedBook?.status === 'Available' ? "Borrow Book" : "Book Details"}
        >
          {selectedBook && (
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className={`p-4 rounded-2xl flex items-center justify-center shrink-0 ${
                  selectedBook.status === 'Available' 
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' 
                    : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                }`}>
                  <Book className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-800 dark:text-white leading-tight mb-1">{selectedBook.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">{selectedBook.author}</p>
                  <span className="inline-block mt-2 px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-lg">
                    {selectedBook.category}
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Status</span>
                  <span className={`font-semibold ${
                    selectedBook.status === 'Available' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                  }`}>{selectedBook.status}</span>
                </div>
                
                {selectedBook.status === 'Available' ? (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Rating</span>
                    <div className="flex items-center gap-1 text-slate-700 dark:text-slate-200 font-medium">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      {selectedBook.rating} / 5.0
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Expected Return</span>
                    <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200 font-medium">
                      <Clock className="w-4 h-4 text-amber-500" />
                      {selectedBook.returnDate}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setShowModal(false)}
                  disabled={isProcessing}
                  className="flex-1 px-4 py-2.5 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl font-medium transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAction}
                  disabled={isProcessing}
                  className={`flex-1 px-4 py-2.5 text-white rounded-xl font-medium flex justify-center items-center transition-colors disabled:opacity-70 disabled:cursor-not-allowed ${
                    selectedBook.status === 'Available' ? 'bg-primary-600 hover:bg-primary-700' : 'bg-amber-600 hover:bg-amber-700'
                  }`}
                >
                  {isProcessing ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    selectedBook.status === 'Available' ? 'Confirm Borrow' : 'Join Waitlist'
                  )}
                </button>
              </div>
            </div>
          )}
        </Modal>

        <Toast 
          message={toast.message} 
          type={toast.type} 
          isVisible={toast.show} 
          onClose={() => setToast({ ...toast, show: false })} 
        />

      </div>
    </PageTransition>
  );
};

export default Library;
