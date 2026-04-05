import React, { useState, useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Search, Filter, Trash2, ArrowUpRight, ArrowDownRight, Edit3 } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const TransactionsList = () => {
  const { transactions, role, deleteTransaction } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, income, expense
  const [dateRange, setDateRange] = useState('all'); // all, today, 7days, 30days
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories from current transactions or mock data
  const availableCategories = useMemo(() => {
    const allCats = transactions.map(tx => tx.category);
    return ['all', ...new Set(allCats)];
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => {
        const txDate = parseISO(tx.date);
        const now = new Date();
        
        // Search Filter
        const matchesSearch = tx.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.description?.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Type Filter
        const matchesType = filterType === 'all' || tx.type === filterType;

        // Category Filter
        const matchesCategory = selectedCategory === 'all' || tx.category === selectedCategory;

        // Date Range Filter
        let matchesDate = true;
        if (dateRange === 'today') {
          matchesDate = format(txDate, 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd');
        } else if (dateRange === '7days') {
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(now.getDate() - 7);
          matchesDate = txDate >= sevenDaysAgo;
        } else if (dateRange === '30days') {
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(now.getDate() - 30);
          matchesDate = txDate >= thirtyDaysAgo;
        }

        return matchesSearch && matchesType && matchesCategory && matchesDate;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions, searchTerm, filterType, selectedCategory, dateRange]);

  const clearFilters = () => {
    setSearchTerm('');
    setFilterType('all');
    setDateRange('all');
    setSelectedCategory('all');
  };

  const activeFilterCount = [
    searchTerm !== '',
    filterType !== 'all',
    dateRange !== 'all',
    selectedCategory !== 'all'
  ].filter(Boolean).length;

  return (
    <div className="bg-surface rounded-2xl border border-border-dim shadow-sm overflow-hidden flex flex-col transition-colors">
      <div className="p-6 border-b border-border-dim/50 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-foreground tracking-tight">Recent Activity</h3>
            <p className="text-sm text-muted font-medium">Tracking your latest transactions</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
             {/* Quick Type Selection */}
            <div className="flex items-center gap-1 bg-background p-1 rounded-xl border border-border-dim shadow-sm">
              {['all', 'income', 'expense'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                    filterType === type 
                      ? 'bg-indigo-600 text-white shadow-sm' 
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Filter Toggle */}
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-xl border transition-all flex items-center gap-2 text-xs font-bold ${
                showFilters || activeFilterCount > 0
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/20' 
                  : 'bg-background border-border-dim text-muted hover:text-foreground'
              }`}
            >
              <Filter size={18} />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-indigo-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        <div className={`space-y-4 transition-all duration-300 overflow-hidden ${showFilters ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-background/50 rounded-2xl border border-border-dim/50">
            {/* Search */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-muted tracking-widest px-1">Search</label>
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-indigo-500 transition-colors" size={16} />
                <input 
                  type="text" 
                  placeholder="Category or desc..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-background border border-border-dim rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium" 
                />
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-muted tracking-widest px-1">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border-dim rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium appearance-none"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
              </select>
            </div>

            {/* Category selection */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-muted tracking-widest px-1">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border-dim rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium appearance-none capitalize"
              >
                {availableCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={clearFilters}
              className="text-xs font-bold text-muted hover:text-rose-500 transition-colors flex items-center gap-1.5 px-3 py-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10"
            >
              <Trash2 size={14} />
              Reset All Filters
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-background/30 text-muted">
              <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest">Transaction</th>
              <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest">Date</th>
              <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest">Category</th>
              <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-widest">Amount</th>
              {role === 'Admin' && (
                <th className="px-6 py-4 text-center text-[10px] font-bold uppercase tracking-widest">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-dim/30">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-indigo-50/30 dark:hover:bg-indigo-500/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center shadow-sm ${
                        tx.type === 'income' 
                        ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20' 
                        : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-500/20'
                      }`}>
                        {tx.type === 'income' ? <ArrowDownRight size={20} /> : <ArrowUpRight size={20} />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground leading-none mb-1">{tx.description || 'No description'}</p>
                        <p className="text-[10px] text-muted font-bold uppercase tracking-wider">{tx.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-foreground/70">{format(parseISO(tx.date), 'MMM dd, yyyy')}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-background text-foreground/70 rounded-lg text-xs font-bold border border-border-dim/50 shadow-sm">
                      {tx.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className={`text-sm font-black ${tx.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-foreground'}`}>
                      {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
                    </p>
                  </td>
                  {role === 'Admin' && (
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        <button className="p-2 text-muted hover:text-indigo-600 hover:bg-white dark:hover:bg-indigo-500/20 rounded-lg transition-all border border-transparent hover:border-indigo-100 dark:hover:border-indigo-500/30">
                          <Edit3 size={15} />
                        </button>
                        <button 
                          onClick={() => deleteTransaction(tx.id)}
                          className="p-2 text-muted hover:text-rose-600 hover:bg-white dark:hover:bg-rose-500/20 rounded-lg transition-all border border-transparent hover:border-rose-100 dark:hover:border-rose-500/30"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={role === 'Admin' ? 5 : 4} className="px-6 py-12 text-center text-muted font-medium">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center border border-dashed border-border-dim">
                       <span className="text-xl">🔍</span>
                    </div>
                    <p>No transactions found matching your criteria</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsList;
