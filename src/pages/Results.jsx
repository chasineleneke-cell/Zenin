import React, { useState } from 'react';
import { registeredCourses as historicCourses } from '../mock-data/db';
import { Download, Award, History } from 'lucide-react';
import useStore from '../store/useStore';
import PageTransition from '../components/PageTransition';

const Results = () => {
  const user = useStore(state => state.user);
  const [semester, setSemester] = useState('2025/2026 - First Semester');

  const getGradeColor = (grade) => {
    switch(grade) {
      case 'A+': case 'A': return 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400';
      case 'B+': case 'B': return 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400';
      case 'C': return 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400';
      case 'D': case 'E': return 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400';
      case 'F': return 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400';
      default: return 'bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300';
    }
  };

  return (
    <PageTransition>
      <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white transition-colors duration-300">Academic Results</h2>
          <p className="text-slate-500 dark:text-slate-400 transition-colors duration-300">View and download your official transcripts</p>
        </div>
        
        <button className="flex items-center gap-2 bg-slate-800 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors shadow-sm font-medium">
          <Download className="w-4 h-4" />
          <span>Download Statement</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6 border-t-4 border-t-primary-500 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1 flex items-center gap-2 transition-colors duration-300">
              <History className="w-4 h-4" /> Semester GPA
            </p>
            <h3 className="text-4xl font-bold text-slate-800 dark:text-white transition-colors duration-300">{user?.semesterGpa?.toFixed(2) || '3.90'}</h3>
          </div>
          <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-full transition-colors duration-300">
            <Award className="w-8 h-8 text-primary-500" />
          </div>
        </div>
        
        <div className="card p-6 border-t-4 border-t-purple-500 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1 flex items-center gap-2 transition-colors duration-300">
              <Award className="w-4 h-4" /> Cumulative GPA (CGPA)
            </p>
            <h3 className="text-4xl font-bold text-slate-800 dark:text-white transition-colors duration-300">{user?.cgpa?.toFixed(2) || '4.00'}</h3>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-full transition-colors duration-300">
            <Award className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="card overflow-hidden mt-8">
        <div className="p-4 border-b border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-4 transition-colors duration-300">
          <h3 className="font-semibold text-slate-700 dark:text-slate-300 transition-colors duration-300">Detailed Results</h3>
          <select 
            className="border-slate-200 dark:border-slate-600 border rounded-lg px-4 py-2 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-slate-800 shadow-sm transition-colors duration-300"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            <option value="2025/2026 - First Semester">2025/2026 - First Semester</option>
            <option value="2024/2025 - Second Semester">2024/2025 - Second Semester</option>
            <option value="2024/2025 - First Semester">2024/2025 - First Semester</option>
            <option value="2023/2024 - Second Semester">2023/2024 - Second Semester</option>
            <option value="2023/2024 - First Semester">2023/2024 - First Semester</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="table-header">Course Code</th>
                <th className="table-header">Course Title</th>
                <th className="table-header text-center">Units</th>
                <th className="table-header text-center">Score</th>
                <th className="table-header text-center">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {historicCourses.map((course, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors duration-300">
                  <td className="table-cell font-medium text-slate-800 dark:text-slate-200">{course.code}</td>
                  <td className="table-cell">{course.title}</td>
                  <td className="table-cell text-center">{course.units}</td>
                  <td className="table-cell text-center font-semibold text-slate-700 dark:text-slate-300">{course.score}</td>
                  <td className="table-cell text-center">
                    <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold w-10 transition-colors duration-300 ${getGradeColor(course.grade)}`}>
                      {course.grade}
                    </span>
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

export default Results;
