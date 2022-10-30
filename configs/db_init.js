let mongoose = require('mongoose')
let dotenv = require('dotenv')

dotenv.config()

mongoose.connect(process.env.DB_URL,{},()=>console.log('database connected successfully'))