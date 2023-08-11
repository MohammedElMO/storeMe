import Joi from "joi"

// new JoiID(Joi).objectId
export const schemaRental = Joi.object({
  customerId: Joi.string().required(),
  movieId: Joi.string().required(),
})
