const { DEFAULT_ERROR_CODE } = require('../utils/constants');

const ERROR_ON_SERVER = require('../utils/constants');

const serverErrorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === DEFAULT_ERROR_CODE
        ? ERROR_ON_SERVER
        : message,
    });

  next();
};

module.exports = serverErrorHandler;
