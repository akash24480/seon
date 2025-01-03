
import express, { urlencoded } from 'express'
import morgan from "morgan"
import connect from "./db/db.js"
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRoutes from './routes/user.route.js'
import projectRoutes from './routes/project.route.js'
import aiRoutes from './routes/ai.routes.js'

const app = express()

connect()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended : true}))
app.use(cookieParser())

app.use('/users', userRoutes)
app.use('/projects', projectRoutes)
app.use('/ai', aiRoutes)



app.get('/', (req,res) => {
    res.send('Hello World')
})

export default app;