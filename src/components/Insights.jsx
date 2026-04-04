import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { Lightbulb, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

const Insights = () => {
  const { transactions } = useFinance();

  // 1. Highest spending category
  const expenseByCategory = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  const highestCategory = Object.entries(expenseByCategory).sort((a, b) => b[1] - a[1])[0];

  // 2. Savings rate
  const totalIncome = transactions
    .filter((tx) => tx.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);
  
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

  const insights = [
    {
      title: 'Top Spending Category',
      description: highestCategory 
        ? `You spend the most on ${highestCategory[0]} ($${highestCategory[1].toLocaleString()}).` 
        : "No expense data yet.",
      icon: TrendingUp,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-500/10',
    },
    {
      title: 'Monthly Savings Rate',
      description: `Your current savings rate is ${savingsRate.toFixed(1)}%. ${savingsRate > 20 ? 'Great job!' : 'Try to save more.'}`,
      icon: CheckCircle2,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-500/10',
    },
    {
      title: 'Spending Pattern',
      description: totalExpense > totalIncome * 0.8 
        ? "Warning: Your expenses are reaching 80% of your income." 
        : "Your spending is well within your budget.",
      icon: AlertCircle,
      color: totalExpense > totalIncome * 0.8 ? 'text-rose-600 dark:text-rose-400' : 'text-indigo-600 dark:text-indigo-400',
      bgColor: totalExpense > totalIncome * 0.8 ? 'bg-rose-50 dark:bg-rose-500/10' : 'bg-indigo-50 dark:bg-indigo-500/10',
    }
  ];

  return (
    <div className="bg-surface p-6 rounded-2xl border border-border-dim shadow-sm mb-10 overflow-hidden relative transition-colors">
      <div className="absolute top-0 right-0 p-8 text-indigo-50/50 dark:text-indigo-500/10">
        <Lightbulb size={120} />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <Lightbulb className="text-indigo-600 dark:text-indigo-400" size={24} />
          <h3 className="text-lg font-bold text-foreground">Smart Insights</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.map((insight, idx) => (
            <div key={idx} className="flex gap-4">
              <div className={`${insight.bgColor} ${insight.color} h-10 w-10 min-w-10 rounded-xl flex items-center justify-center`}>
                <insight.icon size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground mb-1">{insight.title}</h4>
                <p className="text-xs text-muted leading-relaxed font-medium">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Insights;
