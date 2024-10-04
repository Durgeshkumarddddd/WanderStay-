const Listing = require("./models/listing.js");
const ExpressError = require("./ErrorHandler/expressError");
const { reviewSchema } = require("./Schema");
const { listingSchema } = require("./Schema");
const Review = require("./models/review.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be loggedIn");
    return res.redirect("/login");
  }
  next();
};
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  try {
    let listing = await Listing.findById(id);
    if (!listing.owner.equals(res.locals.currUser._id)) {
      req.flash("error", "You have not permission to edit only owner can edit");
      return res.redirect(`/listings/${id}`);
    }
    next();
  } catch (error) {
    console.error(error);
    req.flash("error", "Listing not found");
    return res.redirect(`/listings`); // Stop execution on error
  }
};
// Server side validation of create listing Joi all field not fill in create route

// Authorization of review
module.exports.isreviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  if (!res.locals.currUser) {
    req.flash("error", "You are not login ");
    return res.redirect(`/listings/${id}`);
  }
  let review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of review ");
    return res.redirect(`/listings/${id}`);
  }
  next();
};


