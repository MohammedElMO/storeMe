import express from "express"
import { ApiServer } from "../api/server-api.js"
import isAuthentified from "../controllers/middlewares/authentification.js"
import { validateSchema } from "../utils/genreValidator.js"
import { schema } from "./schema/genre.js"
import { genresModel } from "../db/dbSchema/model-schema.js"
import isAdmin from "../controllers/middlewares/adminAuth.js"
import { getAllGenres } from "../controllers/genresController.js"

const genresRouter = express.Router()

genresRouter.get("/",getAllGenres)
 
genresRouter.post("/", async (req, res) => {
  const error = validateSchema(req.body, schema)
  if (error) return res.status(400).send(error.message)
  const postedGenre = await ApiServer("genres", genresModel).post(req.body)
  res.send(postedGenre)
})

genresRouter.delete("/:id", [isAuthentified, isAdmin], async (req, res) => {
  const deletedGenre = await ApiServer("genres", genresModel).delete(
    req.params.id
  )
  if (!deletedGenre)
    return res.status(404).send("the geres with that id doesn't exist ")
  res.send(deletedGenre)
})

genresRouter.put("/:id", isAuthentified, async (req, res) => {
  const isNotValidGenre = validateSchema(req.body, schema)
  if (isNotValidGenre)
    return res.status(400).send(isNotValidGenre.details[0].message)
  const updatedGenre = await ApiServer("genres", genresModel).update(
    req.params.id,
    req.query?.value
  )
  if (!updatedGenre)
    return res.status(404).send("the genre with that id doesn't exist ")
  res.send(updatedGenre)
})

genresRouter.get("/:id", async (req, res) => {
  const uniqueGenre = await ApiServer("genres", genresModel).getUnique(
    req.params.id
  )
  console.log(uniqueGenre)
  if (!uniqueGenre)
    return res.status(404).send("the geres with that id doesn't exist ")
  res.send(uniqueGenre)
})

export default genresRouter
