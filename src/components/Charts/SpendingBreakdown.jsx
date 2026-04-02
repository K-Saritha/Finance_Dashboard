import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = [
  '#4f46e5', // Housing
  '#10b981', // Food
  '#f59e0b', // Transport
  '#3b82f6', // Utilities
  '#ef4444', // Entertainment
  '#8b5cf6', // Health
  '#ec4899', // Shopping
  '#64748b', // Other
];

const SpendingBreakdown = () => {
  const { transactions } = useFinance();

  const expenseByCategory = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  const data = Object.keys(expenseByCategory).map((name) => ({
    name,
    value: expenseByCategory[name],
  }));

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">Spending Analysis</h3>
          <p className="text-sm text-slate-500">Expenses categorized by type</p>
        </div>
      </div>
      
      <div className="flex-1 w-full flex items-center justify-center">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={4} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 600, color: '#64748b' }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 gap-4">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center border border-dashed border-slate-200">
               <span className="text-xl">📊</span>
            </div>
            <p className="text-sm font-medium">No expense data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpendingBreakdown;
