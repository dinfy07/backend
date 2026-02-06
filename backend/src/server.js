import mongoose from 'mongoose'
import dotenv from 'dotenv'
import app from './app.js'
import bootstrapAdmin from './utils/bootstrapAdmin.js'
import cors from 'cors';

dotenv.config()

const allowedOrigins = [
  "http://localhost:5173",
  "https://backend-j984.onrender.com"
]
app.use(cors({
  origin: (origin, callback) => {
    // разрешаем запросы без origin (Postman, server-to-server)
    if (!origin) return callback(null, true)

    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    // ❗ ВАЖНО: НЕ error
    return callback(null, false)
  },
  credentials: true,
}))

mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log('MongoDB connected')

    await bootstrapAdmin() // 👈 ВАЖНО

    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`)
    })
  })
  .catch(err => console.error('Mongo error:', err))
