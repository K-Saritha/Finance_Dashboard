# Modern Finance Dashboard

A sleek, professional finance management dashboard built with React, Tailwind CSS 4, and Recharts. This application provides a comprehensive overview of financial transactions, income/expense trends, and actionable insights.

[![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://finance-dashboard-mu-lac.vercel.app/)

## ✨ Features

- **🌓 Dynamic Dark Mode**: Seamlessly switch between light and dark themes with system preference detection and local storage persistence.
- **🔐 Role-Based Access**: Toggle between 'Admin' (can add/delete records) and 'Viewer' (read-only) modes.
- **📊 Interactive Data Visualization**:
  - **Daily Balance Trend**: Area chart showing income vs. expense over the last 7 days.
  - **Spending Breakdown**: Pie chart showing expense distribution by category.
- **⚡ Smart Insights**: Automated analysis of spending patterns, top categories, and savings rates.
- **🧾 Transaction Management**: Search, filter by type (Income/Expense), and manage records with a clean, responsive table.
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile views.

## 🛠️ Tech Stack

- **Core**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **State Management**: React Context API
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Date Utilities**: [date-fns](https://date-fns.org/)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd finance_app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 📂 Project Structure

```text
src/
├── components/      # UI Components (Layout, Charts, Modals, etc.)
├── context/         # FinanceContext for global state & theme management
├── data/            # Mock transaction data and constants
├── assets/          # Static assets
├── App.jsx          # Main application entry
└── index.css        # Global styles and Tailwind 4 theme configuration
```


