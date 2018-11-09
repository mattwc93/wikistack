const express = require('express');
const morgan = require('morgan');
const views = require('./views/index');
const layout = require('./views/layout');
const { db } = require('./models');
const path = require('path');

let app = express();
let port = 3000;

app.use(morgan('dev'));
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

app.get('/', (req, res, next) => {
  try {
    res.send(layout('Hello World!'));
  } catch (error) {
    next(error);
  }
});

db.authenticate().
  then(() => {
    console.log('connected to the database');
  });


init();
