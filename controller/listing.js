const Listing = require("../models/listing")
const Review = require('../models/review')

// Get all listing 
module.exports.AllListings = async (req, res) => {
  const AllListings = await Listing.find({})
  res.render('listings/index.ejs', { AllListings })
}

//Create new listing
module.exports.newListing = (req, res) => {
  // if(!req.isAuthenticated()){
  //   req.flash("success","For create listing user must be loggedIn")
  //   res.redirect('/login')
  // }
  res.render("listings/createListing.ejs");
}
// show listing

module.exports.showListing = async (req, res) => {
  let { id } = req.params
  let listing = await Listing.findById(id)
    .populate({
      path: 'reviews',
      populate: {
        path: 'author',
      },
    })
    .populate('owner')

  if (!listing) {
    req.flash("error", "Those of the listing you search doesn't axist");
    res.redirect('/listings')
  }
  res.render("listings/showlisting", { listing });
}

//  Add New Listing 
module.exports.AddListing = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }
  let url = req.file.path;
  let filename = req.file.filename
  const newlisting = new Listing(req.body.listing)
  newlisting.image = { url, filename }  
  newlisting.owner = req.user._id;
  await newlisting.save()
  req.flash("success", "New Listing Created Successfull")
  res.redirect('/listings')

  // let {title,description,image,price,country} = req.body
  //  let listing = await req.body.listing;
  // if(!req.body.listing){
  //   throw new ExpressError(400, "Please send valid data for listing");
  // }
}

// Edit Listing
module.exports.EditListing = async (req, res) => {
  // if(!req.isAuthenticated()){
  //   req.flash("success", "For edit must be logged In")
  //   res.redirect('/login')
  // }
  let { id } = req.params;
  const listing = await Listing.findById(id)
  if (!listing) {
    req.flash("error", "Listing is not avalable which you want to edit")
    res.redirect('/listings')
  }
   let listingUrl = listing.image.url 
   let OriginalUrl = listingUrl.replace("/upload", "/upload/w_300")
 res.render('listings/edit', { listing, OriginalUrl })
}

// update Listing
module.exports.UpdateListing = async (req, res) => {
  // if(!req.body.listing){
  //   throw new ExpressError(400, "send valid data for update")
  // }
  let { id } = req.params
  let listing =  await Listing.findByIdAndUpdate(id, req.body.listing)
  if(typeof req.file != "undefined"){
    let url = req.file.path ;
    let filename = req.file.filename ;
     listing.image= {url , filename}
    await listing.save();
  }
  req.flash("success", "Listing Update successfull")
  res.redirect(`/listings/${id}`);
}  