import mongoose from "mongoose"
import { logger } from "../handleErr/logger.js"

export default function Db() {
  mongoose
    .connect(process.env.MONGODB_CONNECTION)
    .then(() => console.log('Running...'))
}
