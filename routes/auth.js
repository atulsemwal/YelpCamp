var express = require("express");
var router  = express.Router();
var passport= require('passport')
var User    = require("../models/user");
var Campground   = require("../models/campground");
var async        = require("async");
var nodemailer   = require("nodemailer");
var crypto       = require("crypto");


//Authentication route

//register route
router.get("/register", (re,res)=>{
    res.render("register")		
})

router.post("/register", (req, res) =>{
	var username = req.body.username
	var password = req.body.password
	User.register(new User({username: username}), password, function(err, user){
		if(err){
			 return res.render("register", {"error": err.message});
			
		}else{
			passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to YelpCamp, " + user.username +'. Please login to have full access.')
			res.redirect("/login")
			
			})
		}
	});
		 })


//login Route

router.get("/login", (req, res)=>{
	res.render("login")
})

//dealing with post login request
router.post("/login", passport.authenticate("local", {
   successRedirect : "/campgrounds",
   failureRedirect : "/login",
	failureFlash: true
}) , function(req, res){
	
})

//logout Route
router.get("/logout" ,function(req, res){
	req.logout();
	req.flash("success", "Logged you out!")
	res.redirect("/campgrounds");
})


module.exports = router;