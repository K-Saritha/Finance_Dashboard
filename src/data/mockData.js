export const mockTransactions = [
  {
    id: "tx-1",
    date: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    amount: 3500,
    category: "Salary",
    type: "income",
    description: "Monthly Salary HQ",
  },
  {
    id: "tx-2",
    date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    amount: 150,
    category: "Groceries",
    type: "expense",
    description: "Supermarket shopping",
  },
  {
    id: "tx-3",
    date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString(),
    amount: 1200,
    category: "Housing",
    type: "expense",
    description: "Monthly Rent",
  },
  {
    id: "tx-4",
    date: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(),
    amount: 65,
    category: "Utilities",
    type: "expense",
    description: "Electric Bill",
  },
  {
    id: "tx-5",
    date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
    amount: 200,
    category: "Transport",
    type: "expense",
    description: "Gas and Tolls",
  },
  {
    id: "tx-6",
    date: new Date(new Date().setDate(new Date().getDate() - 6)).toISOString(),
    amount: 120,
    category: "Entertainment",
    type: "expense",
    description: "Concert tickets",
  },
  {
    id: "tx-7",
    date: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString(),
    amount: 50,
    category: "Dining",
    type: "expense",
    description: "Dinner at Luigi's",
  },
  {
    id: "tx-8",
    date: new Date(new Date().setDate(new Date().getDate() - 12)).toISOString(),
    amount: 500,
    category: "Freelance",
    type: "income",
    description: "Web Design Project",
  },
];

export const categories = {
  income: ["Salary", "Freelance", "Investments", "Other"],
  expense: ["Housing", "Groceries", "Transport", "Utilities", "Dining", "Entertainment", "Healthcare", "Other"]
};
