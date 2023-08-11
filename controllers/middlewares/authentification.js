import jwt from "jsonwebtoken"

export default function isAuthentified(req, res, next) {
  const token = req.header("x-auth-user")
  if (!token) return res.status(401).send("no Token is Provided !!")

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_WEB_SECRT)
    req.userTokenValid = decodedToken
    next()
  } catch (exception) {
    res.status(400).send(exception.message)
  }
}
