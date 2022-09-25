const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 8001;

app.get('/', (req, res) => {
  const name = req.query.name ? req.query.name : 'world';
  res.json({ hello: name });
});

app.listen(PORT, () => {
  console.log(`Server is on port : ${PORT}`);
});
