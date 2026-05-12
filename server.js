const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors()); 

app.get('/', async (req, res) => {
  const category = req.query.category || 'general';
  const apiKey = process.env.NEWS_API_KEY; 
  
  // FIX: Added 'api.' and the correct endpoint path
  const url = `https://thenewsapi.com{apiKey}&categories=${category}&locale=us`;

  try {
    const response = await axios.get(url);
    res.json({
      status: 'ok',
      articles: response.data.data 
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: error.response ? error.response.data.message : error.message 
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
