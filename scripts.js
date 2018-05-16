var mapsLoaded = false;
function initMap() {
    mapsLoaded = true;
}


$(document).ready(function() {


// INITIALIZE FIREBASE AND STORE THE DATA IN VARIABLE 'database'
var config = {
    apiKey: "AIzaSyBDxJlGWgOgE9_wxHmXOt3_A5WnGFixw_s",
    authDomain: "class-project-1-203715.firebaseapp.com",
    databaseURL: "https://class-project-1-203715.firebaseio.com",
    projectId: "class-project-1-203715",
    storageBucket: "",
    messagingSenderId: "344533296777"
  };
  firebase.initializeApp(config);

var database = firebase.database();



// INITIAL PAGE SETUP
// 
// 

// landing page "get started" button to go to input form
    $("body").on("click", "#landingButton", function(event){
    event.preventDefault();
    $("body").css("background", "none");
    $(".mainContainer").empty();
//Header
    $(".mainContainer").append("<div class='header' id='mainHeader'>");
    $("#mainHeader").append("<h1 class='animated fadeIn' id='mainTitle'>");
    $("#mainTitle").text("JoBrew");
//hamburger
    $(".header").append('<div class="container">');
    $(".container").append('<div class="bar1">')
    $(".container").append('<div class="bar2">')
    $(".container").append('<div class="bar3">')
    $("body").on("click", ".container", function(){
        $(".navbar").addClass("showNav")
        $(".navItem").addClass("NewnavItem")
        $("#recent").addClass("recent2")
        $(".navItem").removeClass("navItem")
        $(".recent2").removeAttr("id", "recent")
    })
//Navbar
    $(".mainContainer").append("<div class='navbar' id='mainNav'>");
    $("#mainNav").append("<div class='navItem' id='navSearch'>");
    $("#navSearch").text("Search");
    $("#mainNav").append("<div class='navItem' id='navRecent'>");
    $("#navRecent").text("Recent");
    $("#mainNav").append("<div id='recent'>")
//Footer
    $("body").append("<div class='footer' id='mainFooter'>");
    $("#mainFooter").append("<h6  class='animated fadeIn' id='footerTitle'>");
    $("#footerTitle").text("Copyright 2018");
//Main screen where basically everything happens
    $(".mainContainer").append("<div class='mainScreen' id='mainSection'>");
//Form    
    $("#mainSection").append("<form class='form' id='mainForm'>");
    $("#mainForm").append("<row class='formRow'>");
//User input field for name
    $(".formRow").append("<label id='tagName' for='name'>");
    $(".formRow").append("<input class='formInput' id='name' type='text' maxlength='30'>");
    $("#tagName").text("Your name");
//User input field for city
    $(".formRow").append("<label id='tagCity' for='city'>");  
    $(".formRow").append("<input class='formInput' id='city' type='text' maxlength='30'>");
    $("#tagCity").text("City");
//User input field for state
    $(".formRow").append("<label id='tagState' for='state'>");  
    $(".formRow").append("<input class='formInput' id='state' type='text' maxlength='30'>");
    $("#tagState").text("State (ex: NY)");

//Submit button for our input fields
    $(".formRow").append("<button class='button' id='mainButton' type='submit'>");
    $("#mainButton").text("Search");
//Div to dynamically recieve API info. Basically everything you guys do should end up here in some fashion.
    $("#mainSection").append("<div class='returnDiv' id='returnSection'>");
//Div for dynamically showing the map is on you guys since it will be part of a function
    })

// 
// 
// END OF INITIAL PAGE SETUP


// CORE FUNCTIONALITY
// 
// 

// CORS
// jQuery.ajaxPrefilter(function(options) {
//     if (options.crossDomain && jQuery.support.cors) {
//         options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
//     }
// });

// "new search" button functionality - clear main div and re-render input form
$("body").on("click", "#navSearch", function() {
    // remove main contents and re-render input form
        $("#mainSection").empty();
        $("#mainNav").empty();
        //navbar
        $("#mainNav").append("<div class='navItem' id='navSearch'>");
        $("#navSearch").text("Search");
        $("#mainNav").append("<div class='navItem' id='navRecent'>");
        $("#navRecent").text("Recent");
        $("#mainNav").append("<div id='recent'>")
        //Form    
        $("#mainSection").append("<form class='form' id='mainForm'>");
        $("#mainForm").append("<row class='formRow'>");
        //User input field for name
        $(".formRow").append("<label id='tagName' for='name'>");
        $(".formRow").append("<input class='formInput' id='name' type='text' maxlength='30'>");
        $("#tagName").text("Your name");
        //User input field for city
        $(".formRow").append("<label id='tagCity' for='city'>");  
        $(".formRow").append("<input class='formInput' id='city' type='text' maxlength='30'>");
        $("#tagCity").text("City");
        //User input field for state
        $(".formRow").append("<label id='tagState' for='state'>");  
        $(".formRow").append("<input class='formInput' id='state' type='text' maxlength='30'>");
        $("#tagState").text("State (ex: NY)");
        //Submit button for our input fields
        $(".formRow").append("<button class='button' id='mainButton' type='submit'>");
        $("#mainButton").text("Submit");
        //Div to dynamically recieve API info
        $("#mainSection").append("<div class='returnDiv' id='returnSection'>");
    // remove map and re-render map div html
        $("#mapDiv").empty();
        $("#mapDiv").append('<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDugDqK5S-d1MmeNJ1GkfddoYc2kJL7Chw&libraries=places&callback=initMap"></script>');
    });

// Click event for input submission, storing, ajax call to get job listings based on inputs, use that call's return for google map inputs
$("body").on("click", "#mainButton", function() {
    event.preventDefault();

    var name = $("#name").val().trim();
    var city = $("#city").val().trim().replace(/\s/g, '').toLowerCase(); //remove spaces and lower case whatever the user typed in for city - makes it friendly with the url for ajax call
    var state = $("#state").val().trim().toLowerCase();
    console.log("inputs: " + name + " " + city + " " + state);

    database.ref().set({
        name: name,
        city: city,
        state: state,
    });


    if (state.length > 2) {
        alert("Please write state abbreviation as two letters")
    }


   

    // ajax call for job listings (currently locked to us - add another input for country and update the queryURL to unlock the whole world)
    var queryURL = "https://cors-anywhere.herokuapp.com/https://authenticjobs.com/api/?api_key=0854de619531fb9f56239e402fe78e1f&method=aj.jobs.search&location=" + city + state + "us&format=json";
    
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        // store job listing array from response
        var jobsArray = response.listings.listing;
        console.log(jobsArray);
        // render list of up to 10 listings (first ten from response) and store their location info into jobLocations array
        //  -each will have a unique id that will be targeted for click event
        $("#returnSection").append("<ul id='listings'>");
        for (var i = 0; i < jobsArray.length; i++) {
            // renders list
            $("#listings").append("<li class='listing animated bounceInLeft' data-name='" + jobsArray[i].company.id + "' data-lat='" + jobsArray[i].company.location.lat + "' data-lng='" + jobsArray[i].company.location.lng + "'>" + "JOB TITLE: " + jobsArray[i].title + " --  COMPANY: " + jobsArray[i].company.name + "\n</li><br>");
        }
        
    })
// clear the input fields after submitting
$("#name").text(" ");
$("#city").text(" ");
$("#state").text(" ");
})

