const express = require('express')
const express = require('express')
const user = require('../model/user')
const admin = require('../model/admin')
const app = express()
const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Go');
    
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }       

  app.get('/c',(req, res)=>{

  })
  app.get('/admin', (req, res){
    c
  })

 app.listen(8080, ()=>{
    console.log("server created successfull")

 }) 