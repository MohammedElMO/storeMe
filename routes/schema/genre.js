import Joi from "joi";
export const schema = Joi.object({
  typeTags: Joi.string().required(),
});
