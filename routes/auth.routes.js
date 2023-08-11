import { Router } from "express"
import { userModel } from "../db/dbSchema/model-schema.js"
import { ApiServer } from "../api/server-api.js"
import { validateSchema } from "../utils/genreValidator.js"
import { userJoiSchema } from "./schema/user.js"
import _ from "lodash"
import bcrypt from "bcrypt"
import { authJoiSchema } from "./schema/auth.js"
const auth = Router()

function hashUserPassCode(password, enc = "", state = "hashing") {
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  if (state === "decrepting") {
    const compare = bcrypt.compareSync(password, enc)
    return compare
  }
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

auth.get("/", async (_, res) => {
  const users = await ApiServer("users", userModel).getAll()
  res.send(users)
})

auth.post("/", async (req, res) => {
  const err = validateSchema(req.body, authJoiSchema)
  if (err) return res.status(400).send(err.message)
  const isAlreadyInUsers = await ApiServer("users", userModel).getOne({
    email: req.body.email,
  })
  if (!isAlreadyInUsers)
    return res.status(403).send("you Register before Login")

  const hash = await ApiServer("users", userModel).getOne({
    email: req.body.email,
  })
  const isTheSame = hashUserPassCode(
    req.body.password,
    hash.password,
    "decrepting"    
  )
  if (!isTheSame) return res.status(403).send("this is a wrong password")
  const token = user.gerenateAuthToken()

  res.send(token)
})

export { auth }
