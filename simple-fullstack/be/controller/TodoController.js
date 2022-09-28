const express = require('express');
const router = express.Router();

const { selectTodos, selectTodo, insertTodo, updateTodo, deleteTodo } = require('../service/TodoService');

router.get('/', async (req, res) => {
  const result = await selectTodos();

  res.json({ result });
});

router.get('/:seq', async (req, res) => {
  const result = await selectTodo(req.params);

  res.json({ result });
});

router.post('/', async (req, res) => {
  const result = await insertTodo(req.body);

  res.json({ result });
});

router.patch('/:seq', async (req, res) => {
  const result = await updateTodo(req.params.seq, req.body.content);

  res.json({ result });
});

router.delete('/:seq', async (req, res) => {
  const result = await deleteTodo(req.params);

  res.json({ result });
});

module.exports = router;
