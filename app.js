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


app.listen(3000, () => {
  console.log('connected on port 3000');
});
