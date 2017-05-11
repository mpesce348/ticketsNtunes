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
            
     //set up api key
     //perform call to get info from api
     
     artist = $(this).attr("data-name");
     
     var queryURL = 

     $.ajax({
     
        url: queryURL,
        method: "GET"
            })
       //stops ajax call and retreives response
       .done(function(response){
       	
       	var result =response.data;
       	console.log(response);
       	console.log("hello");


       })

 })