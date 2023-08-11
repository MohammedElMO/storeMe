import winston from "winston"
// import "winston-mongodb"
export const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      consoleWarnLevels: ["info", "warn", "bug", "error"],
    }),
    // new winston.transports.MongoDB({
    //   db: process.env.MONGOOSE_DB_HOST + "videly",
    //   level: "info",
    // }),
    new winston.transports.File({ filename: "log/exceptions.log" }),
    new winston.transports.File({ filename: "log/rejections.log" }),
    new winston.transports.File({ filename: "log/error.log", level: "error" }),
    new winston.transports.File({ filename: "log/info.log", level: "info" }),
  ],
})

export default function logExecptions() {
  logger.rejections.catcher
  logger.exceptions.catcher
}
