import { ApiServer } from "../api/server-api.js"
import { genresModel } from "../db/dbSchema/model-schema.js"

export const getAllGenres = async (req, res, next) => {

  try {
    const genres = await ApiServer("genres", genresModel).getAll()
    res.send(genres)
  } catch (ex) {
    next(ex)
  }
}
