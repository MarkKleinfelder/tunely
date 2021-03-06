/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


/* hard-coded data! */
// var sampleAlbums = [];
// sampleAlbums.push({
//              artistName: 'Ladyhawke',
//              name: 'Ladyhawke',
//              releaseDate: '2008, November 18',
//              genres: [ 'new wave', 'indie rock', 'synth pop' ]
//            });
// sampleAlbums.push({
//              artistName: 'The Knife',
//              name: 'Silent Shout',
//              releaseDate: '2006, February 17',
//              genres: [ 'synth pop', 'electronica', 'experimental' ]
//            });
// sampleAlbums.push({
//              artistName: 'Juno Reactor',
//              name: 'Shango',
//              releaseDate: '2000, October 9',
//              genres: [ 'electronic', 'goa trance', 'tribal house' ]
//            });
// sampleAlbums.push({
//              artistName: 'Philip Wesley',
//              name: 'Dark Night of the Soul',
//              releaseDate: '2008, September 12',
//              genres: [ 'piano' ]
//            });
/* end of hard-coded data */

var songs;
var kanyeAlbums;

$(document).ready(function() {
  console.log('app.js loaded!');
  
  $.get("http://localhost:3000/api/albums")
    .done(function(data){  
    let kanyeAlbums = data;
    kanyeAlbums.forEach(function(album){
      renderAlbum(album);
    });
  });


$("form").on("submit", function(event){
  event.preventDefault();
  let formdata = $(this).serialize();
  console.log(formdata);
  $(this).trigger("reset");

  $.ajax({
    method: "POST",
    url: "http://localhost:3000/api/albums",
    data: formdata,
    success: function(kanyeAlbums){
      renderAlbum(kanyeAlbums);
    }
  });
});
  $('#albums').on('click', '.add-song', function(event){
    console.log("add song button clicked");
    var id = $(this).parents('.album').data('album-id');
    $('#songModal').data(id)
    $('#songModal').modal();

   $('#saveSong').on ('click', function handleNewSongSubmit(event){
      console.log("save song clicked!");
      event.preventDefault();
      var songUrl = "http://localhost:3000/api/albums/"+id+"/songs";
      var songName = $('#songName').val();
      var trackNum = $('#trackNumber').val();
      console.log(songName + " and " + trackNum + " id: " + id);

      $.ajax({
      method: "POST",
      url: songUrl,
      data: {
        name: songName,
        trackNumber: trackNum
      },
 
      success: function(){
      console.log("SUCCESSS!");

      $('#songModal').modal('hide');
      $('#trackNumber').val("");
      $('#songName').val("");
      }
    });
  });
    
  });
});

 








// this function takes a single album and renders it to the page
function renderAlbum(album) {
  var listOfSongs="";
  album.songs.forEach(function(song){
    listOfSongs=listOfSongs + ' (' + song.trackNumber + ') '+ song.name ; 
  })


  var albumHtml =
  "        <!-- one album -->" +
  "        <div class='row album' data-album-id='" + album._id + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin album internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-3 col-xs-12 thumbnail album-art'>" +
  "                     <img src='" + "http://placehold.it/400x400'" +  " alt='album image'>" +
  "                  </div>" +
  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Album Name:</h4>" +
  "                        <span class='album-name'>" + album.name + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Artist Name:</h4>" +
  "                        <span class='artist-name'>" +  album.artistName + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Released date:</h4>" +
  "                        <span class='album-releaseDate'>" + album.releaseDate + "</span>" +
  "                      </li>" +
  "                         <li class='list-group-item'>" + 
  "                            <h4 class='inline-header'>Songs:</h4>"+
  "                              <span >"+ listOfSongs +"</span>"+
  "                          </li>"+
  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of album internal row -->" +

  "              </div>" + // end of panel-body

  "              <div class='panel-footer'>" +
  "                   <button class='btn btn-primary add-song'>Add Song</button>"+
  "              </div>" +

  "            </div>" +
  "          </div>" +
  "          <!-- end one album -->";


$('#albums').append(albumHtml);


};

