var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment") 

var data= [
	{
		name:  'High Hills beauty',
		img : 'https://images.pexels.com/photos/2609954/pexels-photo-2609954.jpeg?auto=compress&cs=tinysrgb&h=350',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam vel quam elementum pulvinar etiam non quam lacus suspendisse. Duis ultricies lacus sed turpis tincidunt. Feugiat scelerisque varius morbi enim nunc. Amet consectetur adipiscing elit ut aliquam purus sit. Consectetur a erat nam at lectus urna duis. Iaculis at erat pellentesque adipiscing. Fusce id velit ut tortor pretium viverra suspendisse potenti nullam. Consequat mauris nunc congue nisi'
	},
	{
		name:  'Tranquilty',
		img : 'https://images.pexels.com/photos/2609954/pexels-photo-2609954.jpeg?auto=compress&cs=tinysrgb&h=350',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam vel quam elementum pulvinar etiam non quam lacus suspendisse. Duis ultricies lacus sed turpis tincidunt. Feugiat scelerisque varius morbi enim nunc. Amet consectetur adipiscing elit ut aliquam purus sit. Consectetur a erat nam at lectus urna duis. Iaculis at erat pellentesque adipiscing. Fusce id velit ut tortor pretium viverra suspendisse potenti nullam. Consequat mauris nunc congue nisi'
	},
    {
		name:  'Suarag',
		img : 'https://images.pexels.com/photos/2526025/pexels-photo-2526025.jpeg?auto=compress&cs=tinysrgb&h=350',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam vel quam elementum pulvinar etiam non quam lacus suspendisse. Duis ultricies lacus sed turpis tincidunt. Feugiat scelerisque varius morbi enim nunc. Amet consectetur adipiscing elit ut aliquam purus sit. Consectetur a erat nam at lectus urna duis. Iaculis at erat pellentesque adipiscing. Fusce id velit ut tortor pretium viverra suspendisse potenti nullam. Consequat mauris nunc congue nisi'
	}
]

function seedDB(){
	//remove db
	Campground.remove({}, function(err){
	if(err){
		console.log(err)
	}else{
		console.log("Db removed")
		//Create a Campground
		data.forEach(function(seed){
	Campground.create(seed, function(err, campground){
		    if(err){
	console.log(err)
		    }else{
			 console.log("Created Campground in seed")
			 //Create a comment
				Comment.create({
					text: "Loving the place so far, great people and amazing beauty",
					author: "Romeo"
				}, function(err, comment){
					if(err){
						console.log(err)
					}else{
						campground.comments.push(comment)
						campground.save();
						console.log("COMMENT CREATED in seed")
					}
				})
		    }
	      })
	    })
	  }
     });
}

module.exports = seedDB;
