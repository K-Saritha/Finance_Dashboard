import React, { useState, useMemo } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Search, Filter, Trash2, ArrowUpRight, ArrowDownRight, Edit3 } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const TransactionsList = () => {
  const { transactions, role, deleteTransaction } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, income, expense

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => {
        const matchesSearch = tx.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || tx.type === filterType;
        return matchesSearch && matchesType;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions, searchTerm, filterType]);

  return (
    <div className="bg-surface rounded-2xl border border-border-dim shadow-sm overflow-hidden flex flex-col transition-colors">
      <div className="p-6 border-b border-border-dim/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-foreground tracking-tight">Recent Activity</h3>
          <p className="text-sm text-muted font-medium">Tracking your latest transactions</p>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search category or desc..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-background border border-border-dim rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-full md:w-64" 
            />
          </div>
          
          <div className="flex items-center gap-2 bg-background p-1 rounded-xl border border-border-dim">
            {['all', 'income', 'expense'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  filterType === type 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'text-muted hover:text-foreground'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-background/50">
              <th className="px-6 py-4 text-left text-xs font-bold text-muted uppercase tracking-wider">Transaction</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-muted uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-muted uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-muted uppercase tracking-wider">Amount</th>
              {role === 'Admin' && (
                <th className="px-6 py-4 text-center text-xs font-bold text-muted uppercase tracking-wider">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-dim/50">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                        tx.type === 'income' ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400'
                      }`}>
                        {tx.type === 'income' ? <ArrowDownRight size={20} /> : <ArrowUpRight size={20} />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">{tx.description || 'No description'}</p>
                        <p className="text-xs text-muted font-medium capitalize">{tx.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-foreground/80">{format(parseISO(tx.date), 'MMM dd, yyyy')}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-background text-foreground/70 rounded-full text-xs font-bold border border-border-dim">
                      {tx.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className={`text-sm font-bold ${tx.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-foreground'}`}>
                      {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
                    </p>
                  </td>
                  {role === 'Admin' && (
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-muted hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors">
                          <Edit3 size={16} />
                        </button>
                        <button 
                          onClick={() => deleteTransaction(tx.id)}
                          className="p-2 text-muted hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
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
