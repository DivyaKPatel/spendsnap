const express = require('express');
const router = express.Router();

// In-memory storage (no database needed)
let transactions = [];

// GET all transactions
router.get('/', (req, res) => {
  res.json(transactions);
});

// POST a new transaction
router.post('/', (req, res) => {
  const { description, amount, category, type, currency, amountInCAD } = req.body;
  const transaction = {
    id: Date.now(),
    description,
    amount: parseFloat(amount),
    category,
    type, // 'income' or 'expense'
    currency,
    amountInCAD: parseFloat(amountInCAD),
    date: new Date().toLocaleDateString()
  };
  transactions.push(transaction);
  res.json(transaction);
});

// DELETE a transaction
router.delete('/:id', (req, res) => {
  transactions = transactions.filter(t => t.id !== parseInt(req.params.id));
  res.json({ message: 'Deleted' });
});

module.exports = router;