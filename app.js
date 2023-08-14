const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');

require('dotenv').config();

const router = require('./routes/index');
const serverErrorHandler = require('./middlewares/serverErrorHandler');

const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const limiter = require('./utils/rateLimiter');

const { DEV_DATABASE_NAME } = require('./config');

const { NODE_ENV, DATABASE } = process.env;

mongoose.connect(`mongodb://${NODE_ENV === 'production' ? DATABASE : DEV_DATABASE_NAME}`, {
  useNewUrlParser: true,
});

const app = express();

const { PORT = 8080 } = process.env;

app.use(cors);

app.use(requestLogger);

app.use(errorLogger);

app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use('/', router);

app.use(errors());
app.use(serverErrorHandler);

app.listen(PORT);
