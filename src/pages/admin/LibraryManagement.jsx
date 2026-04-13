import React, { useState } from 'react';
import { Book, Plus, Search, Filter, Edit, Trash2 } from 'lucide-react';
import PageTransition from '../../components/PageTransition';

const LibraryManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for initial render
  const libraryInventory = [
    { id: 1, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'Computer Science', copies: 12, format: 'Physical' },
    { id: 2, title: 'Fundamentals of Database Systems', author: 'Ramez Elmasri', category: 'Computer Science', copies: 'Infin', format: 'E-Book' },
    { id: 3, title: 'Advanced Engineering Mathematics', author: 'Erwin Kreyszig', category: 'Mathematics', copies: 5, format: 'Physical' },
  ];

  return (
    <PageTransition>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Library Catalog Management</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Add, update, and manage the university\'s inventory of physical and digital resources.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-emerald-500/20">
            <Plus className="w-5 h-5" /> Add New Resource
          </button>
        </div>

        {/* Filters & Search */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by title, author, or ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option>All Formats</option>
              <option>Physical Book</option>
              <option>E-Book (PDF)</option>
              <option>Journal</option>
            </select>
            <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
               <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-sm">
                  <th className="px-6 py-4 font-semibold border-b border-slate-100 dark:border-slate-700/50">Resource Title</th>
                  <th className="px-6 py-4 font-semibold border-b border-slate-100 dark:border-slate-700/50">Category</th>
                  <th className="px-6 py-4 font-semibold border-b border-slate-100 dark:border-slate-700/50">Format</th>
                  <th className="px-6 py-4 font-semibold border-b border-slate-100 dark:border-slate-700/50 text-center">Available stock</th>
                  <th className="px-6 py-4 font-semibold border-b border-slate-100 dark:border-slate-700/50 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {libraryInventory.map(book => (
                  <tr key={book.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-4 border-b border-slate-50 dark:border-slate-700/20">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800 dark:text-white line-clamp-1">{book.title}</span>
                        <span className="text-xs text-slate-500 mt-0.5">{book.author}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 border-b border-slate-50 dark:border-slate-700/20">
                      <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-full">
                        {book.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 border-b border-slate-50 dark:border-slate-700/20">
                       <span className={`flex w-fit items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                         book.format === 'E-Book' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30' : 'bg-slate-100 text-slate-600 dark:bg-slate-700'
                       }`}>
                         <Book className="w-3.5 h-3.5" /> {book.format}
                       </span>
                    </td>
                    <td className="px-6 py-4 border-b border-slate-50 dark:border-slate-700/20 text-center font-bold text-slate-700 dark:text-slate-300">
                      {book.copies}
                    </td>
                    <td className="px-6 py-4 border-b border-slate-50 dark:border-slate-700/20 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </PageTransition>
  );
};

export default LibraryManagement;
