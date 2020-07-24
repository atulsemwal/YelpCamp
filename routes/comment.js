var express    = require("express");
var router     = express.Router();
var Comment    = require("../models/comment");
var Campground = require("../models/campground");
var middleware = require("../middleware");

//=====================
//COMMENTS ROUTES

router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn ,function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(
	 function(err, foundCampground){
		if(err || !foundCampground){
			req.flash("error", "Campground not found")
			 res.redirect("back")
		}else{
            res.render("comment/new", {campgrounds: foundCampground})
		}
	}
	)
})
//Post comment route
router.post("/campgrounds/:id/comments", middleware.isLoggedIn , function(req, res){
	///look for campgrounds using id
	Campground.findById(req.params.id, function(err, campground){
         if(err || !campground){
           req.flash("error", "Campground not found")
			 res.redirect("back")
		 }else{
			 
			Comment.create(req.body.comment, function(err, newComment){
				if(err || !newComment){
					req.flash("error", "Something went wrong")
					res.redirect("back")
				}else{
					// add username and id to comment
					newComment.author.id = req.user._id;
					newComment.author.username = req.user.username;
					newComment.save()
					///link campground and comments
					campground.comments.push(newComment)
					campground.save()
					req.flash("success", "Successfully Added Comment")
					res.redirect("/campgrounds/" + campground._id)
				}
			})
		 }
	})
	
	
	//redirect to show page
	})
//=========================


//EDIT COMMENT ROUTE
router.get("/campgrounds/:id/comments/:comment_id/edit" , middleware.checkCommentOwnership ,function(req, res){
	  // Comment.findById(req.params.comment_id, function(err, comment){
	  // if(err){
	  // res.redirect("back")
	  // }else{
	  // res.render("comment/edit", {comment: comment, campgrounds: campground})
	  // }
	  // })
	Campground.findById(req.params.id).populate("comments").exec( function(err, campground){
		if(err || !campground){
			req.flash("error", "Campground not found")
			 res.redirect("back")
		}else{
		  campground.comments.forEach(function(comment){
	if(comment._id.equals(req.params.comment_id)){
			  res.render("comment/edit", {comment: comment, campgrounds: campground})
		   }
		  })
		}
	})
})

//Update comment route
            
router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership , function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, 
							  function(err, updatedComment){
		                          if(err){
									 res.redirect("back")
								  }else{
									  
									  res.redirect("/campgrounds/" + req.params.id)
								  }
	                           }
	)
})


//Delete route for comment
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership , function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
          if(err){
			  
			  res.redirect("back")
		  }else{
			res.redirect("back")  
		  }
		
	})
})


module.exports = router;