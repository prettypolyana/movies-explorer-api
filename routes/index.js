const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const {
  login, createUser,
} = require('../controllers/users');
const {
  signInValidation, signUpValidation,
} = require('../validation/auth');
const NotFoundError = require('../errors/NotFoundError');

const auth = require('../middlewares/auth');

router.post('/signin', signInValidation, login);
router.post('/signup', signUpValidation, createUser);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Адреса не существует'));
});

module.exports = router;
