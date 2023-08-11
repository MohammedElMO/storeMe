import { Router } from "express"
import { userModel } from "../db/dbSchema/model-schema.js"
import { ApiServer } from "../api/server-api.js"
import { validateSchema } from "../utils/genreValidator.js"
import { userJoiSchema } from "./schema/user.js"
import _ from "lodash"
import bcrypt from "bcrypt"
import isAuthentified from "../controllers/middlewares/authentification.js"

const userRouter = Router()

function hashUserPassCode(password) {
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

userRouter.get("/username", isAuthentified, async (req, res) => {
  const Authuser = await ApiServer("users", userModel).getUnique(
    req.userTokenValid._id
    
  )
  res.send(Authuser)
})
userRouter.get("/", async (_, res) => {
  const users = await ApiServer("users", userModel).getAll()
  res.send(users)
})

userRouter.post("/", async (req, res) => {
  const err = validateSchema(req.body, userJoiSchema)
  if (err) return res.status(400).send(err.message)
  const isAlreadyInUsers = await ApiServer("users", userModel).getOne({
    email: req.body.email,
  })
  if (isAlreadyInUsers) return res.status(403).send("already used email")
  const hashedPass = hashUserPassCode(req.body.password)
  let user = await ApiServer("users", userModel).post({
    password: hashedPass,
    name: req.body.name,
    email: req.body.email,
  })
  const withOutPassCode = _.pick(user, ["name", "email", "_id"])
  const token = user.gerenateAuthToken()
  res.header("x-auth-user", token).send(withOutPassCode)
})

export { userRouter }
