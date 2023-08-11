import { logger } from "../../handleErr/logger.js"

export default function errorHandler(err, req, res, next) {
  logger.error(err.message)
  res.status(500).send("server crash")
}
