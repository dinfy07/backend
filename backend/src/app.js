import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes.js'
import alumniRoutes from './routes/alumni.routes.js'
import userRoutes from './routes/user.routes.js'

const app = express()

const allowedOrigins = [
  "http://localhost:5173",
  "https://backend-j984.onrender.com"
]


app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }
    // ❗ НЕ блокируем
    return callback(null, true)
  },
  credentials: true,
}))
app.options(/.*/, cors())

app.use(cookieParser())

app.use(express.json())

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/alumni', alumniRoutes)
app.use('/api/v1/user', userRoutes)

export default app
