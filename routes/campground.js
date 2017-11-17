var express = require("express");
var router = express.Router();
var Campground = require("../models/campgrounds");
var middleware = require("../middleware/index");


//Index
router.get("/", function(req, res){

  Campground.find({}, function(err, camp) {
    if (err) {
      console.log(err);
    }else{
        res.render("campground/index", {campground: camp});
    }
  })
});

//CREATE
router.post("/",middleware.isLoggedIn, function(req, res) {
  var name = req.body.name;
  var image = req.body.img;
  var desc = req.body.desc;
  var author= {
    id: req.user._id,
    username: req.user.username
  };

  Campground.create({
    name: name,
    image: image,
    description: desc,
    author: author
  }, function(error, newCamp){
    if(error){
      console.log(error);
    }else{
      console.log(newCamp);
      res.redirect("/campground");
    }
  });
});

//NEW
router.get("/new",middleware.isLoggedIn, function(req, res) {
    res.render("campground/new");
});

//SHOW
router.get("/:id", function(req, res) {
  var id = req.params.id;
  Campground.findById(id).populate("comments").exec(function(err, campById) {
    if (err) {
      console.log(err);
    }else{
       res.render("campground/show", {camp: campById});
       console.log(campById)
    }
  });
});

//EDIT
router.get("/:id/edit", function (req, res) {
	var id = req.params.id;
	if(req.isAuthenticated()){
		Campground.findById(id, function(err, foundCamp){
		  if(err){
			console.log(err);
		  }else{
			  if(foundCamp.author.id.equals(req.user._id)){
				res.render("campground/edit", {camp: foundCamp});
			  }else{
				  res.send("This camp dont belong to you");
			  }	
		  }
		})
	}else{
		res.send("LOG IN PLEASE");
	}
});
 

//UPDATE

router.put("/:id",middleware.checkCommentOwnership, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.camp, function(err, updatedCamp){
		if(err){
			console.log(err);
			res.redirect("/campground");
		}else{
			res.redirect("/campground/"+req.params.id);
			console.log("VICTORY");
		}
	})
});

//DELETE

router.delete("/:id",middleware.checkCommentOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err, foundCamp){
		if (err) {
			console.log(err);
		} else {
			res.redirect("/campground");
			console.log("VICTORY");
		}
	})
})

module.exports = router;
