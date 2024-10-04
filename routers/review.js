const express = require('express')
const router = express.Router({mergeParams: true})
const wrapAsync = require('../ErrorHandler/wrapAsync')
const {reviewSchema} = require('../Schema')
const ExpressError = require('../ErrorHandler/expressError');
const { isLoggedIn, isreviewAuthor } = require('../middleware')
const reviewCont = require('../controller/review')
// Server side validation for review 
  const validateReview = (req, res, next)=>{
    let {err}  =  reviewSchema.validate(req.body)
      if(err){
        let ErrMsg = err.details.map((el)=> el.message).join(",")
        throw new ExpressError(400 , ErrMsg);
      }
     else {
      next() 
     }
  }

// Review write here
  router.post('/',isLoggedIn, validateReview, wrapAsync(reviewCont.writeReview))

  // Delete Reviews
router.delete('/:reviewId',isLoggedIn,isreviewAuthor, wrapAsync(reviewCont.deleteReview))

module.exports = router 