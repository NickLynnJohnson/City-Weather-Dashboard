
// Declare variables
var city = "";
var listOfCities = [];
// Current city/date variables
var currentDiv = $(".current-div");
var cityEntry = $("#city-entry");
var currentCity = $("#current-city");
var currentTemp = $("#current-temp");
var currentHumid = $("#current-humid");
var currentWind = $("#current-wind");
var currentUV = $("#current-uv");
var currentImage = $("#current-image");
var buttonsList = $("#buttons-list");

// Forecast date variables
var forecastRow = $(".forecast-row");

// API calls section
var APIKey = "479089a9990486902ba42a70c1a35171";

function displayAllWeather(city) {

    forecastRow.empty();

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

            $(currentImage).attr("src", "http://openweathermap.org/img/wn/" + response2.current.weather[0].icon + "@2x.png");

            $(currentCity).html(chosenCity + " " + currentDate); 
            currentCity.append(currentImage);
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
            for (var i = 1; i < 6; i++) {
                // Create the card
                var forecastCol = $("<div class='forecast col-2'>");
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

function populateCityList() {
    buttonsList.empty();

     var cityList = JSON.parse(localStorage.getItem("allcities"));

     for (i = 0; i < cityList.length; i++) {
         var cityButton = $("<button class='stored-city list-group-item'>").text(cityList[i]);
         buttonsList.prepend(cityButton);  
     }
}


function searchedCity(event) {
    event.preventDefault();

    if (cityEntry.val().trim() !== "") {
        city = cityEntry.val().trim();
        displayAllWeather(city)

        listOfCities.push(city.toUpperCase());
        localStorage.setItem("allcities", JSON.stringify(listOfCities));

        populateCityList();
    }
}

function selectedButton(event) {
    event.preventDefault();

    console.log("Hi");

    var selectedCity = event.target;

    console.log("Selected City " + selectedCity);

    if (event.target.matches("button")) {
        var eventCity = selectedCity.textContent;

        console.log(eventCity);
        displayAllWeather(eventCity);
    }


    //var selectedCity = event.target;

    // if (event.target.matches("button")) {
    //     var selectedCity = event.target.textContent;

    //     console.log(selectedCity);
    //     displayAllWeather(selectedCity);
    // }
}

function pageRefresh() {
    
    var listOfCities = JSON.parse(localStorage.getItem("allcities"));

    if (listOfCities !== null) {
        recentCity = listOfCities[listOfCities.length-1];

        displayAllWeather(recentCity);
    }
}



// Initiating actions
$("#add-city").on("click", searchedCity);
$(document).on("click", selectedButton);
$(window).on("load", pageRefresh);



