require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const { Joi, celebrate, } = require('celebrate');
const router = require('./routes/index.js');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT } = process.env;
const app = express();

const mongoDBUrl = 'mongodb://localhost:27017/mestodb';
const mongoDBOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
  }),
}), createUser);

app.use(auth);

app.use('/', router);

mongoose.connect(mongoDBUrl, mongoDBOptions);

app.use((err, req, res, next) => {
  const status = err.status || 500; res.status(status);
  const error = err.message;
  res.status(status).send(error);
  next();
});
app.listen(PORT, () => console.log('SERVER IS RUNNING'));
