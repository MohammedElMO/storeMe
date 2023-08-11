import express from "express";
import { ApiServer } from "../api/server-api.js";
import { validateSchema } from "../utils/genreValidator.js";
import { schemaCustomer } from "./schema/customer.js";
import { movieModel, genresModel } from "../db/dbSchema/model-schema.js";
import isAuthentified from "../controllers/middlewares/authentification.js"
import isAdmin from "../controllers/middlewares/adminAuth.js"
const movieRouter = express.Router();

movieRouter.get("/", async (req, res) => {
  const movies = await ApiServer("movies", movieModel).getAll();
  res.send(movies);
});

movieRouter.post("/",isAuthentified, async (req, res) => {
  //   const error = validateSchema(req.body, schemaCustomer);
  //   if (error) return res.status(400).send(error.message);
  const genre = await await ApiServer("genres", genresModel).getUnique(
    req.body.genreId
  );
  if (!genre) return res.status(400).send("no Genre with this Id is Found");

  const movie = await ApiServer("movies", movieModel).post({
      ...req.body,
    genre: {
      _id: genre.genreId,
      typeTags: genre.typeTags,
    },
  });
  res.send(movie);
});

movieRouter.delete("/:id",isAdmin, async (req, res) => {
  const movie = await ApiServer("movies", movieModel).delete(req.params.id);
  console.log(movie);
  if (!movie)
    return res.status(404).send("the geres with that id doesn't exist ");
  res.send(movie);
});

movieRouter.put("/:id",isAdmin, async (req, res) => {
  const movie = await ApiServer("movies", movieModel).update(
    req.params.id,
    req.query?.value
  );
  if (!movie)
    return res.status(404).send("the genre with that id doesn't exist ");
  res.send(movie);
});

movieRouter.get("/:id", async (req, res) => {
  const movie = await ApiServer("movies", movieModel).getUnique(req.params.id);
  console.log(movie);
  if (!movie)
    return res.status(404).send("the geres with that id doesn't exist ");
  res.send(movie);
});

export { movieRouter };
