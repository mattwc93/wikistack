const router = require('express').Router();
const { Page, User } = require('../models');
const { userPages, userList, noPage } = require('../views')

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({order:[['name', 'ASC']]});
    res.send(userList(users));
  } catch (error) {
    next(error);
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    const pages = await Page.findAll({ where: { authorId: req.params.userId } });
    res.send(userPages(user, pages));
  } catch (error) {
    next(error);
  }
});

router.get('/:userId/delete', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    const pages = await Page.findAll({ where: { authorId: req.params.userId } });
    if(pages.length === 0) await user.destroy();
    else res.status(404).send(noPage('Cannot Delete a User until all posts are deleted first!'));
    res.redirect('/users');
  } catch (error) {
    res.status(404).send(noPage('Delete failed!'));
  }
});