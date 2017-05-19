$(document).ready(function() {
    console.log("ready!");

  //initalize firebase
  var config = {
    apiKey: "AIzaSyAoNddLnmtR865blvGJc9ihvUNMwuFwrUE",
    authDomain: "ticketsntunes.firebaseapp.com",
    databaseURL: "https://ticketsntunes.firebaseio.com",
    projectId: "ticketsntunes",
    storageBucket: "ticketsntunes.appspot.com",
    messagingSenderId: "446162477724"
  };
  firebase.initializeApp(config);

  var database = firebase.database();





function getSpotify() {
    event.preventDefault();
    // Storing the artist name
    var artist = $("#inputForm").val().trim();
    // Running an initial search to identify the artist's unique Spotify id
    var queryURL = "https://api.spotify.com/v1/search?q=" + artist + "&type=artist&limit=1";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      // Printing the entire object to console
      console.log(response);

      // Printing the artist id from the Spotify object to console
      var artistID = response.artists.items[0].id;

      var genre =response.artists.items[0].genres;

      

      // Building a SECOND URL to query another Spotify endpoint (this one for the tracks)


      //RETRIEVES SPOTIFY INFO ON ALBUMS
      var queryURLTracks = "https://api.spotify.com/v1/artists/"+ artistID +"/top-tracks?country=US";

      // Running a second AJAX call to get the tracks associated with that Spotify id
      $.ajax({
        url: queryURLTracks,
        method: "GET"
      }).done(function(trackResponse) {

        // Logging the tracks
        console.log(trackResponse);

      //RETRIEVES INFO ON TOP TRACKS

      var queryURLTracks1 = "https://api.spotify.com/v1/artists/"+ artistID +"/top-tracks?country=US";

      // Running a second AJAX call to get the tracks associated with that Spotify id
      $.ajax({
        url: queryURLTracks1,
        method: "GET"
      }).done(function(trackResponse) {

        
        var trackPanel  = $('#trackData')
        var trackTop3List = $('<ol>')
        for(var i = 0; i < 10; i++){
          var trackListItem = $('<li>')
          var trackHeader = $('<h3>')
          console.log(trackResponse.tracks[i].name);
          trackHeader.text(trackResponse.tracks[i].name)
          trackListItem.append(trackHeader) 
          trackTop3List.append(trackListItem);
        }

        trackPanel.append(trackTop3List)
        
        
      });
    });
  });
};
  
//WIKI API
  function getWiki(){
        
          event.preventDefault();
          var wiki = $("#inputForm").val();

         var queryURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=" + wiki + "&exintro=1&explaintext=1";

   

         $.ajax({
            url: queryURL,
            method: "GET",
            cors: true,
            dataType: "jsonp"
          }).done(function(response) {
            // console.log(response.query.pages[4429395].extract);
            // console.log(response.query.pages.4429395.extract);
            $("#wikiData").text(JSON.stringify(response.query.pages[4429395].extract));

        })

  }






  //starts on click function to enter earch term
  $("#inputBtn").on("click", function(event) {


    event.preventDefault();
    console.log("working click")
    $("#trackData").empty();
    $("#wikiData").empty();
    //pushes search term into database
     var artistName = $("#inputForm").val().trim();


    database.ref().push({

        "artist": artistName,
            //need to create an artist ID var to push 
            //artist object id to database

    });

    //set up function to take snapshot of 
    //database value on any value change

    database.ref().on("value", function(snapshot) {
        var snapshotVal = snapshot.val();
        console.log(snapshotVal);
        var valKeys = Object.keys(snapshotVal);
        console.log(valKeys);
    })


    // Running the getSpotify (passing in the artist as an argument)
    getSpotify();

    getWiki();
    console.log(getWiki);
  })

});