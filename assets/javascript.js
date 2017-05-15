$(document).ready(function() {
    console.log("ready!");
});
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


//global variables
var artist = "";
var artistID;
var database = firebase.database();

function getArtist() {
    var name = ("#inputForm").val();

    var buildURL1 = "https://api.spotify.com/v1/search?q=" + name +
        "&type=artist";


    $.ajax({


            url: buildURL1,
            method: "GET"
        })
        //stops ajax call and retreives response
        .done(function(response) {

            //sets variable to data of the response
            console.log(response.artists.items[0].name,
                response.artists.items[0].id);
        })
}

function getTopTracks() {


    var buildURL2 = "https://api.spotify.com/v1/search?q=prince&type=artist";



    $.ajax({

            url: buildURL2,
            method: "GET"
        })
        //stops ajax call and retreives response
        .done(function(response) {

            //sets variable to data of the response
            console.log(response.artists.items[0].name,
                response.artists.items[0].id);


        })
}

//starts on click function to enter earch term
$("#inputForm").on("click", function(event) {

    event.preventDefault();

    //pushes search term into database
    artistName = $("#inputForm").val().trim();


    database.ref().push({

        "artist": artistName
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

    // set up api key
    // perform call to get info from api

    artist = $(this).attr("data-name");

    var queryURL = "https://api.spotify.com/v1/search?q=prince&type=artist";



    $.ajax({

            url: queryURL,
            method: "GET"
        })
        //stops ajax call and retreives response
        .done(function(response) {

            //sets variable to data of the response
            console.log(response.artists.items[0].name,
                response.artists.items[0].id);




        });

    getArtist();
    getTopTracks();
})