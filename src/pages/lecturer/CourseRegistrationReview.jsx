import React, { useState } from 'react';
import { CheckSquare, CheckCircle, XCircle, Search, Clock, ShieldAlert, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import useStore from '../../store/useStore';
import PageTransition from '../../components/PageTransition';
import Toast from '../../components/Toast';

const CourseRegistrationReview = () => {
  const user = useStore(state => state.user);
  const pendingRegistrations = useStore(state => state.pendingRegistrations);
  const approveRegistration = useStore(state => state.approveRegistration);
  const rejectRegistration = useStore(state => state.rejectRegistration);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [filter, setFilter] = useState('Pending');
  const [expandedRow, setExpandedRow] = useState(null);

  const filteredRegs = pendingRegistrations.filter(reg => {
    // RBAC Safety: Ensure HODs see all, but specific Level Advisors only see their target level.
    const isHOD = user?.appointments?.includes('HOD');
    const matchesLevel = isHOD || reg.level === user?.advisorForLevel;
    
    const matchesSearch = reg.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          reg.matricNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'All' || reg.status === filter;
    
    return matchesLevel && matchesSearch && matchesFilter;
  });

  const handleAction = (id, type, studentName) => {
    if (type === 'approve') {
      approveRegistration(id);
      setToast({ show: true, type: 'success', message: `Approved Session Docket for ${studentName}` });
    } else {
      rejectRegistration(id);
      setToast({ show: true, type: 'error', message: `Rejected Session Docket for ${studentName}` });
    }
  };

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <PageTransition>
      <div className="space-y-6 max-w-6xl mx-auto">
        
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Session Approvals</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Review and approve full course registration dockets for your advisees.</p>
          </div>
          
          <div className="flex gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
            {['Pending', 'Approved', 'Rejected', 'All'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === f 
                    ? 'bg-white dark:bg-slate-800 text-amber-600 shadow-sm' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden transition-colors">
          <div className="p-4 border-b border-slate-100 dark:border-slate-700/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search student or matric no..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:text-white transition-colors"
              />
            </div>
            <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {filteredRegs.length} total dockets
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-sm">
                  <th className="px-6 py-4 font-semibold border-b border-slate-100 dark:border-slate-700/50">Student Details</th>
                  <th className="px-6 py-4 font-semibold border-b border-slate-100 dark:border-slate-700/50">Session Load</th>
                  <th className="px-6 py-4 font-semibold border-b border-slate-100 dark:border-slate-700/50 text-center">Status</th>
                  <th className="px-6 py-4 font-semibold border-b border-slate-100 dark:border-slate-700/50 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegs.length > 0 ? (
                  filteredRegs.map(reg => (
                    <React.Fragment key={reg.id}>
                      <tr className={`hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group ${expandedRow === reg.id ? 'bg-slate-50 dark:bg-slate-800/80' : ''}`}>
                        <td className="px-6 py-4 border-b border-slate-50 dark:border-slate-700/20">
                          <p className="font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                            {reg.studentName}
                            <span className="text-[10px] bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300 uppercase">{reg.level}</span>
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{reg.matricNo}</p>
                        </td>
                        <td className="px-6 py-4 border-b border-slate-50 dark:border-slate-700/20">
                          <button 
                            onClick={() => toggleRow(reg.id)}
                            className="flex items-center gap-2 text-amber-600 dark:text-amber-500 font-medium hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
                          >
                            <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-1 rounded text-xs font-bold">
                              {reg.totalUnits} Units
                            </span>
                            <span className="text-sm">({reg.courses.length} Courses)</span>
                            {expandedRow === reg.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </td>
                        <td className="px-6 py-4 border-b border-slate-50 dark:border-slate-700/20 text-center">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                            reg.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
                            reg.status === 'Rejected' ? 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' :
                            'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                          }`}>
                            {reg.status === 'Approved' && <CheckCircle className="w-3.5 h-3.5" />}
                            {reg.status === 'Rejected' && <XCircle className="w-3.5 h-3.5" />}
                            {reg.status === 'Pending' && <Clock className="w-3.5 h-3.5" />}
                            {reg.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 border-b border-slate-50 dark:border-slate-700/20 text-right">
                          {reg.status === 'Pending' ? (
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => handleAction(reg.id, 'reject', reg.studentName)}
                                className="px-3 py-1.5 text-xs font-bold bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40 rounded transition-colors"
                              >
                                Reject
                              </button>
                              <button 
                                onClick={() => handleAction(reg.id, 'approve', reg.studentName)}
                                className="px-3 py-1.5 text-xs font-bold bg-emerald-500 text-white hover:bg-emerald-600 rounded transition-colors shadow-lg shadow-emerald-500/20"
                              >
                                Approve Docket
                              </button>
                            </div>
                          ) : (
                            <div className="text-xs text-slate-400 dark:text-slate-500 font-medium italic">
                              Action Taken
                            </div>
                          )}
                        </td>
                      </tr>
                      {/* Expanded Courses Detail Row */}
                      {expandedRow === reg.id && (
                        <tr className="bg-slate-50/50 dark:bg-slate-900/30">
                          <td colSpan="4" className="px-6 py-4 border-b border-slate-100 dark:border-slate-700/30">
                            <div className="pl-4 border-l-2 border-amber-300 dark:border-amber-600/50">
                              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Registered Courses Breakdown</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {reg.courses.map((course, idx) => (
                                  <div key={idx} className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 flex items-start gap-3 shadow-sm">
                                    <div className="mt-0.5 bg-slate-100 dark:bg-slate-700 p-1.5 rounded text-slate-500 dark:text-slate-400">
                                      <BookOpen className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <p className="font-bold text-slate-700 dark:text-slate-200 text-sm">{course.code}</p>
                                      <p className="text-xs text-slate-500 line-clamp-1">{course.title}</p>
                                      <div className="flex gap-2 mt-1">
                                        <span className="text-[10px] bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-1.5 rounded font-bold">{course.units} Units</span>
                                        <span className={`text-[10px] px-1.5 rounded font-bold ${course.type === 'Core' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30' : 'bg-slate-100 text-slate-500 dark:bg-slate-700'}`}>{course.type}</span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                      <ShieldAlert className="w-10 h-10 mx-auto mb-3 opacity-20" />
                      <p>No {filter.toLowerCase()} dockets match your search.</p>
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

export default CourseRegistrationReview;
