
export default function isAdmin(req, res, next) {
  const AdminToken = req.userTokenValid
  if (!AdminToken) return res.status(403).staus("not an admin")

  next()
}
