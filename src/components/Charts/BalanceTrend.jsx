import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format, parseISO, subDays } from 'date-fns';

const BalanceTrend = () => {
  const { transactions, theme } = useFinance();
  const isDark = theme === 'dark';

  // Generate data for the last 7 days
  const data = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dateStr = format(date, 'MMM dd');
    const dayIso = date.toISOString().split('T')[0];

    const dayTransactions = transactions.filter(
      (tx) => tx.date.split('T')[0] === dayIso
    );

    const income = dayTransactions
      .filter((tx) => tx.type === 'income')
      .reduce((acc, curr) => acc + curr.amount, 0);

    const expense = dayTransactions
      .filter((tx) => tx.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0);

    return {
      name: dateStr,
      income,
      expense,
      balance: income - expense,
    };
  });

  return (
    <div className="bg-surface p-6 rounded-2xl border border-border-dim shadow-sm h-[400px] flex flex-col transition-colors">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-foreground tracking-tight">Financial Trend</h3>
          <p className="text-sm text-muted">Daily performance for the last 7 days</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-xs font-semibold text-muted uppercase">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
            <span className="text-xs font-semibold text-muted uppercase">Expense</span>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#334155' : '#f1f5f9'} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 11, fontWeight: 600 }}
              dy={10}
            />
            <YAxis 
               axisLine={false} 
               tickLine={false} 
               tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 11, fontWeight: 600 }}
            />
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
            <Area
              type="monotone"
              dataKey="income"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorIncome)"
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#4f46e5"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorExpense)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BalanceTrend;
