import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()
import cookieParser from 'cookie-parser'
import cors from 'cors'
import productRouter from './src/routes/products.routes.js'
import authRouter from './src/routes/auth.routes.js'


// MiddleWares
app.set('PORT', process.env.PORT || 4000)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
  origin: ['http://localhost:5173', 'https://app-cocoa.vercel.app', 'https://cafeteria-cocoa.vercel.app', 'https://cafeteria-cocoa.onrender.com' ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}))
app.use(cookieParser())
app.use('/api', productRouter)
app.use('/api', authRouter)

export default app