


import Joi from "joi";
export const authJoiSchema = Joi.object({
  password: Joi.string().min(5).max(100).required(),
  email: Joi.string().min(25).required(),

});
