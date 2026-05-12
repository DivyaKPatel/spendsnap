import { useState } from 'react';
import axios from 'axios';

const CATEGORIES = ['Food', 'Transport', 'Rent', 'Shopping', 'Health', 'Entertainment', 'Salary', 'Other'];
const CURRENCIES = ['CAD', 'USD', 'EUR', 'INR', 'GBP', 'AUD'];

const TransactionForm = ({ onAdd, rates }) => {
  const [form, setForm] = useState({
    description: '', amount: '', category: 'Food',
    type: 'expense', currency: 'CAD'
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.description || !form.amount) return alert('Please fill all fields!');

    const rate = rates[form.currency] || 1;
    const amountInCAD = parseFloat(form.amount) / rate;

    try {
      const res = await axios.post('https://spendsnap-api.onrender.com/api/transactions', {
        ...form, amountInCAD
      });
      onAdd(res.data);
      setForm({ description: '', amount: '', category: 'Food', type: 'expense', currency: 'CAD' });
    } catch (err) {
      alert('Error adding transaction');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-lg font-bold text-gray-700 mb-4">➕ Add Transaction</h2>
      <div className="grid grid-cols-2 gap-3">
        <input name="description" value={form.description} onChange={handleChange}
          placeholder="Description" className="border rounded-lg p-2 col-span-2" />
        <input name="amount" value={form.amount} onChange={handleChange}
          placeholder="Amount" type="number" className="border rounded-lg p-2" />
        <select name="currency" value={form.currency} onChange={handleChange}
          className="border rounded-lg p-2">
          {CURRENCIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select name="category" value={form.category} onChange={handleChange}
          className="border rounded-lg p-2">
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select name="type" value={form.type} onChange={handleChange}
          className="border rounded-lg p-2">
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
      <button onClick={handleSubmit}
        className="mt-4 w-full bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition">
        Add Transaction
      </button>
    </div>
  );
};

export default TransactionForm;
    