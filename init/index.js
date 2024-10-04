const mongoose = require('mongoose')
const initData = require('./data')
const Listing = require('../models/listing')

main().then((res)=>{console.log("connected to Db")})
.catch(err =>{console.log(err)})

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Go');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}       

const initDb = async () => {
    await Listing.deleteMany({})

  const initializeData = initData.data.map((obj) =>({...obj , owner : "66f2c683e06c5ed9a1d5c0b1" } ) )
    await Listing.insertMany(initializeData )
  
    console.log(" initialize Db ");
};
initDb();

