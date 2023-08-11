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
MiddlerWares(app)

app.listen(3001, () => logger.info("Port 3000 is ready..."))
})()