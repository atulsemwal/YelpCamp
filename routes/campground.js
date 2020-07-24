var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");


router.get("/", function(req, res){
		res.render("landing")
		})


//Index route : display all the campground(get)
router.get("/campgrounds", function(req, res){
	//get all the campground
	Campground.find({}, function(err, allCampground){
		if(err){
			console.log(err);
		}else{
			res.render("campground/index", {campground: allCampground})
		
		}
	})
	
})


//New : form to create new campground(get)
router.get("/campgrounds/new", middleware.isLoggedIn ,function(req, res){
	res.render("campground/new")
})

//Create : add new campground into our database(post)
router.post("/campgrounds", middleware.isLoggedIn ,function(req, res){
	
	var contact     = req.body.contact;
	var phone       = req.body.phone;
	var name        = req.body.name;
	var price       = req.body.price;
	var img         = req.body.image;
	var location    = req.body.location;
	var description = req.body.description;
	
	var author      = {
		id       : req.user._id,
		username : req.user.username
	}
	var newCamground = {contact: contact, phone:phone, name: name, price: price, img: img, location: location, description: description, author: author}
	//Create new campgrounds and save to database
	Campground.create( newCamground ,function(err, campground){
		if(err || !campground){
			
			console.log("There is error while creating object")
		}else{
			
           res.redirect("/campgrounds")
		}
	})
})

 

//SHOW : SHOW MORE INFO ABOUT ONE CAMPGROUND
router.get("/campgrounds/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(
	 function(err, foundCampground){
		if(err || !foundCampground){
			req.flash("error", "Campground not found");
		    res.redirect("back")
		}else{
		    res.render("campground/show", {campgrounds: foundCampground})
		}
	}
	)
})

//Edit CAMPGROUND ROUTE
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership ,(req, res)=>{
	 Campground.findById(req.params.id, function(err, campground){
		 if(err){
			 console.log(err)
		 }else{
			 
			res.render("campground/edit", {campground: campground}) 
		 }
			 
	 })
})

//UPDATE CAMPGROUND ROUTE
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership , function(req, res){
	
	Campground.findByIdAndUpdate(req.params.id , req.body.campground, 
	     function(err, updateCampground){
		     if(err){
				 console.log(err)
			 }else{
				 
				 res.redirect("/campgrounds/" + req.params.id)
			 }
	      }
	)
})

//Destroy Campground Route
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership , function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds")
		}else{
			res.redirect("/campgrounds")
		}
		
	})
})

module.exports = router