const express = require('express');
const app = express();

app.use(express.json());
require('dotenv').config();

const PORT = process.env.PORT || 8001;

app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

app.get('/', (req, res) => {
  res.json({ result: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Server is on port : ${PORT}`);
});

const HelloController = require('./controller/HelloController');
const TodoController = require('./controller/TodoController');

app.use('/hello', HelloController);
app.use('/todos', TodoController);
