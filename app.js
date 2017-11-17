var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var methodOverride = require("method-override");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDb = require("./seeds");
var campgroundRoutes = require("./routes/campground");
var commentRoutes = require("./routes/comment");
var indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
// seedDb();

//PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret: "Life is good",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});
app.use("/", indexRoutes);
app.use("/campground", campgroundRoutes);
app.use("/campground/:id/comment", commentRoutes);

app.listen(3000, function(){
  console.log("App is running at 3000");
})
