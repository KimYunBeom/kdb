const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const name = req.query.name ? req.query.name : 'world';
  res.json({ hello: name });
});

module.exports = router;
