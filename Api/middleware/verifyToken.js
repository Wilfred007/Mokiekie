// middleware/verifyToken.js
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export default function verifyToken(req, res, next) {
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.split(' ')[1] : null
  if (!token) return res.status(401).json({ message: 'No token provided' })

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = payload.id // or payload.userId depending on your auth
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}
