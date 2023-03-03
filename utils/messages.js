const NEED_AUTH = 'Необходима авторизация';
const ERROR_ON_SERVER = 'На сервере произошла ошибка';
const MOVIE_VALIDATION_ERROR = 'Переданы некорректные данные при создании фильма';
const MOVIE_NOT_FOUND = 'Фильм с указанным _id не найден';
const MOVIE_DELETE_ACCESS_DENIED = 'Можно удалять только свои фильмы';
const INCORRECT_MOVIE_ID = 'Передан некорректный _id фильма';
const USER_NOT_FOUND = 'Пользователь по указанному _id не найден';
const INCORRECT_USER_DATA = 'Переданы некорректные данные при обновлении профиля';
const EMAIL_ALREADY_EXIST = 'Пользователь с таким email уже зарегистрирован';
const EMAIL_AND_PASSWORD_NOT_FOUND = 'Пользователь с такой парой email - пароль не найден';

module.exports = {
  NEED_AUTH,
  ERROR_ON_SERVER,
  MOVIE_VALIDATION_ERROR,
  MOVIE_NOT_FOUND,
  MOVIE_DELETE_ACCESS_DENIED,
  INCORRECT_MOVIE_ID,
  USER_NOT_FOUND,
  INCORRECT_USER_DATA,
  EMAIL_ALREADY_EXIST,
  EMAIL_AND_PASSWORD_NOT_FOUND,
};
