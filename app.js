if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
// console.log(process.env.cloud_Api_Key); // remove this after y
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const wrapAsync = require("./ErrorHandler/wrapAsync");
const ejsMate = require("ejs-mate");
const ExpressError = require("./ErrorHandler/expressError");
const Joi = require("joi");
const listings = require("./routers/listing");
const userRouter = require("./routers/user");
const User = require("./models/users");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const { register } = require("module");
const LocalStrategy = require("passport-local");
const review = require("./routers/review");
const MongoStore = require('connect-mongo');

// use ejs-locals for all ejs templates:
app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

main()
  .then((res) => {
    console.log("Connected to Db");
  })
  .catch((err) => {
    console.log(err);
  });
  // For store data in Atlas database
   let DB_URL = process.env.ATLASDB_URL;
    //  i have to use database for storing data in Atlas database

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Go");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
app.set("view engine", "ejs");

// Session middleware
app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: true, 
    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 100,
      maxAge: 7 * 24 * 60 * 60 * 100,
      httpOnly: true,
    },
    store: MongoStore.create(options)
  })
);
  
// search passport-local-strategy
// Initialize Passport
app.use(passport.initialize());
// user serves many pages stable
app.use(passport.session());
// use authenticate method to authenticate the user in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());
// connect flash middleware
app.use(function (req, res, next) {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", review);
app.use("/", userRouter);

app.get("/", (req, res) => {
  res.send("Server created successfull ");
});

// Error handler middleware
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "some thing went wrong" } = err;
  res.render("listings/Error.ejs", { err });
  //.send(message)
});

// app.get("/listing", async(req, res)=>{
//     let SampleListing  = new Listing ({
//       title : "umaid haveli",
//       image : "https://plus.unsplash.com/premium_photo-1721858125140-57077cfc8b1a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       description : "My Apna villa is free for anyOne",
//       price : 2000 ,
//       location : "kukas"
//     })
//     res.send(SampleListing)
//     await SampleListing.save().then(console.log("Save Listing in db"))
//                               .catch(err => { console.log(err)})
//})

app.listen(8080, (req, res) => {
  console.log("Server is created at post no 8080");
});

// type cast error = any value change like at the place of title , write description
