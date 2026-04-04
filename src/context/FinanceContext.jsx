import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { mockTransactions } from '../data/mockData';

const FinanceContext = createContext();

export const useFinance = () => {
  return useContext(FinanceContext);
};

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [role, setRole] = useState('Viewer'); // 'Viewer' or 'Admin'
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Theme logic
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const addTransaction = (transaction) => {
    setTransactions((prev) => [
      {
        ...transaction,
        id: `tx-${Date.now()}`,
      },
      ...prev,
    ]);
    setIsModalOpen(false);
  };

  const editTransaction = (id, updatedData) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, ...updatedData } : tx))
    );
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  const value = {
    transactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    role,
    setRole,
    isModalOpen,
    setIsModalOpen,
    theme,
    toggleTheme,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};
