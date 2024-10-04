/* review- star, comment , createdAt, */
const mongoose = require('mongoose')
const { min, max } = require('../Schema')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({ 
rating : {
 type : Number,
 min : 1,
 max : 5 
 } ,
   comment : {
    type : String ,
    require : true
   },
   author : {
    type : Schema.Types.ObjectId,
    ref : 'User'
   },
   createdAt : {
    type : Date ,
    default : Date.now()
   }
})
module.exports = mongoose.model('Review', ReviewSchema)