// click event for displaying map when a job listing is clicked
$("body").on("click", "#listings .listing", function() {
    console.log("successfully recognized click on listing for: " + $(this).attr("data-name"));
    // code here for displaying map based on location of listing that was clicked
    var map;
    var infowindow;
    
    if (mapsLoaded) {
        console.log("dispMap() is running");
        // $("returnSection").append('<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDugDqK5S-d1MmeNJ1GkfddoYc2kJL7Chw&libraries=places&callback=initMap"></script>');

        var posting = { lat: parseFloat($(this).attr("data-lat")), lng: parseFloat($(this).attr("data-lng")) };
        console.log(posting);
    
        map = new google.maps.Map(document.getElementById('mainSection'), {
            center: posting,
            zoom: 11
        });
    
        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: posting,
            radius: 16093.4,
            keyword: ['brewery'],
        }, callback);
        var service2 = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: posting,
            radius: 16093.4,
            keyword: [$(this).attr("data-name")]
        }, callback2);    
    } else {
        console.log("Error: Google Maps isn't loaded yet.")
    }
    
    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    }

    function callback2(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker2(results[i]);
            }
        }
    }
    
    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            animation: google.maps.Animation.DROP,
            map: map,
            position: place.geometry.location
        });
    
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });
    }

    function createMarker2(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            animation: google.maps.Animation.BOUNCE,
            map: map,
            position: place.geometry.location
        });  

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });
    }
    

}) 

database.ref().on("value", function(snapshot) {

    console.log(snapshot.val().name+ " just searched in " + snapshot.val().city + ", " + snapshot.val().state);

    // Change the HTML to reflect
    $("#recent").html(snapshot.val().name+ "<br> just searched in: <br>" + snapshot.val().city + ", " + snapshot.val().state);

   // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });


})


