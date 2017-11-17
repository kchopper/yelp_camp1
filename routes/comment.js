var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");

// ======================
//   comments section
// ======================

router.get("/new", isLoggedIn , function(req, res) {
    var id = req.params.id;
    Campground.findById(id, function(err, foundCampound){ 
        if (err) {
            console.log(err);
        }else{
            res.render("comment/new", {camp: foundCampound});
        }
    })
});

router.post("/",isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampound) {
        if (err) {
            console.log(err);
        }else{
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    foundCampound.comments.push(comment);
                    foundCampound.save();
                    res.redirect("/campground/"+req.params.id);
                }
            })
        }
    });
});

//MIDDLEWARE

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }else{
        res.redirect("/login");
    }
};

module.exports = router;
