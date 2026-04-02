import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { LayoutDashboard, Plus } from 'lucide-react';

const Layout = ({ children }) => {
  const { role, setRole, setIsModalOpen } = useFinance();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar for desktop */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <LayoutDashboard size={24} />
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Finova Dashboard</h1>
        </div>

        <nav className="flex-1 space-y-4">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all bg-indigo-50 text-indigo-600 shadow-sm"
          >
            <LayoutDashboard size={20} />
            Overview
          </a>

          {role === 'Admin' && (
            <div className="pt-4 mt-4 border-t border-slate-100">
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
            <h2 className="text-2xl font-bold text-slate-800">Welcome</h2>
            <p className="text-slate-500 text-sm">Here's your financial summary for this month.</p>
          </div>
          
          <div className="flex items-center gap-4">
             {/* Role Toggler */}
             <div className="flex bg-slate-100 p-1 rounded-xl items-center shadow-inner">
               <button
                 onClick={() => setRole('Viewer')}
                 className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                   role === 'Viewer'
                     ? 'bg-white text-indigo-600 shadow-sm'
                     : 'text-slate-500 hover:text-slate-700'
                 }`}
               >
                 Viewer
               </button>
               <button
                 onClick={() => setRole('Admin')}
                 className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                   role === 'Admin'
                     ? 'bg-white text-indigo-600 shadow-sm'
                     : 'text-slate-500 hover:text-slate-700'
                 }`}
               >
                 Admin
               </button>
             </div>

          </div>
        </header>

        {children}
      </main>
    </div>
  );
};

export default Layout;
