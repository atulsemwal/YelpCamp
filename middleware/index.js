var Campground = require("../models/campground");
var Comment    = require("../models/comment");
var middlewareObj ={

}

middlewareObj.checkCampgroundOwnership = function(req, res, next){
	//check if a user is logged in?
      if(req.isAuthenticated()){
		  Campground.findById(req.params.id, function(err, campground){
			if(err || !campground){
				req.flash("error", "Campground not found");
				res.redirect("back")
			}else{
				//does user own the campground?
                if(campground.author.id.equals(req.user._id)){
					next()
				}else{
					req.flash("error", "You don't have permission! Please login with correct username!")
					res.redirect("back")
				}
			}
		   })
	  }else{
		  req.flash("error", "You don't have permission! Please login with correct username!")
		  res.redirect("back")
	  }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err || !foundComment){
				req.flash("error", "Comment not found");
				res.redirect("back")
			}else{
				//does user own that comment
                if(foundComment.author.id.equals(req.user._id)){
			
					next()
				}else{
					req.flash("error", "You don't have permission! Please login with correct username!")
					res.redirect("back")
				}
			}
		})
	}else{
		req.flash("error", "You don't have permission! Please login with correct username!")
		res.redirect("back")
	}
}


middlewareObj.isLoggedIn = function (req, res, next){
	if(req.isAuthenticated()){
		return next()
	}
	req.flash("error", "You need to be logged in to do that")
	res.redirect("/login")
}

module.exports = middlewareObj