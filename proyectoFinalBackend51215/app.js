const express=require('express')
require('dotenv').config()
const indexRouter=require('./src/routes/indexRouter')
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(indexRouter)

module.exports=app