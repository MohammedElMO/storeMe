

import Joi from "joi";
export const userJoiSchema = Joi.object({
  name: Joi.string().min(5).max(100).required(),
  email: Joi.string().min(25).required(),
  password: Joi.string().min(5).max(100).required(),
});
