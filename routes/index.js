const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const {
  login, createUser,
} = require('../controllers/users');
const {
  signInValidation, signUpValidation,
} = require('../validation/auth');

const auth = require('../middlewares/auth');

router.post('/signin', signInValidation, login);

router.post('/signup', signUpValidation, createUser);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

module.exports = router;
