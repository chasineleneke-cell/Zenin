import React, { useState } from 'react';
import { Search, Save, AlertCircle } from 'lucide-react';
import PageTransition from '../../components/PageTransition';
import Toast from '../../components/Toast';

const Grading = () => {
  const [selectedCourse, setSelectedCourse] = useState('CSC 401');
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [isSaving, setIsSaving] = useState(false);

  // Mock student roster for grading
  const [students, setStudents] = useState([
    { id: 'STU/2023/045', name: 'John Doe', ca: 25, exam: 60 },
    { id: 'STU/2023/089', name: 'Jane Smith', ca: 28, exam: null },
    { id: 'STU/2023/001', name: 'Femi Martins', ca: 30, exam: 65 },
    { id: 'STU/2023/112', name: 'Alice Johnson', ca: 15, exam: 40 },
    { id: 'STU/2023/204', name: 'Bob Williams', ca: null, exam: null },
  ]);

  const handleGradeChange = (studentId, field, value) => {
    // Validate bounds (CA max 30, Exam max 70)
    let numValue = value === '' ? null : Number(value);
    
    if (numValue !== null) {
      if (field === 'ca' && numValue > 30) numValue = 30;
      if (field === 'exam' && numValue > 70) numValue = 70;
      if (numValue < 0) numValue = 0;
    }

    setStudents(students.map(s => 
      s.id === studentId ? { ...s, [field]: numValue } : s
    ));
  };

  const calculateTotal = (ca, exam) => {
    if (ca === null && exam === null) return '-';
    return (ca || 0) + (exam || 0);
  };

  const calculateGrade = (total) => {
    if (total === '-' || total === 0) return '-';
    if (total >= 70) return 'A';
    if (total >= 60) return 'B';
    if (total >= 50) return 'C';
    if (total >= 45) return 'D';
    if (total >= 40) return 'E';
    return 'F';
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setToast({ show: true, type: 'success', message: `Grades for ${selectedCourse} saved successfully.` });
    }, 1000);
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="space-y-6 max-w-6xl mx-auto">
        
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-colors">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Grade Entry</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Input Assessment and Exam scores for students.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none transition-colors"
            >
              <option value="CSC 401">CSC 401 - Advanced Algorithms</option>
              <option value="CSC 301">CSC 301 - Data Structures</option>
            </select>
            
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-xl transition-colors disabled:opacity-70"
            >
              {isSaving ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Draft
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-4 border border-amber-100 dark:border-amber-800/30 flex gap-3 text-amber-800 dark:text-amber-200 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>Grades are automatically saved as drafts. Once you click "Publish to Students" (not available during grading window), grades will become visible on the students' portals.</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden transition-colors">
          <div className="p-4 border-b border-slate-100 dark:border-slate-700/50">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search student..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:text-white transition-colors"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-sm">
                  <th className="px-6 py-4 font-semibold border-b border-slate-100 dark:border-slate-700/50">Student</th>
                  <th className="px-6 py-4 font-semibold border-b border-slate-100 dark:border-slate-700/50">C.A (30)</th>
                  <th className="px-6 py-4 font-semibold border-b border-slate-100 dark:border-slate-700/50">Exam (70)</th>
                  <th className="px-6 py-4 font-semibold border-b border-slate-100 dark:border-slate-700/50">Total (100)</th>
                  <th className="px-6 py-4 font-semibold border-b border-slate-100 dark:border-slate-700/50">Grade</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(student => {
                  const total = calculateTotal(student.ca, student.exam);
                  const grade = calculateGrade(total);
                  
                  return (
                    <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 border-b border-slate-50 dark:border-slate-700/20">
                        <p className="font-semibold text-slate-800 dark:text-white">{student.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{student.id}</p>
                      </td>
                      <td className="px-6 py-4 border-b border-slate-50 dark:border-slate-700/20">
                        <input
                          type="number"
                          min="0"
                          max="30"
                          value={student.ca === null ? '' : student.ca}
                          onChange={(e) => handleGradeChange(student.id, 'ca', e.target.value)}
                          className="w-20 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none text-center"
                          placeholder="-"
                        />
                      </td>
                      <td className="px-6 py-4 border-b border-slate-50 dark:border-slate-700/20">
                        <input
                          type="number"
                          min="0"
                          max="70"
                          value={student.exam === null ? '' : student.exam}
                          onChange={(e) => handleGradeChange(student.id, 'exam', e.target.value)}
                          className="w-20 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none text-center"
                          placeholder="-"
                        />
                      </td>
                      <td className="px-6 py-4 border-b border-slate-50 dark:border-slate-700/20">
                        <span className="font-bold text-slate-700 dark:text-slate-200 text-lg">
                          {total}
                        </span>
                      </td>
                      <td className="px-6 py-4 border-b border-slate-50 dark:border-slate-700/20">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm ${
                          grade === 'A' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                          grade === 'B' || grade === 'C' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                          grade === 'D' || grade === 'E' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                          grade === 'F' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' :
                          'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                        }`}>
                          {grade}
                        </span>
                      </td>
                    </tr>
                  )
                })}
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

export default Grading;
