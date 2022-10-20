const Joi = require("joi");

const id = Joi.number().integer();
const fullname = Joi.string();
const email = Joi.string();
const password = Joi.string();

const createUserSchema = Joi.object({
  fullname: fullname.required(),
  email: email.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  fullname: fullname,
  email: email,
  password: password,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
};
