import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'error', isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const icons = {
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    success: <CheckCircle className="w-5 h-5 text-emerald-500" />
  };

  const bgColors = {
    error: 'bg-red-50 dark:bg-red-900/40 border-red-100 dark:border-red-800/50',
    success: 'bg-emerald-50 dark:bg-emerald-900/40 border-emerald-100 dark:border-emerald-800/50'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
          className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg ${bgColors[type]}`}
        >
          {icons[type]}
          <p className="text-sm font-medium text-slate-800 dark:text-white transition-colors duration-300">{message}</p>
          <button onClick={onClose} className="ml-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
