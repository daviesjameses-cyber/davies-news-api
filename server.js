const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors()); 

app.get('/', async (req, res) => {
  const category = req.query.category || 'general';
  const apiKey = process.env.NEWS_API_KEY; 
  
  // CORRECTED FOR THENEWSAPI.COM
  // 1. Domain is api.thenewsapi.com
  // 2. Endpoint is /v1/news/headlines
  // 3. Key parameter name is api_token (NOT apiKey)
  const url = `https://thenewsapi.com{apiKey}&categories=${category}&locale=us`;

  try {
    const response = await axios.get(url);
    
    // IMPORTANT: TheNewsAPI returns data in a 'data' array
    // We send back 'articles' to match your HTML code logic
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
