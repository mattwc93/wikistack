const router = require('express').Router();
const { addPage } = require('../views/');
const { Page, User } = require('../models');
const { wikiPage, noPage, editPage } = require('../views');

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
    res.send(wikiPage(page, author));
  } catch (error) {
    res.status(404).send(noPage('No Page with this title found!'));
  }
});

router.get('/:slug/delete', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: { slug: `${req.params.slug}` }
    });
    await page.destroy();
    res.redirect('/');
  } catch (error) {
    res.status(404).send(noPage('Delete failed!'));
  }
});

router.get('/:slug/edit', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: { slug: `${req.params.slug}` }
    });
    let author = await page.getAuthor();
    res.send(editPage(page, author));
  } catch (error) {
    res.status(404).send(noPage('No Page with this title found!'));
  }
});

router.post('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: { slug: `${req.params.slug}` }
    });
    await page.update(req.body);
    await page.update({slug: req.params.slug})
    const [author, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    });
    page.setAuthor(author);
    res.redirect(`./${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const page = new Page(req.body);
  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email,
      }
    });
    await page.save();
    page.setAuthor(user);
    res.redirect(`./${page.slug}`);
  } catch (error) {
    next(error);
  }
});


