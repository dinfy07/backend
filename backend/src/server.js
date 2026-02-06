import mongoose from 'mongoose'
import dotenv from 'dotenv'
import app from './app.js'
import bootstrapAdmin from './utils/bootstrapAdmin.js'
import cors from 'cors';

dotenv.config()

app.use(cors({
  origin: [
    "http://localhost:5173",                 // локальный фронт
    "https://backend-j984.onrender.com"      // фронт на Render
  ],
  credentials: true
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
