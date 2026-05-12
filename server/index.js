const express = require('express');
const cors = require('cors');
require('dotenv').config();

const transactionsRoute = require('./routes/transactions');
const currencyRoute = require('./routes/currency');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactionsRoute);
app.use('/api/currency', currencyRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));