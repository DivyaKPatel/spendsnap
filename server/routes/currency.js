const express = require('express');
const axios = require('axios');
const router = express.Router();

// GET live exchange rates based in CAD
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}/latest/CAD`
    );
    res.json(response.data.conversion_rates);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch exchange rates' });
  }
});

module.exports = router;