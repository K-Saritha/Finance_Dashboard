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
  const { transactions, theme } = useFinance();
  const isDark = theme === 'dark';

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
    <div className="bg-surface p-6 rounded-2xl border border-border-dim shadow-sm h-[400px] flex flex-col transition-colors">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-foreground tracking-tight">Spending Analysis</h3>
          <p className="text-sm text-muted">Expenses categorized by type</p>
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
                contentStyle={{ 
                  backgroundColor: isDark ? '#1e293b' : '#ffffff', 
                  borderRadius: '12px', 
                  border: isDark ? '1px solid #334155' : 'none', 
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  color: isDark ? '#f1f5f9' : '#1e293b'
                }}
                itemStyle={{ color: isDark ? '#f1f5f9' : '#1e293b' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                wrapperStyle={{ 
                  paddingTop: '20px', 
                  fontSize: '12px', 
                  fontWeight: 600, 
                  color: isDark ? '#94a3b8' : '#64748b' 
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center text-muted gap-4">
            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center border border-dashed border-border-dim">
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
