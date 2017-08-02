var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tunely");


// var album = require('./album');
// var songs = require('./songs');

module.exports.Song = require('./songs.js');
module.exports.Album = require('./album.js');
