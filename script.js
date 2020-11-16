
// Declare variables
// Current city/date variables
var currentCity = $("#current-city");
var currentTemp = $("#current-temp");
var currentHumid = $("#current-humid");
var currentWind = $("#current-wind");
var currentUV = $("#current-uv");


// Forecast date variables
var forecastRow = $(".forecast-row");





var city = "seattle";

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

        var chosenCity = response1.name;
        var cityLat = response1.coord.lat;
        var cityLon = response1.coord.lon;

        // Second, call OpenWeatherMap's "One Call API" by that city's Lat and Lon coordinates to get both the current and forecast weather data

        var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&units=imperial&exclude=minutely,hourly,alerts&appid=${APIKey}`;

        $.ajax({
            url: queryURL,
            method: "GET"
            
        }).then(function(response2) {
            console.log(response2);

            // (1/2) Display Weather: Current

            var unixCurrentDate = moment.unix(response2.current.dt);
            var currentDate = unixCurrentDate.format("MM/DD/YYYY");
            var currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response2.current.weather[0].icon + "@2x.png");

            $(currentCity).html(chosenCity + " " + currentDate + " " + currentIcon); 
            $(currentTemp).html(response2.current.temp + "&#8457");
            $(currentHumid).html(response2.current.humidity + "%");
            $(currentWind).html(response2.current.wind_speed + "MPH");

            var currentUVIndex = response2.current.uvi;

            $(currentUV).html(currentUVIndex);

                // UV Index scale source: https://en.wikipedia.org/wiki/Ultraviolet_index
                if (currentUVIndex >= 0 && currentUVIndex <= 2.9) {
                    $(currentUV).attr("class", "green");
                } else if (currentUVIndex >= 3 && currentUVIndex <= 5.9) {
                    $(currentUV).attr("class", "yellow");
                } else if (currentUVIndex >= 6 && currentUVIndex <= 7.9) {
                    $(currentUV).attr("class", "orange");
                } else if (currentUVIndex >= 8 && currentUVIndex <= 10.9) {
                    $(currentUV).attr("class", "red");
                } else {
                    $(currentUV).attr("class", "violet");
                }

            // (2/2) Display Weather: Forecast
            for (var i = 0; i < 5; i++) {
                // Create the card
                var forecastCol = $("<div class='col-2'>");
                forecastRow.append(forecastCol);
                var forecastCard = $("<div class='card text-white bg-primary'>");
                forecastCol.append(forecastCard);
                var forecastCardBody = $("<div class='card-body'>");
                forecastCard.append(forecastCardBody);

                // Fill the card
                var unixForecastDate = moment.unix(response2.daily[i].dt);
                var forecastDate = unixForecastDate.format("MM/DD/YYYY");
                var forecastCardTitle = $("<h5 class='card-title'>").text(forecastDate);

                var forecastIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response2.daily[i].weather[0].icon + ".png");
                var forecastTempDay = $("<p class='card-text'>").html("Temp:" + response2.daily[i].temp.day + "&#8457");
                var forecastHumid = $("<p class='card-text'>").html("Humidity:" + response2.daily[i].humidity + "%");
                
                forecastCardBody.append(forecastCardTitle, forecastIcon, forecastTempDay, forecastHumid);
            }
        });
    });
}




displayAllWeather(city);

