const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : String,
    username : String,
    email : String,
})
module.exports = mongoose.model('User', userSchema)