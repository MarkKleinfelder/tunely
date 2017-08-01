var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var AlbumSchema = new Schema({
      artistName: String,
      name: String,
      releaseDate: String,
      genres: [ String ]
})

let Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;