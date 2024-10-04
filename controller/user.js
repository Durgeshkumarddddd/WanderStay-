const User = require('../models/users')


// signup get
module.exports.signuppage =  (req, res)=>{
    res.render("users/signup.ejs")
}
// Signup post 
module.exports.signup = async(req, res,next)=>{
    try {
     let { username , email, password} = req.body
     const newUser = new User({username, email})
     const registeredUser = await User.register(newUser, password)
     console.log(registeredUser);
     req.login(registeredUser, (err)=>{
         if(err){
             return next(err)
         }
         req.flash("success", "Welcome to MyApp")
         res.redirect('/listings')
     })
     
    }catch(err){
     req.flash("error", err.message )
     res.redirect('/signup')
    }
 }
 // loginpage get
 module.exports.loginpage = (req, res)=>{
    res.render('users/login.ejs')
}
// login post
module.exports.loginUser = async(req, res)=>{
    req.flash("success", "Welcome back to Go ! You are loggedIn")
    let RedirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(RedirectUrl);
}

//logout user
module.exports.logout = (req, res, next)=>{
    req.logout((err)=>{
         if(err){
           next(err)
         }

        req.flash("success", "Logged out you !")
        res.redirect('/listings')
    })
}