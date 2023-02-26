const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

require('dotenv').config();

const router = require('./routes/index');
const serverErrorHandler = require('./middlewares/serverErrorHandler');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFoundError = require('./errors/NotFoundError');

const { NODE_ENV, DATABASE } = process.env;

mongoose.connect(`mongodb://${NODE_ENV === 'production' ? DATABASE : 'localhost:27017/bitfilmsdb'}`, {
  useNewUrlParser: true,
});

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);

app.use((req, res, next) => {
  next(new NotFoundError('Адреса не существует'));
});

app.use(errors());
app.use(serverErrorHandler);

app.listen(PORT);
