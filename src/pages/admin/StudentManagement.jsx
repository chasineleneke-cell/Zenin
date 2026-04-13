import React, { useState } from 'react';
import { Search, UserCheck, UserX, MoreVertical, Edit2, ShieldAlert } from 'lucide-react';
import PageTransition from '../../components/PageTransition';
import Toast from '../../components/Toast';

const StudentManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [filter, setFilter] = useState('All');

  // Mock Student Database
  const [students, setStudents] = useState([
    { id: 'STU/2023/001', name: 'Femi Martins', level: '300 Lvl', department: 'Computer Science', status: 'Active', gpa: 4.0 },
    { id: 'STU/2023/045', name: 'John Doe', level: '100 Lvl', department: 'Civil Engineering', status: 'Active', gpa: 0.0 },
    { id: 'STU/2023/089', name: 'Jane Smith', level: '200 Lvl', department: 'Medicine', status: 'Suspended', gpa: 2.4 },
    { id: 'STU/2023/112', name: 'Alice Johnson', level: '400 Lvl', department: 'Law', status: 'Active', gpa: 3.8 },
    { id: 'STU/2023/204', name: 'Bob Williams', level: '300 Lvl', department: 'Economics', status: 'Graduated', gpa: 4.2 },
  ]);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          student.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'All' || student.status === filter;
    return matchesSearch && matchesFilter;
  });

  const toggleStatus = (id, currentStatus) => {
    if (currentStatus === 'Graduated') {
      setToast({ show: true, type: 'error', message: 'Cannot modify status of graduated students.' });
      return;
    }

    const newStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    
    setStudents(students.map(s => 
      s.id === id ? { ...s, status: newStatus } : s
    ));

    setToast({ 
      show: true, 
      type: newStatus === 'Active' ? 'success' : 'warning', 
      message: `Student account ${newStatus.toLowerCase()}.` 
    });
  };

  return (
    <PageTransition>
      <div className="space-y-6 max-w-7xl mx-auto">
        
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Student Management</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">View, sort, and manage all student accounts.</p>
          </div>
          
          <div className="flex gap-2 relative">
             <button className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-medium transition-all shadow-md shadow-rose-500/20">
               + Admit New Student
             </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden transition-colors">
          <div className="p-4 border-b border-slate-100 dark:border-slate-700/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by name or matric no..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 dark:text-white transition-colors"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
                <option value="Graduated">Graduated</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-sm">
                  <th className="px-6 py-4 font-semibold border-b border-slate-100 dark:border-slate-700/50">Student Info</th>
                  <th className="px-6 py-4 font-semibold border-b border-slate-100 dark:border-slate-700/50">Details</th>
                  <th className="px-6 py-4 font-semibold border-b border-slate-100 dark:border-slate-700/50">CGPA</th>
                  <th className="px-6 py-4 font-semibold border-b border-slate-100 dark:border-slate-700/50 text-center">Status</th>
                  <th className="px-6 py-4 font-semibold border-b border-slate-100 dark:border-slate-700/50 text-right">Settings</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map(student => (
                    <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                      <td className="px-6 py-4 border-b border-slate-50 dark:border-slate-700/20">
                        <p className="font-semibold text-slate-800 dark:text-white">{student.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{student.id}</p>
                      </td>
                      <td className="px-6 py-4 border-b border-slate-50 dark:border-slate-700/20">
                        <p className="text-sm text-slate-700 dark:text-slate-300">{student.department}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{student.level}</p>
                      </td>
                      <td className="px-6 py-4 border-b border-slate-50 dark:border-slate-700/20">
                        <span className="font-bold text-slate-700 dark:text-slate-200">
                          {student.gpa.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 border-b border-slate-50 dark:border-slate-700/20 text-center">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          student.status === 'Active' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
                          student.status === 'Suspended' ? 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                          'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 border-b border-slate-50 dark:border-slate-700/20 w-32">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => toggleStatus(student.id, student.status)}
                            className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            title={student.status === 'Active' ? "Suspend Account" : "Activate Account"}
                          >
                            {student.status === 'Active' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                          </button>
                          <button className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                      <ShieldAlert className="w-10 h-10 mx-auto mb-3 opacity-20" />
                      <p>No students match your query.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <Toast 
        message={toast.message} 
        type={toast.type} 
        isVisible={toast.show} 
        onClose={() => setToast({ ...toast, show: false })} 
      />
    </PageTransition>
  );
};

export default StudentManagement;
