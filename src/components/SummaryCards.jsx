import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { TrendingUp, TrendingDown, DollarSign, Wallet } from 'lucide-react';

const SummaryCards = () => {
  const { transactions } = useFinance();

  const income = transactions
    .filter((tx) => tx.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expenses = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expenses;

  const cardData = [
    {
      title: 'Current Balance',
      amount: balance,
      icon: Wallet,
      color: 'bg-indigo-600',
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-500/10',
    },
    {
      title: 'Total Income',
      amount: income,
      icon: TrendingUp,
      color: 'bg-emerald-500',
      color: 'text-emerald-500 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-500/10',
    },
    {
      title: 'Total Expenses',
      amount: expenses,
      icon: TrendingDown,
      color: 'bg-rose-500',
      color: 'text-rose-500 dark:text-rose-400',
      bgColor: 'bg-rose-50 dark:bg-rose-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cardData.map((card) => (
        <div 
          key={card.title} 
          className="bg-surface p-6 rounded-2xl border border-border-dim shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-muted mb-1">{card.title}</p>
              <h3 className="text-2xl font-bold text-foreground">
                ${card.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </h3>
            </div>
            <div className={`${card.bgColor} ${card.color} p-3 rounded-xl transform group-hover:scale-110 transition-transform`}>
              <card.icon size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 w-fit px-2 py-1 rounded-md">
            <span>+12.5%</span>
            <TrendingUp size={12} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
