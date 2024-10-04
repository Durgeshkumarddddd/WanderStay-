const express = require('express')
const router = express.Router()
const wrapAsync = require('../ErrorHandler/wrapAsync')
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware');
const userCont = require('../controller/user')

router.get('/signup',userCont.signuppage)

router.post('/signup', wrapAsync( userCont.signup))    
// Login user
router.get('/login', userCont.loginpage)
router.post('/login',saveRedirectUrl, passport.authenticate("local", {failureRedirect: '/login', failureFlash: true }), wrapAsync(userCont.loginUser)) 
// Logout user
router.get('/logout', wrapAsync(userCont.logout))

module.exports = router ;

// app.get('/registerUser', async (req, res)=>{
//     const fakeuser = new User({
//       username : "durgeshji" ,
//       email : "durgesh@gmail.com" 
//     })
//     const newUser = await User.register(fakeuser, "helloworld")
//     res.send(newUser);
//   })
  