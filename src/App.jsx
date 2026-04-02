import React from 'react';
import { FinanceProvider } from './context/FinanceContext';
import Layout from './components/Layout';
import SummaryCards from './components/SummaryCards';
import BalanceTrend from './components/Charts/BalanceTrend';
import SpendingBreakdown from './components/Charts/SpendingBreakdown';
import TransactionsList from './components/TransactionsList';
import Insights from './components/Insights';
import AddTransactionModal from './components/AddTransactionModal';

function App() {
  return (
    <FinanceProvider>
      <Layout>
        {/* Global Modal */}
        <AddTransactionModal />
        
        {/* Top Summary Metrics */}
        <SummaryCards />

        {/* Actionable Insights */}
        <Insights />

        {/* Visualizations Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <BalanceTrend />
          <SpendingBreakdown />
        </div>

        {/* Main Records Table */}
        <TransactionsList />

        
      </Layout>
    </FinanceProvider>
  );
}

export default App;
