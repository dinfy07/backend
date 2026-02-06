import mongoose from 'mongoose'
import dotenv from 'dotenv'
import app from './app.js'
import bootstrapAdmin from './utils/bootstrapAdmin.js'
import cors from 'cors';

dotenv.config()
console.log("🔥🔥🔥 THIS IS NEW BACKEND BUILD 🔥🔥🔥")


app.use(cors({
  origin: true,
  credentials: true
}))

console.log("🔥 CORS ORIGINS:", process.env.NODE_ENV)

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
