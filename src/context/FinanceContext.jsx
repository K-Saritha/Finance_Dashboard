import React, { createContext, useContext, useState, useMemo } from 'react';
import { mockTransactions } from '../data/mockData';

const FinanceContext = createContext();

export const useFinance = () => {
  return useContext(FinanceContext);
};

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [role, setRole] = useState('Viewer'); // 'Viewer' or 'Admin'
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};
