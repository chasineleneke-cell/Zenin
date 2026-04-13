import React, { useState, useEffect, useMemo } from 'react';
import { BookPlus, CheckCircle, Search, AlertCircle, Printer, FileBadge, AlertTriangle } from 'lucide-react';
import useStore from '../store/useStore';
import PageTransition from '../components/PageTransition';
import Toast from '../components/Toast';
import Modal from '../components/Modal';

const CourseRegistration = () => {
  const availableCourses = useStore(state => state.availableCourses);
  const registeredCourses = useStore(state => state.registeredCourses);
  const registerCourse = useStore(state => state.registerCourse);
  const dropCourse = useStore(state => state.dropCourse);
  const user = useStore(state => state.user);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'error' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showExamCard, setShowExamCard] = useState(false);

  const MAX_UNITS = 24;
  const carryOvers = user?.carryOvers || [];

  // Automatically lock in carry-over courses on page load
  useEffect(() => {
    if (carryOvers.length > 0) {
      carryOvers.forEach(carryCode => {
        const courseObj = availableCourses.find(c => c.code === carryCode);
        const isRegistered = registeredCourses.some(rc => rc.code === carryCode);
        if (courseObj && !isRegistered) {
          registerCourse(courseObj);
        }
      });
    }
  }, [carryOvers, availableCourses, registeredCourses, registerCourse]);

  const totalSelectedUnits = registeredCourses.reduce((sum, course) => sum + course.units, 0);

  const showToast = (message, type = 'error') => {
    setToast({ isVisible: true, message, type });
  };

  const handleToggle = (course) => {
    if (carryOvers.includes(course.code)) {
      showToast('You cannot drop a mandatory carry-over course.', 'error');
      return;
    }

    const isRegistered = registeredCourses.find(c => c.code === course.code);
    
    if (isRegistered) {
      dropCourse(course.code);
    } else {
      if (totalSelectedUnits + course.units > MAX_UNITS) {
        showToast(`Cannot add ${course.code}. Maximum of ${MAX_UNITS} units allowed.`);
        return;
      }
      registerCourse(course);
    }
  };

  const handleSubmit = () => {
    if (registeredCourses.length === 0) {
      showToast('Please select at least one course to register.');
      return;
    }
    // Business logic safety net
    const missedCarryOvers = carryOvers.filter(code => !registeredCourses.some(c => c.code === code));
    if (missedCarryOvers.length > 0) {
       showToast(`CRITICAL ERROR: You must register ALL carry-overs before submitting!`, 'error');
       return;
    }

    setIsModalOpen(true);
  };

  const confirmRegistration = () => {
    setIsSubmitting(true);
    // Simulate network delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Close modal and show success toast after a short delay
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSuccess(false);
        showToast('Courses submitted to Level Advisor successfully!', 'success');
      }, 1500);
      
    }, 1500);
  };

  // Sort logic: Carry-overs automatically pin to the top of the list!
  const sortedAndFilteredCourses = useMemo(() => {
    let filtered = availableCourses.filter(course => 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      course.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      const aCarry = carryOvers.includes(a.code);
      const bCarry = carryOvers.includes(b.code);
      if (aCarry && !bCarry) return -1;
      if (!aCarry && bCarry) return 1;
      return 0;
    });
  }, [availableCourses, searchTerm, carryOvers]);

  return (
    <PageTransition>
      <div className="space-y-6">
      
      <Toast 
        isVisible={toast.isVisible} 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))} 
      />

      {/* Confirmation Modal */}
      <Modal isOpen={isModalOpen} onClose={() => !isSubmitting && setIsModalOpen(false)} title="Confirm Registration">
        {isSuccess ? (
          <div className="text-center py-6">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
            <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-2 transition-colors duration-300">Registration Successful!</h4>
            <p className="text-slate-500 dark:text-slate-400 transition-colors duration-300">Your session docket has been submitted to your Level Advisor for approval.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 flex items-start gap-3 transition-colors duration-300">
              <AlertCircle className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium transition-colors duration-300">You are about to submit a session docket containing {registeredCourses.length} courses.</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 transition-colors duration-300">Total Units: <span className="font-bold text-slate-800 dark:text-white">{totalSelectedUnits} Units</span></p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 transition-colors duration-300">This requires HOD/Level Advisor approval. Proceed?</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
                className="flex-1 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={confirmRegistration}
                disabled={isSubmitting}
                className="flex-1 py-2.5 btn-primary flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Submit</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Exam Card Modal Rendered Her... (Omitted for brevity, assuming standard code fits here. I will just render the Exam Card UI directly to ensure complete preservation) */}
      <Modal isOpen={showExamCard} onClose={() => setShowExamCard(false)} title="Exam Card">
        <div id="exam-card-print-area" className="bg-white text-slate-900 p-6 rounded-xl border border-slate-200 shadow-sm print:shadow-none print:border-none relative max-h-[75vh] overflow-y-auto custom-scrollbar">
          <div className="text-center mb-6 pb-6 border-b border-slate-200">
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-slate-900">Nigerian Army University Biu</h2>
            <p className="text-slate-600 font-medium mt-1">First Semester Examination Card (2025/2026)</p>
          </div>
          
          <div className="flex gap-6 mb-8">
            <div className="w-24 h-24 bg-slate-100 rounded-lg overflow-hidden shrink-0 border border-slate-200">
              {user?.avatar ? (
                <img src={user?.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">Photo</div>
              )}
            </div>
            <div className="flex-1 grid grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <p className="text-sm text-slate-500 font-medium">Full Name</p>
                <p className="font-bold text-lg">{user?.name || 'Student Name'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Matriculation No.</p>
                <p className="font-bold text-lg">{user?.id || 'STU/XXX/XXX'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Department</p>
                <p className="font-bold">{user?.department || 'Department'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Level</p>
                <p className="font-bold">{user?.level || 'Level'}</p>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="font-bold mb-3 uppercase tracking-wider text-sm text-slate-700 bg-slate-100 p-2 rounded">Registered Courses for Examination</h3>
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-300">
                  <th className="py-2 px-3 font-semibold">Course Code</th>
                  <th className="py-2 px-3 font-semibold">Course Title</th>
                  <th className="py-2 px-3 font-semibold text-center">Units</th>
                  <th className="py-2 px-3 font-semibold text-center">Invigilator Sign</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {registeredCourses.map((course) => (
                  <tr key={course.code}>
                    <td className="py-2.5 px-3 font-mono font-medium">{course.code}</td>
                    <td className="py-2.5 px-3">{course.title}</td>
                    <td className="py-2.5 px-3 text-center">{course.units}</td>
                    <td className="py-2.5 px-3 border-l border-r border-slate-200"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="grid grid-cols-2 gap-12 mt-12 pt-12 border-t border-slate-200 text-center">
            <div>
              <div className="border-b-2 border-slate-400 w-full mb-2"></div>
              <p className="text-sm font-medium">Student's Signature & Date</p>
            </div>
            <div>
              <div className="border-b-2 border-slate-400 w-full mb-2"></div>
              <p className="text-sm font-medium">HOD's Signature & Stamp</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button 
            onClick={() => {
              const printContent = document.getElementById('exam-card-print-area');
              const printWindow = window.open('', '_blank');
              printWindow.document.write(`
                <html>
                  <head>
                    <title>Exam Card - ${user?.name || 'Student'}</title>
                    <script src="https://cdn.tailwindcss.com"></script>
                    <style>@media print { body { print-color-adjust: exact; -webkit-print-color-adjust: exact; } }</style>
                  </head>
                  <body class="p-8">${printContent.innerHTML}<script>window.onload=()=>{window.print();setTimeout(()=>window.close(),500);};</script></body>
                </html>
              `);
              printWindow.document.close();
            }}
            className="btn-primary flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Print Card
          </button>
        </div>
      </Modal>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white transition-colors duration-300">Course Registration</h2>
          <p className="text-slate-500 dark:text-slate-400 transition-colors duration-300">Select courses for the upcoming semester (Max {MAX_UNITS} Units)</p>
        </div>
        
        <div className={`px-4 py-2 rounded-lg border flex items-center gap-3 transition-colors duration-300 ${
          totalSelectedUnits === MAX_UNITS 
            ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700/50' 
            : 'bg-primary-50 dark:bg-primary-900/20 border-primary-100 dark:border-primary-800/50'
        }`}>
          <BookPlus className={`w-5 h-5 ${totalSelectedUnits === MAX_UNITS ? 'text-amber-600' : 'text-primary-600'}`} />
          <div>
            <span className={`text-sm font-medium block transition-colors duration-300 ${totalSelectedUnits === MAX_UNITS ? 'text-amber-700 dark:text-amber-500' : 'text-primary-600 dark:text-primary-400'}`}>
              Selected Units
            </span>
            <span className={`text-lg font-bold transition-colors duration-300 ${totalSelectedUnits === MAX_UNITS ? 'text-amber-700 dark:text-amber-500' : 'text-primary-700 dark:text-primary-400'}`}>
              {totalSelectedUnits} / {MAX_UNITS}
            </span>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-700/50 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50 dark:bg-slate-800/50 transition-colors duration-300">
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none transition-colors duration-300"
            />
          </div>
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            {registeredCourses.length > 0 && (
              <button 
                onClick={() => setShowExamCard(true)}
                className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium flex justify-center items-center gap-2 transition-colors duration-200 shadow-sm shadow-emerald-500/20"
              >
                <FileBadge className="w-4 h-4" />
                <span>Exam Card</span>
              </button>
            )}
            <button 
              onClick={handleSubmit}
              disabled={registeredCourses.length === 0}
              className="w-full sm:w-auto btn-primary flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Submit Registration</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="table-header w-16 text-center">Select</th>
                <th className="table-header w-32">Course Code</th>
                <th className="table-header">Course Title</th>
                <th className="table-header">Lecturer</th>
                <th className="table-header text-center">Units</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {sortedAndFilteredCourses.map((course) => {
                const isSelected = registeredCourses.some(c => c.code === course.code);
                const isCarryOver = carryOvers.includes(course.code);
                // System blocks selection if units are exceeded AND the course isn't already selected (must allow carryovers to be immune to this via auto-select logic)
                const isMaxedOut = !isSelected && (totalSelectedUnits + course.units > MAX_UNITS);
                
                return (
                <tr 
                  key={course.id} 
                  className={`hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors duration-300 
                    ${isCarryOver ? 'bg-rose-50/40 dark:bg-rose-900/10' : ''} 
                    ${!isCarryOver && isSelected ? 'bg-primary-50/30 dark:bg-primary-900/10' : ''} 
                    ${isMaxedOut ? 'opacity-60 bg-slate-50 dark:bg-slate-800/50' : ''}`
                  }
                  onClick={() => !isMaxedOut && handleToggle(course)}
                  style={{ cursor: (isMaxedOut || isCarryOver) ? 'not-allowed' : 'pointer' }}
                >
                  <td className="table-cell text-center relative" onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="checkbox"
                      checked={isSelected}
                      disabled={isMaxedOut || isCarryOver}
                      onChange={() => handleToggle(course)}
                      className={`w-5 h-5 rounded cursor-pointer ${isCarryOver ? 'border-rose-500 text-rose-500 focus:ring-rose-500' : 'border-slate-300 text-primary-600 focus:ring-primary-600'} disabled:cursor-not-allowed`}
                    />
                  </td>
                  <td className="table-cell font-medium text-slate-800 dark:text-slate-200">
                    <div className="flex flex-col gap-1 items-start">
                      <span>{course.code}</span>
                      {isCarryOver && (
                        <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400 flex items-center gap-1">
                          <AlertTriangle className="w-2 h-2" /> Mandatory
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="table-cell">{course.title}</td>
                  <td className="table-cell text-slate-600 dark:text-slate-400">{course.lecturer}</td>
                  <td className="table-cell text-center">
                    <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors duration-300
                      ${isCarryOver ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300' : 
                      isSelected ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400' : 
                      'bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300'}`}>
                      {course.units} Units
                    </span>
                  </td>
                </tr>
              )})}
              
              {sortedAndFilteredCourses.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                    <Search className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
                    No courses found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </PageTransition>
  );
};

export default CourseRegistration;
