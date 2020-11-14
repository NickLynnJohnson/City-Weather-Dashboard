
//Declare variables
//var city = "";


//Example city
var city = "los angeles";


//City array (make it a global variable) prepopulated with Los Angeles

// Click event for search box
//Input box for specific city



var listOfCities = ["Los Angeles"];


//API Key used for both current (including additional UV query) and forecast weather functions below




//Function for getting the current weather


//get lat lon







// function getCityCoordinates(city) {
   
//     var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;



//     $.ajax({
//         url: queryURL,
//         method: "GET"

//     }).then(function(response){
//         console.log(response);

//         insideCityCoordinates = {
//             cityLat: response.coord.lat,
//             cityLon: response.coord.lon
//         }
//     });
// }

var APIKey = "479089a9990486902ba42a70c1a35171";

function displayAllWeather(city) {

    // First, call OpenWeatherMap's "Current Weather Data"  by city to get that city's Lat and Lon coordinates
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function(response1){
        console.log(response1);

        var cityLat = response1.coord.lat;
        var cityLon = response1.coord.lon;

        // Second, call OpenWeatherMap's "One Call API" by that city's Lat and Lon coordinates to get both the current and forecast weather data

        var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&units=imperial&exclude=minutely,hourly,daily,alerts&appid=${APIKey}`;

        $.ajax({
            url: queryURL,
            method: "GET"
            
            }).then(function(response2){
                console.log(response2);

                displayCurrentWeather();
                displayForecastWeather();
            });
    });
}

function displayCurrentWeather() {

}

function displayForecastWeather() {

}







displayAllWeather(city);



// function getCityWeather(cityLat, cityLon) {
//     var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&units=imperial&exclude=minutely,hourly,daily,alerts&appid=${APIKey}`;

//     $.ajax({
//         url: queryURL,
//         method: "GET"

//     }).then(function(response){
//         console.log(response);

//     });
// }

//getCityCoordinates(city);

// function displayAllWeather(city) {
//     getCityCoordinates(city);
//     var outsideCityCoordinates = getCityCoordinates(city);
//     getCityWeather(cityLat, cityLon);
// }


// Action: Click Handlers
//$("#search-button").on("click", displayAllWeather);



//http errors 

//get weather data one call

//getCityCoordinates(city);

//Function for getting the forecast weather
//function getWeatherForecast


//color code UV index 3 or less etc. 4 - 8  (bootstrap colors)



//function called to Empty Div first iterate in city history array create UL tag, as iterate create li item (button or list item) 1) check if cities in local storage, target searchedCities 
//ul has class / append li to that class / li need an id of the city / outside of function another click event where target class ul
//target id .val.trim

//weather icon concatenated with string .png


//date in Unix therefore use moment

//exlude minutely, alerts, etc.

//units: choose imperial

// &units=imperial

// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;