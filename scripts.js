$(document).ready(function() {

// GLOBAL VARIABLES
var jobLocations = [];

// INITIALIZE FIREBASE AND STORE THE DATA IN VARIABLE 'database'
var config = {
    apiKey: "AIzaSyBw-1_TEm8sv798vjUwPtDoN3TJMP1qQGs",
    authDomain: "group-project-1-f306f.firebaseapp.com",
    databaseURL: "https://group-project-1-f306f.firebaseio.com",
    projectId: "group-project-1-f306f",
    storageBucket: "",
    messagingSenderId: "268163003813"
};

firebase.initializeApp(config);

var database = firebase.database();



// INITIAL PAGE SETUP
// 
// 

// landing page "get started" button to go to input form
    $("body").on("click", "#landingButton", function(event){
    event.preventDefault();
    $(".mainContainer").empty();
//Header
    $(".mainContainer").append("<div class='header' id='mainHeader'>");
    $("#mainHeader").append("<h1 id='mainTitle'>");
    $("#mainTitle").text("JoBrew");
//Navbar
    $(".mainContainer").append("<div class='navbar' id='mainNav'>");
    $("#mainNav").append("<div class='navItem' id='navRecent'>");
    $("#navRecent").text("Recent");
//Footer
    $("body").append("<div class='footer' id='mainFooter'>");
    $("#mainFooter").append("<h6 id='footerTitle'>");
    $("#footerTitle").text("Copyright 2018");
//Main screen where basically everything happens
    $(".mainContainer").append("<div class='mainScreen' id='mainSection'>");
//Form    

    $("#mainSection").append("<form class='form' id='mainForm'>");
    $("#mainForm").append("<row class='formRow'>");
//User input field for name
    $(".formRow").append("<label id='tagName' for='name'>");
    $(".formRow").append("<input class='formInput' id='name' type='text' maxlength='30'>");
    $("#tagName").text("your name");
//User input field for city
    $(".formRow").append("<label id='tagCity' for='city'>");  
    $(".formRow").append("<input class='formInput' id='city' type='text' maxlength='30'>");
    $("#tagCity").text("city");
//User input field for state
    $(".formRow").append("<label id='tagState' for='state'>");  
    $(".formRow").append("<input class='formInput' id='state' type='text' maxlength='30'>");
    $("#tagState").text("state (ex: NY)");

//Submit button for our input fields
    $(".formRow").append("<button class='button' id='mainButton' type='submit'>");
    $("#mainButton").text("Submit");
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
jQuery.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});

// Click event for input submission, storing, ajax call to get job listings based on inputs, use that call's return for google map inputs
$("body").on("click", "#mainButton", function() {
    event.preventDefault();

    var name = $("#name").val().trim();
    var city = $("#city").val().trim().replace(/\s/g, '').toLowerCase(); //remove spaces and lower case whatever the user typed in for city - makes it friendly with the url for ajax call
    var state = $("#state").val().trim().toLowerCase();
    console.log("inputs: " + name + " " + city + " " + state);




    // ajax call for job listings (currently locked to us - add another input for country and update the queryURL to unlock the whole world)
    var queryURL = "https://authenticjobs.com/api/?api_key=0854de619531fb9f56239e402fe78e1f&method=aj.jobs.search&location=" + city + state + "us&format=json";
    
    
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
            $("#listings").append("<li id='listing" + i + "'>" + "JOB TITLE: " + jobsArray[i].title + " --  COMPANY: " + jobsArray[i].company.name + "\n</li><br>");
            // stores location info in objects within jobLocations array
            jobLocations.push({
                city: jobsArray[i].company.location.city,
                lat: jobsArray[i].company.location.lat,
                long: jobsArray[i].company.location.lng
            });
        }
        console.log(jobLocations);
        
    })
// clear the input fields after submitting
$("#name").text(" ");
$("#city").text(" ");
$("#state").text(" ");
})

// click event for displaying map when a job listing is clicked
$("body").on("click", "#listings li", function() {
    // code here for displaying map based on location of listing that was clicked
}) 

})