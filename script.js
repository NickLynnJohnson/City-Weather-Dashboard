

//Declare variables



var APIKey = "479089a9990486902ba42a70c1a35171";

var city = "los angeles";

var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

$.ajax({
    url: queryURL,
    method: "GET"

}).then(function(response){
    console.log(response);
});

console.log("Hello");