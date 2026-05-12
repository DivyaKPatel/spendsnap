import { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import SpendingChart from './components/SpendingChart';
import TransactionList from './components/TransactionList';
import CurrencyBadge from './components/CurrencyBadge';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [rates, setRates] = useState({});

  useEffect(() => {
    // Fetch live exchange rates
    axios.get('https://spendsnap-api.onrender.com/api/currency')
      .then(res => setRates(res.data))
      .catch(err => console.error('Currency fetch failed:', err));

    // Fetch existing transactions
    axios.get('https://spendsnap-api.onrender.com/api/transactions')
      .then(res => setTransactions(res.data));
  }, []);

  const handleAdd = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">💰 SpendSnap</h1>
        <p className="text-gray-400 mb-6">Multi-Currency Expense Tracker</p>
        <CurrencyBadge rates={rates} />
        <Dashboard transactions={transactions} />
        <TransactionForm onAdd={handleAdd} rates={rates} />
        <SpendingChart transactions={transactions} />
        <TransactionList transactions={transactions} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;