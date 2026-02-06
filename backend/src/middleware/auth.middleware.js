import jwt from 'jsonwebtoken'

export default function auth(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.sendStatus(401)

  const token = authHeader.split(' ')[1]

  try {
    const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    req.user = user
    next()
  } catch {
    res.sendStatus(401)
  }
}
