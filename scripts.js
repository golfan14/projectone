$(document).ready(function() {

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


    $("body").on("click", "#landingButton", function(event){
    event.preventDefault();
    $(".mainContainer").empty()
//Header
    $(".mainContainer").append("<div class='header' id='mainHeader'>")
    $("#mainHeader").append("<h1 id='mainTitle'>")
    $("#mainTitle").text("HomeBrew")
//Navbar
    $(".mainContainer").append("<div class='navbar' id='mainNav'>")
    $("#mainNav").append("<div class='navItem' id='navRecent'>")
    $("#navRecent").text("Recent")
//Footer
    $("body").append("<div class='footer' id='mainFooter'>")
    $("#mainFooter").append("<h6 id='footerTitle'>")
    $("#footerTitle").text("Copyright 2018")
//Main screen where basically everything happens
    $(".mainContainer").append("<div class='mainScreen' id='mainSection'>")
//Form    
    $("#mainSection").append("<form class='form' id='mainForm'>")
    $("#mainForm").append("<row class='formRow'>")
//User input field for SOMETHING
    $(".formRow").append("<label id='tagSOMETHING' for='SOMETHING'>");
    $(".formRow").append("<input class='formInput' id='SOMETHING' type='text' maxlength='30'>");
    $("#tagSOMETHING").text("SOMETHING");
//User input field for SOMETHING ELSE
    $(".formRow").append("<label id='tagSOMETHINGELSE' for='SOMETHINGELSE'>");  
    $(".formRow").append("<input class='formInput' id='SOMETHINGELSE' type='text' maxlength='30'>");
    $("#tagSOMETHINGELSE").text("SOMETHINGELSE");
//User input field for SOMETHING ELSE
    $(".formRow").append("<label id='tagSOMETHINGELSE' for='SOMETHINGELSE'>");  
    $(".formRow").append("<input class='formInput' id='SOMETHINGELSE' type='text' maxlength='30'>");
    $("#tagSOMETHINGELSE").text("SOMETHINGELSE");
//Submit button for our input fields
    $(".formRow").append("<button class='button' id='mainButton' type='submit'>")
    $("#mainButton").text("Submit")
//Div to dynamically recieve API info. Basically everything you guys do should end up here in some fashion.
    $("#mainSection").append("<div class='returnDiv' id='returnSection'>")
//Div for dynamically showing the map is on you guys since it will be part of a function
    })
})