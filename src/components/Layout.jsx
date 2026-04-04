import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { LayoutDashboard, Plus, Sun, Moon } from 'lucide-react';

const Layout = ({ children }) => {
  const { role, setRole, setIsModalOpen, theme, toggleTheme } = useFinance();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row transition-colors duration-300">
      {/* Sidebar for desktop */}
      <aside className="w-full md:w-64 bg-surface border-r border-border-dim p-6 flex flex-col transition-colors duration-300">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <LayoutDashboard size={24} />
          </div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Finance Dashboard</h1>
        </div>

        <nav className="flex-1 space-y-4">
          {/* <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all bg-indigo-50 text-indigo-600 shadow-sm"
          >
            <LayoutDashboard size={20} />
          </a> */}

          {role === 'Admin' && (
            <div className="pt-4 mt-4 border-t border-border-dim">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all shadow-md shadow-indigo-200 flex items-center justify-center gap-2 active:scale-95 animate-in fade-in slide-in-from-left duration-300"
              >
                <Plus size={18} />
                Add Record
              </button>
            </div>
          )}
        </nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Welcome</h2>
            <p className="text-muted text-sm">Here's your financial summary for this month.</p>
          </div>
          
          <div className="flex items-center gap-4">
             {/* Theme Toggle (Mobile/Responsive shortcuts could go here, but sidebar is fine) */}
             
             {/* Role Toggler */}
             <div className="flex bg-surface border border-border-dim p-1 rounded-xl items-center shadow-inner">
               <button
                 onClick={() => setRole('Viewer')}
                 className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                   role === 'Viewer'
                     ? 'bg-indigo-600 text-white shadow-sm'
                     : 'text-muted hover:text-foreground'
                 }`}
               >
                 Viewer
               </button>
               <button
                 onClick={() => setRole('Admin')}
                 className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                   role === 'Admin'
                     ? 'bg-indigo-600 text-white shadow-sm'
                     : 'text-muted hover:text-foreground'
                 }`}
               >
                 Admin
               </button>
             </div>

             {/* Theme Toggle */}
             <button
               onClick={toggleTheme}
               className="p-2.5 bg-surface border border-border-dim rounded-xl text-muted hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm active:scale-95"
               title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
             >
               {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
             </button>

          </div>
        </header>

        {children}
      </main>
    </div>
  );
};

export default Layout;
