const Review = require('../models/review')
const Listing = require("../models/listing")

module.exports.writeReview = async(req, res)=>{
   
    let {id} = req.params;
    let listingReview = await Listing.findById(id)
    let newreview = new Review(req.body.review)
    newreview.author = req.user._id ;
    listingReview.reviews.push(newreview)
    await newreview.save()
    await listingReview.save()
    req.flash("success", " Thanks for Review ")
   res.redirect(`/listings/${id}`)
}
module.exports.deleteReview = async(req, res)=>{
    let {id,reviewId} = req.params
    await Listing.findByIdAndUpdate(id,{$pull:{reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Delete successfull")
    res.redirect(`/listings/${id}`)
}