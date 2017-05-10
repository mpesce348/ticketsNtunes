$( document ).ready(function() {
    console.log( "ready!" );
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
  var artist ="";
  var database = firebase.database();
  //starts on click function to enter earch term
  $("#inputForm").on("click", function(event) {
  	event.preventDefault();

  	artist = $("#inputForm").val().trim();
  })


