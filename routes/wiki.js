const router = require('express').Router();
const { addPage } = require('../views/');
const { Page } = require('../models');

module.exports = router;



router.get('/', (req, res, next) => {
  try {
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/add', (req, res, next) => {
  try {
    res.send(addPage());
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    slug: req.body.slug,
    status: req.body.status
  });
  try {
    await page.save();
    res.send(page);
  } catch (error) {
    next(error);
  }
});

