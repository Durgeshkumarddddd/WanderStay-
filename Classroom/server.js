const express= require('express')
const app = express()
const path = require('path')
const session = require("express-session")
const flash = require('connect-flash')

app.set('view engine', 'ejs')
app.set('views',path.join(__dirname, "views"))

// set session middle ware
app.use(session({secret: "mySecret"}))
//for every routing session is work
app.get('/test', (req, res)=>{
    res.send("Session test successfull")
})

// Set flash middleware 
app.use(flash())

app.get('/flash', function(req, res){
    let {name = "anatomy"} = req.query ;
    req.session.name = name ;
    if(name ==="anatomy"){
        req.flash("error", "user not register")
    }else{
        req.flash('success', 'user register successfull')

    }
    res.redirect('/hello');
  });
  app.get('/hello', (req, res)=>{
    res.locals.successMsg = req.flash('success')
    res.locals.errorMsg = req.flash("error")
    res.render('page.ejs',{name:req.session.name})
  })




// const cookieParser = require('cookie-parser');
// app.use(cookieParser("secretCode"))

// app.get('/getcookie', (req, res)=>{
//     res.cookie("name", "Durgesh")
//     res.cookie("apnacollege", "Nitesh kumar")
//     res.send("cookies sent for u")
// })
// app.get('/',(req, res)=>{
//     let {name} = req.cookies
//     console.log(name)
//     res.send("cookies are obtained")
// })
// app.get('/signedcookies', (req, res)=>{
//     res.cookie("madeIn", "INDIA",{signed : true})
//     res.send("signed cookies save")
// })
// app.get('/variefy', (req, res)=>{
//     console.log(req.signedCookies);
// })

app.listen(8080, (req, res)=>{
    console.log("server created successfull")
})