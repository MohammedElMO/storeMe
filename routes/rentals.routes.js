import express from "express"
import {
  customerModel,
  movieModel,
  parcialMovieModel,
  rentalModel,
} from "../db/dbSchema/model-schema.js"
import { ApiServer } from "../api/server-api.js"
import { schemaRental } from "./schema/rental.js"
import { validateSchema } from "../utils/genreValidator.js"
import Fawn from "fawn"
import mongoose from "mongoose"
import isAuthentified from "../controllers/middlewares/authentification.js"
import isAdmin from "../controllers/middlewares/adminAuth.js"

const rentelRouter = express.Router()

rentelRouter.get("/", async (req, res) => {
  const rentals = await ApiServer("rentals", rentalModel).getAll("dateOut")

  res.send(rentals)
})

rentelRouter.post("/",isAdmin, async (req, res) => {
  console.log("hited")
  const err = validateSchema(
    { customerId: req.body.customerId, movieId: req.body.movieId },
    schemaRental
  )
  if (err) return res.status(400).send(err.message)
  const isRenting = await ApiServer("customers", customerModel).getUnique(
    req.body.customerId
  )
  const hasMovieRent = await ApiServer("movies", parcialMovieModel).getUnique(
    req.body.movieId
  )
  if (!hasMovieRent)
    return res.status(404).send("there is no rented Movie with this Id")

  if (!isRenting)
    return res.status(404).send("there is no customer with this Id has a rent")
  if (hasMovieRent.numberInStock === 0)
    return res.status(404).send("the movie with this Id Is Not In Stock")

  let rentel = rentalModel("rentels")({
    ...req.body,
    customer: {
      _id: isRenting._id,
      isGold: isRenting.isGold,
      name: isRenting.name,
      phone: isRenting.phone,
    },
    movie: {
      _id: hasMovieRent._id,
      DailyRentalRate: hasMovieRent.DailyRentalRate,
      title: hasMovieRent.title,
    },
  })
  const session = await new mongoose.startSession()
  session.startTransaction()
  try {
    await rentel.save()
    await hasMovieRent.updateOne(
      {
        $inc: {
          numberInStock: -1,
        },
      },
      { session }
    )
    session.endSession()
    res.send(rentel)
  } catch (e) {
    await session.abortTransaction()
    session.endSession()
    res.sendStatus(500)
    console.log(e.message)
  }
})

export { rentelRouter }
