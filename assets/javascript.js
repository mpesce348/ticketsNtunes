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
var database = firebase.database();
//starts on click function to enter earch term
$("#inputForm").on("click", function(event) {
     
     event.preventDefault();
     
     //pushes search term into database
     artistName = $("#inputForm").val().trim();
     
     database.ref().push({
     
        "artist": artistName
     
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
     
     var queryURL = "https://musicbrainz.org/ws/2/" 
     + artist + "<MBID>?inc=<INC>";

     $.ajax({
     
        url: queryURL,
        method: "GET"
            })
       //stops ajax call and retreives response
       .done(function(response){
       	
       	//sets variable to data of the response
       	var result =response.data;
       	console.log(response);
       	console.log("hello");



       })

 })