import { userRouter } from "../routes/users.routes.js"
import { customerRoute } from "../routes/customers.routes.js"
import { auth } from "../routes/auth.routes.js"
import { rentelRouter } from "../routes/rentals.routes.js"
import { movieRouter } from "../routes/movies.routes.js"
import genresRouter from "../routes/genres.routes.js"
import errorHandler from "../controllers/middlewares/error.js"
import { json } from "express"
import helmet from "helmet"
import compression from "compression"

export default function MiddlerWares(app) {
  app.use(json())
  app.use("/api/auth", auth)
  app.use("/api/users", userRouter)
  app.use("/api/customers", customerRoute)
  app.use("/api/genres", genresRouter)
  app.use("/api/movies", movieRouter)
  app.use("/api/rentals", rentelRouter)
  app.use(errorHandler)
  app.user(helmet())
  app.user(compression())
}
