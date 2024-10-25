const mongoose = require("mongoose");
const Review = require("./review");

const Schema = mongoose.Schema;
const ListingSchema = new Schema({
    title : String,
    description : String ,
    image : {
        url : String,
        filename : String,
          
    },
    price : Number ,
    location : String ,
    country : String ,
    reviews :[{
        type: Schema.Types.ObjectId ,
        ref : "Review" ,
    }] , 
    owner : {
        type : Schema.Types.ObjectId ,
        ref : "User"
    },
    category : [{
        type : String ,
        enum : ["trending", "amazingView", "castel", "iconicCitys", "mountainCitys", "tropical", "amazingPools", "beachfront", "Lakefront", "treehouse", "hospitals", ],
    }],

})
// Delete all review related to listing

ListingSchema.post("findOneAndDelete", async (listing)=>{
  if(listing){
  await  Review.deleteMany({_id : { $in : listing.reviews }})
  } 
})
const Listings = mongoose.model('Listing', ListingSchema)
module.exports = Listings ;
// image from unsplash
 