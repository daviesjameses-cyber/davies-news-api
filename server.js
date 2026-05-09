const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const NEWS_API_KEY = process.env.NEWS_API_KEY;

app.get('/api/news', async (req, res) => {
  try {
    const { category = 'general', country = 'ng', pageSize = 20, q } = req.query;
    
    if (!NEWS_API_KEY) {
      return res.status(500).json({ 
        status: 'error', 
        message: 'NEWS_API_KEY environment variable not set' 
      });
    }

    let url;
    if (q) {
      url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&apiKey=${NEWS_API_KEY}&pageSize=${pageSize}`;
    } else {
      url = `https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=${NEWS_API_KEY}&pageSize=${pageSize}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));