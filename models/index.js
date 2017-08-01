var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tunely");


//var album = require('./album');

module.exports.Album = require('./album.js');
