import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Lock, User, AlertCircle, Shield, Briefcase } from 'lucide-react';
import useStore from '../store/useStore';
import logoSrc from '../assets/naub-logo.png';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeRole, setActiveRole] = useState('student');
  
  // Credentials state
  const [matricNo, setMatricNo] = useState('STU/2023/001');
  const [password, setPassword] = useState('password123');
  
  const login = useStore((state) => state.login);

  // Auto-fill mock credentials based on selected role
  useEffect(() => {
    if (activeRole === 'student') {
      setMatricNo('STU/2023/001');
    } else if (activeRole === 'lecturer') {
      setMatricNo('lecturer');
    } else if (activeRole === 'admin') {
      setMatricNo('admin');
    }
    setPassword('password123');
    setError('');
  }, [activeRole]);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate network delay for effect
    setTimeout(() => {
      const response = login(matricNo, password);
      // Validate that the login role matches the selected tab for extra realism
      if (response.success && response.role === activeRole) {
        if (response.role === 'admin') {
          navigate('/admin');
        } else if (response.role === 'lecturer') {
          navigate('/lecturer');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(response.success ? `You are registered as a ${response.role.toUpperCase()}, not a ${activeRole.toUpperCase()}.` : 'Invalid ID or Password.');
        setIsLoading(false);
      }
    }, 800);
  };

  const roles = [
    { id: 'student', label: 'Student', icon: GraduationCap },
    { id: 'lecturer', label: 'Lecturer', icon: Briefcase },
    { id: 'admin', label: 'Admin', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-sidebar-bg flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10 text-white animate-fade-in">
          <div className="mx-auto bg-white/80 p-3 rounded-2xl backdrop-blur-md inline-block mb-4 shadow-xl border border-red-500/40 shadow-red-500/20">
             <img src={logoSrc} alt="Nigerian Army University Biu" className="h-24 w-auto object-contain drop-shadow-sm" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight px-4 leading-tight">Nigerian Army University Biu</h1>
          <p className="text-primary-200 mt-2 font-light">Information Management System</p>
        </div>

        <form onSubmit={handleLogin} className="glass-panel p-8 animate-slide-up">
          
          {/* Role Selector Tabs */}
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800/50 rounded-xl mb-8">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setActiveRole(role.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                    activeRole === role.id 
                      ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{role.label}</span>
                </button>
              )
            })}
          </div>

          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-6 font-sans transition-colors duration-300">
            {activeRole === 'student' ? 'Student Login' : activeRole === 'lecturer' ? 'Staff Login' : 'Admin Login'}
          </h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50/80 dark:bg-red-900/40 border border-red-100 dark:border-red-800/50 rounded-lg flex items-start gap-2 text-sm text-red-600 dark:text-red-400 backdrop-blur-sm transition-colors duration-300">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 transition-colors duration-300">
                {activeRole === 'student' ? 'Matriculation Number' : activeRole === 'lecturer' ? 'Staff ID' : 'Administrator ID'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  value={matricNo}
                  onChange={(e) => setMatricNo(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700/50 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all bg-white/80 dark:bg-slate-900/80"
                  placeholder={`Enter your ${activeRole === 'student' ? 'matric no' : 'ID'}`}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-300">Password</label>
                <a href="#" className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors">Forgot password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700/50 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all bg-white/80 dark:bg-slate-900/80"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-2.5 mt-2 flex justify-center items-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>

        <p className="text-center text-primary-200/60 mt-8 text-xs font-medium">
          &copy; {new Date().getFullYear()} University Name. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
