import React from 'react';
import PageTransition from '../components/PageTransition';
import { BookMarked, Download } from 'lucide-react';

const Courseware = () => {
  const materials = [
    { title: "Introduction to Computer Science", type: "PDF", size: "2.4 MB" },
    { title: "Advanced Mathematics Vol 2", type: "Document", size: "5.1 MB" },
    { title: "Research Methodology Notes", type: "Slides", size: "1.2 MB" },
  ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-primary-800 to-primary-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Courseware & e-Resources</h2>
            <p className="text-primary-100 max-w-xl text-lg font-light">
              Download your lecture notes, study materials, and departmental resources here.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((item, idx) => (
            <div key={idx} className="card p-6 flex flex-col items-center text-center group cursor-pointer hover:border-primary-500 transition-all">
              <div className="bg-primary-50 dark:bg-primary-900/30 p-4 rounded-full mb-4 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform">
                <BookMarked className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">{item.title}</h3>
              <p className="text-sm text-slate-500 mb-4">{item.type} • {item.size}</p>
              <button className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 transition-colors">
                <Download className="w-4 h-4" /> Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Courseware;
