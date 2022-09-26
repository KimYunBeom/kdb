const express = require('express');
const router = express.Router();

const { selectTodos } = require('../service/TodoService');

router.get('/', async (req, res) => {
  const result = await selectTodos();

  res.json({ result });
});

module.exports = router;
