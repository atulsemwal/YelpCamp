var mongoose =  require("mongoose")
	
var campgroundSchema = new mongoose.Schema({
	  contact     : String,
	  phone       : String,
	  name        : String,
	  price       : String,
	  img         : String,
	  description : String,
	  location    : String,
	  createdAt  : { type: Date, default: Date.now},
	  author      :{
		  id:{
			  type: mongoose.Schema.Types.ObjectId,
			  ref : "User"
		  },
		  username: String
	  },
	  comments    : [
		              { 
		                type: mongoose.Schema.Types.ObjectId,
						ref : "Comment"
	                  }
	                 ]
});

module.exports = mongoose.model("Campground", campgroundSchema);