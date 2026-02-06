import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes.js'
import alumniRoutes from './routes/alumni.routes.js'
import userRoutes from './routes/user.routes.js'

const app = express()


app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/alumni', alumniRoutes)
app.use('/api/v1/user', userRoutes)

export default app
