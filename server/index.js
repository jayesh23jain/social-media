import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
        origin : "http://localhost:5173",
        credentials : true,
        methods : ['GET' , 'POST' , 'PUT' , 'DELETE'],
    }
))

// const port = 8085

dotenv.config()

mongoose.connect(process.env.url).then(()=> {
    console.log("Db connected")
}).catch((err) => {
    console.log(err)
})

app.use('/users' , userRoutes)

app.get('/' , (req , res) => {
    res.send('Server hello')
})


app.listen(8085 , ()=>{
    console.log("server started")
})