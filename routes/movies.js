const router = require('express').Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../validation/movies');

router.get('/', getMovies);
router.post('/', createMovieValidation, createMovie);

router.delete('/:_id', deleteMovieValidation, deleteMovie);

module.exports = router;
