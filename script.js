
//Declare variables
var currentCity = $("#current-city");

var city = "los angeles";

var listOfCities = ["Los Angeles"];




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

        var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&units=imperial&exclude=minutely,hourly,alerts&appid=${APIKey}`;

        $.ajax({
            url: queryURL,
            method: "GET"
            
            }).then(function(response2){
                console.log(response2);

                displayCurrentWeather(response2);
                displayForecastWeather(response2);
            });
    });
}

function displayCurrentWeather(response2) {
    // Note: The current city's cityName is passed through from Response 1 API
    var chosenCity = response1.main;
    var unixCurrentDate = moment.unix(response2.current.dt);
    var currentDate = unixCurrentDate.format("M/D/YYYY");
    var currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response2.current.weather[0].icon + ".png");

    $(currentCity).html(chosenCity + currentDate + currentIcon); 

}

function displayForecastWeather(response2) {

}


displayAllWeather(city);

