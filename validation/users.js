const { celebrate, Joi } = require('celebrate');

const updateMeValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports = { updateMeValidation };
