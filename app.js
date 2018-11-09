const express = require('express');
const morgan = require('morgan');

let app = express();

app.use(morgan('dev'));


app.get('/', (req, res, next) => {
  try {
    res.send('Hello World!');
  } catch (error) {
    next(error);
  }
});
