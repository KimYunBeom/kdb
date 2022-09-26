const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 8001;

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
