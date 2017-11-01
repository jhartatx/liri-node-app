var keys = require("./keys.js");
var fs = require("fs");
var command = process.argv;
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');


//twitter
if(command[2] === "my-tweets"){
  var client = new twitter(keys.twitterKeys);
  var params = {screen_name: 'JustinM01516019', count: 10};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if(error) {
      console.log(error);
    }
    for(var i = 0; i < tweets.length; i++){
      console.log("On: " + tweets[i].created_at + "\n" + "You tweeted: " + tweets[i].text + "\n");

    }
  });
}

//OMDB
if(command[2] === "movie-this") {
var movieName = "";

for (var i = 3; i < command.length; i++) {

  if (i > 2 && i < command.length) {
    movieName = movieName + "+" + command[i];
  }
  else {
    movieName += command[i];
  }
}

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

request(queryUrl, function(error, response, body){

  if (!error && response.statusCode === 200){
    console.log("Movie Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    if(JSON.parse(body).Ratings[1]){
          console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
    }
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
  }
  else {
    console.log("No results found...try again!");
  }
});

};

//spotify

if(command[2] === "spotify-this-song"){
  var client = new Spotify(keys.spotifyKeys);
  var songSearch = "";

  for (var i = 3; i < command.length; i++) {

    if (i > 2 && i < command.length) {
      songSearch = songSearch + "+" + command[i];
    }
    else {
      songSearch += command[i];
    }

}
  client.search({ type: 'track', query: songSearch, limit: 1})
    .then(function(response) {
      // console.log(JSON.stringify(response, null, 2));
      console.log("Artist: " + response.tracks.items[0].album.artists[0].name);
      console.log("Song Name: " + response.tracks.items[0].name);
      console.log("Preview Link: " + response.tracks.items[0].external_urls.spotify);
      console.log("Album: " + response.tracks.items[0].album.name);
    })
    .catch(function(err) {
      console.log(err);
    });

}

//artist, song name, preview link, album
