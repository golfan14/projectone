$(document).ready(function() {
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
    $(".formRow").append("<input class='formInput' id='SOMETHING' type='text' maxlength='30'>");
    $(".formRow").append("<label id='tagSOMETHING' for='SOMETHING'>");
    $("#tagSOMETHING").text("SOMETHING");
//User input field for SOMETHING ELSE
    $(".formRow").append("<input class='formInput' id='SOMETHINGELSE' type='text' maxlength='30'>");
    $(".formRow").append("<label id='tagSOMETHINGELSE' for='SOMETHINGELSE'>");
    $("#tagSOMETHINGELSE").text("SOMETHINGELSE");
//Submit button for our input fields
    $(".formRow").append("<button class='button' id='mainButton' type='submit'>")
    $("#mainButton").text("Submit")
//Div to dynamically recieve API info. Basically everything you guys do should end up here in some fashion.
    $("#mainSection").append("<div class='returnDiv' id='returnSection'>")
//Div for dynamically showing the map is on you guys since it will be part of a function
    })
})