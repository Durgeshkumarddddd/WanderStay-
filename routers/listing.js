const express = require('express')
const router = express.Router();
const Listing = require("../models/listing")
const wrapAsync = require('../ErrorHandler/wrapAsync')
const { listingSchema } = require('../Schema');
const { isLoggedIn, isOwner } = require('../middleware');
const listingCont = require('../controller/listing');
const path = require("path");
const multer = require('multer');  // Correctly require the module
const { storage } = require('../cloudConfig')
const upload = multer({ storage })

const validatelisting = (req, res, next) => {
  let { error } = listingSchema.validate(req.body)
  if (error) {
    let ErrMsg = error.details.map(e => e.message).join(",")
    throw new ExpressError(400, ErrMsg)
  }
  else {
    next();
  }
}

//Get all listing  
router.get('/', wrapAsync(listingCont.AllListings));

//Create new listing
router.get('/new', isLoggedIn, listingCont.newListing)

//create new Listing
router.post('/', isLoggedIn, upload.single('listing[image]'), validatelisting, wrapAsync(listingCont.AddListing))

// Show Listing details
router.get('/:id', wrapAsync(listingCont.showListing))

// wrapAsync(listingCont.AddListing)
// Edit route
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingCont.EditListing))
// Updated Listing
router.put('/:id',upload.single('listing[image]'), validatelisting, wrapAsync(listingCont.UpdateListing));

// Delete Route
router.delete('/:id', isLoggedIn, isOwner, wrapAsync(listingCont.DeleteListing))

module.exports = router;