// import express server, and types
import express, { Application, Request, Response } from 'express'

// import dependencies
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
// import cloudinary from "./config/setCloudinary";

//other components imports
import connectDB from './config/db'
import dev from './config'
import customerRouter from './routers/customersRoutes'
import categoryRouter from './routers/catigoriesRoutes'

// use Application type from express
const app: Application = express()

//to use dependencies
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Server is running ',
  })
})

app.use('/api/v1/customers', customerRouter)
app.use('/api/v1/categories', categoryRouter)

const PORT = dev.app.serverPort

app.listen(PORT, async () => {
  console.log('Server is OK')
  await connectDB()
})

// TODO use express-rate-limit lesson 56. time 10.30
