import Joi from "joi";
export const schemaCustomer = Joi.object({
  name: Joi.string().required(),
  isGold: Joi.boolean(),
  phone: Joi.number().required(),
});
