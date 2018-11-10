const router = require('express').Router();
const { addPage } = require('../views/');
const { Page } = require('../models');
const { User } = require('../models')
const { wikiPage } = require('../views');

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

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: { slug: `${req.params.slug}` }
    });
    let author = await page.getAuthor();
    author = author.name;
    res.send(wikiPage(page, author));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  let user = await User.findOne({ where: { name: req.body.name } });
  if (!user) {
    user = new User({
      name: req.body.name,
      email: req.body.email
    });
    await user.save();
  }
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    slug: req.body.slug,
    status: req.body.status,
  });
  page.setAuthor(user.id);
  try {
    await page.save();
    res.redirect(`./${page.slug}`);
  } catch (error) {
    next(error);
  }
});

