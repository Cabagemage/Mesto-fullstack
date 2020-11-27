const express = require('express');
const app = express();
const router = require('express').Router();
const NotFound = require('../utils/Errors/NotFound');
const userRouter = require('./users.js')
const cardsRouter = require('./cards.js')
const { requestLogger, errorLogger } = require('../middlewares/logger');
const { errors } = require('celebrate');
app.use(requestLogger)
router.use('/users', userRouter);
router.use('/cards', cardsRouter);


router.use('*', (req, res, next) => {
  const error = new NotFound('Страницы не существует')
  res.send(error);
  next(error);
});
router.use(errors())
app.use(errorLogger);

module.exports = router;
