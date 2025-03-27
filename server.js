const express = require('express');
const request = require('request');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/solr/*', (req, res) => {
  const solrPath = req.originalUrl.replace('/solr', '');
  const solrUrl = `https://adsabs.harvard.edu/solr/collection1${solrPath}`;

  const auth = {
    user: process.env.SOLR_USER,
    pass: process.env.SOLR_PASS
  };

  request.get(
    {
      url: solrUrl,
      auth: auth
    },
    (error, response, body) => {
      if (error) {
        return res.status(500).json({ error: error.toString() });
      }
      res.set('Content-Type', 'application/json');
      res.send(body);
    }
  );
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
