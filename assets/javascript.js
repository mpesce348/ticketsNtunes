//inatlized on ready function
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
    //sets varibale for databsase 
    var database = firebase.database();




    //creates function to pull info from the spoity API
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

            var genre = response.artists.items[0].genres;



            // Building a SECOND URL to query another Spotify endpoint (this one for the tracks)
            var queryURLTracks = "https://api.spotify.com/v1/artists/" + artistID + "/top-tracks?country=US";

            // Running a second AJAX call to get the tracks associated with that Spotify id
            $.ajax({
                url: queryURLTracks,
                method: "GET"
                //completes ajax call and creats function with response data
            }).done(function(trackResponse) {

                //creates variable to seach api for artist's top track data 
                var queryURLTracks1 = "https://api.spotify.com/v1/artists/" + artistID + "/top-tracks?country=US";

                // Running a second AJAX call to get the tracks associated with that Spotify id
                $.ajax({
                    url: queryURLTracks1,
                    method: "GET"
                }).done(function(trackResponse) {

                    //creates var, the value of which will append to the div with id "trackData"
                    var trackPanel = $('#trackData')
                    //creates a var which will generate an order list 
                    var trackTop3List = $('<ol>')
                    //begins for loop to cycle though the response data in trackResponse
                    for (var i = 0; i < 10; i++) {
                        //creates var which will generate a list item 
                        var trackListItem = $('<li>')
                        //creates var which will generate an h3 tag
                        var trackHeader = $('<h3>')
                        //sets the text of the h3 tag as the top track of the track response object
                        trackHeader.text(trackResponse.tracks[i].name)
                        //appends the "trackHeader" h3 to the "trackListItem" list item
                        trackListItem.append(trackHeader)
                        //appends the "trackListItem" list item to the "trackTop3List" ordered list
                        trackTop3List.append(trackListItem);
                    }

                    //appends the list trackTop3List to the div with id "trackDta"
                    trackPanel.append(trackTop3List) 


                });
            });
        });
    };

    //WIKI API
    function getWiki() {

        event.preventDefault();
        //creates variable wiki and defines it as the text input from the input form
        var wiki = $("#inputForm").val();

        //builds query url using text from the input form
        var queryURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=" + wiki + "&exintro=1&explaintext=1";


        //ajax call to retreive wiki data for text description
        $.ajax({
            url: queryURL,
            method: "GET",
            cors: true,
            dataType: "jsonp"
        //completes ajax call and creates function with response data
        }).done(function(response) {
            console.log(response);
            console.log(response.query.pages);
            
            //sets the text in the div with id "wikiData" to a stringified version of 
            //the text pulled from the wiki api object
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
            // var valKeys = Object.keys(snapshotVal);
            // console.log(valKeys);
        })


        // Running the getSpotify (passing in the artist as an argument)
        getSpotify();

        getWiki();
        console.log(getWiki);
    })



});