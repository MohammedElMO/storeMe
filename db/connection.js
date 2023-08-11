import mongoose from "mongoose"
import { logger } from "../handleErr/logger.js"

export default function Db() {
  mongoose
    .connect(process.env.MONGOOSE_DB_HOST + "", {
      useUnifiedTopology: true,
    })
    .then(() => logger.info("connection to mongodb on the vidly Db..."))
}
