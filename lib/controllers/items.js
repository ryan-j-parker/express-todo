const { Router } = require('express');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const items = await Item.getAll();
    res.json(items);
  } catch (e) {
    next(e);
  }
});
