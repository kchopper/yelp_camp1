var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

var data= [
    {
        name: 'Mountains',
        image: 'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?auto=format&fit=crop&w=1350&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "native life",
        image: "https://images.unsplash.com/photo-1501724326152-7a82bf5eae72?auto=format&fit=crop&w=1279&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
];

function seedDb() {
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        }else{
            console.log("DB clean");
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground) {
                    if (err) {
                        console.log(err);
                    }else{
                        console.log("added campground");
                        Comment.create({
                            text: "The air was so fresh and smelled so nice",
                            author: "mouse"
                        }, function(err, comment) {
                            if (err) {
                                console.log(err);
                            }else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("comment added");
                            }
                        });
                    }
                });
            });
        }
    });
};

module.exports = seedDb;
