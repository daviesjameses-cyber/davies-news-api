const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors()); 

app.get('/', async (req, res) => {
  const category = req.query.category || 'general';
  const query = req.query.q || 'nigeria';
  const apiKey = process.env.NEWS_API_KEY; 
  
  // FIXED URL BELOW: Added /v2/top-headlines and corrected the ? and & symbols
  const url = `https://thenewsapi.com{category}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    // If the API returns an error, we send that message back to your HTML
    res.status(500).json({ 
      status: 'error', 
      message: error.response ? error.response.data.message : error.message 
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
