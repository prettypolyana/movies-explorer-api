const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

const { CREATED_STATUS_CODE } = require('../utils/constants');

const {
  USER_NOT_FOUND,
  INCORRECT_USER_DATA,
  EMAIL_ALREADY_EXIST,
  EMAIL_AND_PASSWORD_NOT_FOUND,
} = require('../utils/messages');

const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const AlreadyExistError = require('../errors/AlreadyExistError');

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND);
      } else {
        res.send(user);
      }
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(INCORRECT_USER_DATA));
      } else if (err.code === 11000) {
        next(new AlreadyExistError(EMAIL_ALREADY_EXIST));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      const userObject = user.toObject();
      delete userObject.password;
      return res.status(CREATED_STATUS_CODE).send(userObject);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(INCORRECT_USER_DATA));
      } else if (err.code === 11000) {
        next(new AlreadyExistError(EMAIL_AND_PASSWORD_NOT_FOUND));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(EMAIL_AND_PASSWORD_NOT_FOUND);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(EMAIL_AND_PASSWORD_NOT_FOUND);
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'fc18de59891ccd9727644160e4ba4b6d13326721365ab1dc9a458c009eed3681',
            { expiresIn: '7d' },
          );
          return res.send({ token });
        });
    })
    .catch(next);
};

module.exports = {
  getUserInfo,
  updateUserInfo,
  createUser,
  login,
};
