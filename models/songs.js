var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SongSchema = new Schema ({
	name: String,
	trackNumber: Number
})

let Song = mongoose.model('Song', SongSchema);

module.exports = Song;