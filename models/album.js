var mongoose = require("mongoose");
var Schema = mongoose.Schema;
Song = require('./songs')

var AlbumSchema = new Schema({
      artistName: String,
      name: String,
      songs: [{name: String, 
      	      trackNumber: Number}],
      releaseDate: String,
      genres: [ String ]
})

let Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;