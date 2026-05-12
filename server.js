const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors()); // This allows your HTML site to talk to this server

app.get('/', async (req, res) => {
  const category = req.query.category || 'general';
  const apiKey = process.env.NEWS_API_KEY; // We will hide your key here
  const url = `https://newsapi.org{category}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
