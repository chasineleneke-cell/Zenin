import React from 'react';
import { BookOpen, Users, Clock, Award } from 'lucide-react';
import useStore from '../../store/useStore';
import PageTransition from '../../components/PageTransition';

const MyCourses = () => {
  const user = useStore(state => state.user);
  const courses = useStore(state => state.availableCourses).filter(c => 
    user?.assignedCourses?.includes(c.code)
  );

  return (
    <PageTransition>
      <div className="space-y-6 max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">My Assigned Courses</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Manage and view details for the classes you are teaching.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700/50 shadow-sm transition-all hover:shadow-md group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-xl">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-full">
                  {course.units} Units
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {course.title}
              </h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">{course.code}</p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium">85 Students</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium">2 Hrs / Week</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700/50 flex gap-3">
                <button className="flex-1 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-xl transition-colors">
                  View Roster
                </button>
                <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <Award className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          {courses.length === 0 && (
            <div className="col-span-1 md:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-12 text-center border border-slate-100 dark:border-slate-700/50">
              <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No Courses Assigned</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                You currently have no courses assigned to you for this semester. Contact the department head for scheduling.
              </p>
            </div>
          )}
        </div>

      </div>
    </PageTransition>
  );
};

export default MyCourses;
