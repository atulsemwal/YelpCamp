var passportLocalmongoose = require("passport-local-mongoose"),
	methodOverride        = require("method-override"),
 	localStrategy         = require("passport-local"),
	moment                = require("moment"),
	passport              = require("passport"),
	express               = require("express"),
    bodyParser            = require("body-parser") ,
    app                   = express(),
	flash                 = require("connect-flash"),
	mongoose              = require("mongoose");
	

//Requring Models

var	Campground            = require("./models/campground"),
	Comment               = require("./models/comment"),
    User                  = require("./models/user"),
	seed                  = require("./seed");


require('dotenv').config();

// mongoose.connect('mongodb://localhost/yelp_camp_14', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect(process.env.MONGOD, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.set('useFindAndModify', false)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+ "/public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(flash());




//Passport Configuration

app.use(require("express-session")({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error    = req.flash("error");
   res.locals.success    = req.flash("success");
   
   next();
});

app.locals.moment = moment;

//Requring routes

var campgroundRoutes = require("./routes/campground");
var commentRoutes    = require("./routes/comment");
var authRoutes       = require("./routes/auth");
 

app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(authRoutes);

//Notification when connected
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to mongoose!")
});


var port = process.env.PORT || 3000;
app.listen(port, function(){
	 console.log("Server is running");
})