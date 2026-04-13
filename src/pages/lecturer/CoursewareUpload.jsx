import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, XCircle } from 'lucide-react';
import useStore from '../../store/useStore';
import PageTransition from '../../components/PageTransition';

const CoursewareUpload = () => {
  const user = useStore(state => state.user);
  const courses = useStore(state => state.availableCourses).filter(c => 
    user?.assignedCourses?.includes(c.code)
  );

  const [dragActive, setDragActive] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [fileTitle, setFileTitle] = useState('');
  const [fileDescription, setFileDescription] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Dummy simulate file catch
  };

  return (
    <PageTransition>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Upload Courseware</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Distribute lecture slides, PDFs, and assignment materials securely to your students.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form Details */}
          <div className="space-y-5 card p-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Target Course</label>
              <select 
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="" disabled>Select assigned course...</option>
                {courses.map(c => <option key={c.code} value={c.code}>{c.code} - {c.title}</option>)}
                {courses.length === 0 && <option disabled>No courses assigned</option>}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Document Title</label>
              <input 
                type="text" 
                placeholder="e.g. Week 4 - Advanced Algebra"
                value={fileTitle}
                onChange={(e) => setFileTitle(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Description / Instructions</label>
              <textarea 
                rows="4" 
                placeholder="Optional instructions for students..."
                value={fileDescription}
                onChange={(e) => setFileDescription(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              ></textarea>
            </div>
          </div>

          {/* Upload Area */}
          <div className="flex flex-col gap-4">
            <div 
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl transition-all ${
                dragActive 
                  ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/10' 
                  : 'border-slate-300 dark:border-slate-700 hover:border-amber-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <div className="p-4 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-full mb-4">
                <UploadCloud className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-1">Upload Material</h3>
              <p className="text-sm text-slate-500 text-center mb-6 max-w-xs">Drag and drop your PDF, DOCX, or PPTX file here, or click to browse.</p>
              <button className="px-6 py-2 bg-slate-800 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors text-sm font-medium">
                Browse Files
              </button>
            </div>
            
            <button className="w-full py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98] flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" /> Publish to Course
            </button>
          </div>
        </div>

      </div>
    </PageTransition>
  );
};

export default CoursewareUpload;
