const Movie = require('../models/movie');

const { CREATED_STATUS_CODE } = require('../utils/constants');

const {
  MOVIE_VALIDATION_ERROR,
  MOVIE_NOT_FOUND,
  MOVIE_DELETE_ACCESS_DENIED,
  INCORRECT_MOVIE_ID,
} = require('../utils/messages');

const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const AccessDeniedError = require('../errors/AccessDeniedError');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate(['owner'])
    .then((movies) => res.send(movies))
    .catch((err) => {
      next(next(err));
    });
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => movie.populate(['owner']))
    .then((movie) => res.status(CREATED_STATUS_CODE).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(MOVIE_VALIDATION_ERROR));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .populate(['owner'])
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MOVIE_NOT_FOUND);
      } else if (req.user._id !== movie.owner._id.toString()) {
        throw new AccessDeniedError(MOVIE_DELETE_ACCESS_DENIED);
      } else {
        movie.remove()
          .then(() => {
            res.send(movie);
          })
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(INCORRECT_MOVIE_ID));
      } else {
        next(err);
      }
    });
};

module.exports = { getMovies, createMovie, deleteMovie };
