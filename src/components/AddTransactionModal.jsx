import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { X, Plus, DollarSign, Calendar, Tag, Type } from 'lucide-react';
import { categories } from '../data/mockData';

const AddTransactionModal = () => {
  const { isModalOpen, setIsModalOpen, addTransaction } = useFinance();
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Other',
    type: 'expense',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  if (!isModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.category) return;
    
    addTransaction({
      ...formData,
      amount: parseFloat(formData.amount),
      date: new Date(formData.date).toISOString(),
    });
    
    // Reset form
    setFormData({
      amount: '',
      category: 'Other',
      type: 'expense',
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={() => setIsModalOpen(false)}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-surface w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 border border-border-dim/50 transition-colors">
        <div className="p-6 border-b border-border-dim/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 p-2 rounded-lg">
              <Plus size={20} />
            </div>
            <h3 className="text-lg font-bold text-foreground">Add Transaction</h3>
          </div>
          <button 
            onClick={() => setIsModalOpen(false)}
            className="text-muted hover:text-foreground p-1 hover:bg-background rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
           {/* Amount */}
           <div>
            <label className="block text-xs font-bold text-muted uppercase mb-2 tracking-wider">Amount</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
              <input 
                type="number" 
                required
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border-dim rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-foreground"
              />
            </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              {/* Type */}
              <div>
                <label className="block text-xs font-bold text-muted uppercase mb-2 tracking-wider">Type</label>
                <div className="relative">
                  <Type className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value, category: categories[e.target.value][0]})}
                    className="w-full pl-9 pr-4 py-2 bg-background border border-border-dim rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-semibold text-foreground appearance-none"
                  >
                    <option value="expense" className="bg-surface">Expense</option>
                    <option value="income" className="bg-surface">Income</option>
                  </select>
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-bold text-muted uppercase mb-2 tracking-wider">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                  <input 
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full pl-9 pr-4 py-2 bg-background border border-border-dim rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-semibold text-foreground"
                  />
                </div>
              </div>
           </div>

           {/* Category */}
           <div>
              <label className="block text-xs font-bold text-muted uppercase mb-2 tracking-wider">Category</label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full pl-9 pr-4 py-2 bg-background border border-border-dim rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-semibold text-foreground appearance-none"
                >
                  {categories[formData.type].map(cat => (
                    <option key={cat} value={cat} className="bg-surface">{cat}</option>
                  ))}
                </select>
              </div>
           </div>

           {/* Description */}
           <div>
              <label className="block text-xs font-bold text-muted uppercase mb-2 tracking-wider">Description</label>
              <textarea 
                placeholder="What was this for?"
                rows="2"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2 bg-background border border-border-dim rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-medium text-foreground resize-none"
              ></textarea>
           </div>

           <div className="pt-2">
              <button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                Add Transaction
              </button>
           </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
