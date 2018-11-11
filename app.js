const express = require('express');
const volleyball = require('volleyball');
const views = require('./views/index');
const { db, Page } = require('./models');
const path = require('path');


let app = express();
let port = 3000;

app.use(volleyball);
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/users', require('./routes/user.js'));
app.use('/wiki', require('./routes/wiki.js'));

const init = async () => {
  try {
    await db.sync();
    app.listen(port, () => {
      console.log(`connected to server on port ${port}`);
    });
  } catch (error) {
    console.error('init error: ', error);
  }
}

app.get('/', async (req, res, next) => {
  try {
    const allPages = await Page.findAll();
    res.send(await views.main(allPages));
  } catch (error) {
    next(error);
  }
});

app.get('/:notfound', (req, res, next) => {
  res.status(404).send(views.noPage('Invalid URL'));
});

db.authenticate().
  then(() => {
    console.log('connected to the database');
  });


init();
