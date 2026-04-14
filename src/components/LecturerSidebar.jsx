import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  CheckSquare, 
  LogOut,
  FolderOpen
} from 'lucide-react';
import useStore from '../store/useStore';
import logoSrc from '../assets/naub-logo.png';

const LecturerSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useStore(state => state.logout);
  const user = useStore(state => state.user);
  const sidebarOpen = useStore(state => state.sidebarOpen);
  const setSidebarOpen = useStore(state => state.setSidebarOpen);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Determine if the current lecturer is given Level Advisor or HOD clearance
  const isAdvisor = user?.appointments?.includes('Level Advisor') || user?.appointments?.includes('HOD');

  const navLinks = [
    { path: '/lecturer', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/lecturer/courses', name: 'My Courses', icon: BookOpen },
    { path: '/lecturer/courseware', name: 'Manage Courseware', icon: FolderOpen },
    
    // Conditionally hidden behind RBAC
    ...(isAdvisor ? [{ path: '/lecturer/registrations', name: 'Course Registrations', icon: CheckSquare }] : []),
    
    { path: '/lecturer/grading', name: 'Grading', icon: Users },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 md:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-sidebar-bg text-white flex flex-col h-full shadow-2xl z-40 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-6 flex items-center gap-3">
        <div className="bg-white/90 p-1.5 rounded-lg shadow-lg border border-red-500/40">
          <img src={logoSrc} alt="NAUB Logo" className="h-8 w-auto object-contain" />
        </div>
        <div className="flex-1">
          <h2 className="text-sm font-bold tracking-tight leading-tight whitespace-nowrap">Nigerian Army<br/>University Biu</h2>
          <p className="text-xs text-red-400 font-medium mt-0.5">Lecturer Portal</p>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path || (link.path !== '/lecturer' && location.pathname.startsWith(link.path));
          
          return (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setSidebarOpen(false)}
              className={`nav-item ${isActive ? 'active bg-amber-600/20 text-amber-500' : ''}`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-amber-500' : 'text-slate-400'}`} />
              <span>{link.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700/50">
        <button 
          onClick={handleLogout}
          className="w-full flex flex-row items-center space-x-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
    </>
  );
};

export default LecturerSidebar;
