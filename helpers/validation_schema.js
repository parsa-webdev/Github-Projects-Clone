const Joi = require("@hapi/joi");

const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
});

const projectSchema = Joi.object({
  title: Joi.string().required(),
});

const taskSchema = Joi.object({
  note: Joi.string().required(),
  status: Joi.string().required(),
});

const editTaskSchema = Joi.object({
  status: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  projectSchema,
  taskSchema,
  editTaskSchema,
};
