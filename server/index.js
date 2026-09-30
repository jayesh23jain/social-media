import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const app = express()

// const port = 8085

dotenv.config()

mongoose.connect(process.env.url).then(()=> {
    console.log("Db connected")
}).catch((err) => {
    console.log(err)
})

app.get('/' , (req , res) => {
    res.send('Server hello')
})


app.listen(8085 , ()=>{
    console.log("server started")
})