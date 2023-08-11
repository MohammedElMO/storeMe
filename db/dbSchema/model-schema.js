import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import "dotenv/config"
export const genresSchema = new mongoose.Schema({
  typeTags: {
    type: String,
    required: true,
  },
})

export const customersSchema = new mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  isGold: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    minLength: 3,
  },
  phone: {
    type: Number,
  },
})

export const movieSchema = new mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  title: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
  },
  genre: {
    type: genresSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  DailyRentalRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
})

const parcialCustomorSchema = new mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    minLength: 3,
  },
  phone: {
    type: Number,
  },
})

const parcialMovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
  },
  DailyRentalRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
})

export const rentalSchema = {
  customer: {
    type: parcialCustomorSchema,
    required: true,
  },
  movie: {
    type: parcialMovieSchema,
    required: true,
  },
  dateOut: {
    type: Date,
    default: () => Date.now(),
    required: true,
  },
  dateReturned: {
    type: Date,
  },
  rentalFree: {
    type: Number,
    min: 0,
  },
}

export const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: [5, "the name should be longer that 5 chars"],
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin:Boolean
})
usersSchema.methods.gerenateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      isAdmin:this.isAdmin
    },
    process.env.JWT_WEB_SECRT
  )
}

export const genresModel = (collection) =>
  new mongoose.model(collection, genresSchema)
export const customerModel = (collection) =>
  new mongoose.model(collection, customersSchema)
export const movieModel = (collection) =>
  new mongoose.model(collection, movieSchema)
export const rentalModel = (collection) =>
  new mongoose.model(collection, rentalSchema)
export const parcialMovieModel = (collection) =>
  new mongoose.model(collection, parcialMovieSchema)
export const userModel = (collection) =>
  new mongoose.model(collection, usersSchema)
