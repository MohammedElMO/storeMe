import express from "express"
import "dotenv/config"
import "./db/connection.js"
import MiddlerWares from "./routes-despatcher/routes.js"
import DBConnection from "./db/connection.js"
import logExecptions, { logger } from "./handleErr/logger.js"

logExecptions()
;(async function () {
  DBConnection()
  const app = express()
  app.get('/',(req,res) => res.send("WELCOME HOME BRO"))
  MiddlerWares(app)

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => logger.info("Port 3000 is ready..."))
})()
