var searchBtnEl = $("#search-button");
var currentDayEl = $("#currentDay");
var additionalCitiesDiv = $(".additionalCities");
var forecastDisplayer = $(".attachForecast");
var jumboTempEl = $("#jumboTemp")
var jumboWindEl = $("#jumboWind")
var jumboHumidityEl = $("#jumboHumidity")
var searchCity = "";
var forecastURL = ""
var lat = 0
var lon = 0
var searchHistory = []

var newButton = $('<button>')
var newDiv = $("<div>")
var newh5 = $("<h5>")
var newImg = $("<img>")

var today = moment();
$(currentDayEl).text("Please search for a city");


// function renderSearchHistory(searchHistory) {
//         var newButton = $("<button>");
//         newButton.text(searchHistory);
//         newButton.addClass("form-input")
//         additionalCitiesDiv.append(newButton);
// }


searchBtnEl.on("click", function (event) {
  event.preventDefault();

  // GRABS THE CITY USER TYPES IN
  searchCity = document.querySelector("#search-input").value.toUpperCase();
  console.log("city is: " + searchCity);
  // renderSearchHistory(searchHistory)

  // PASSES THE CITY INTO THE URL TO GRAB THE LONGITUDE AND LATITUDE
  var LonLatURL ="http://api.openweathermap.org/geo/1.0/direct?q=" + searchCity + "&limit=1&appid=11a6edf7f55109a8876a082e0f89437e"; 


  // FIRST AJAX API CALL GIVES THE LONGITUDE AND LATITUDE CO ORDINATES
  $.ajax({
    url: LonLatURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    //SETS THE DATE AND CITY NAME
    $(currentDayEl).text(searchCity + ", " + response[0].country + today.format(" (MM/DD/YYYY)"));

    // READS API TO GET LON AND LAT COORDS
    lat = response[0].lon
    lon = response[0].lat

    console.log(lon, lat);
    // PASSES THE LAT AND LON COORDS INTO THE URL TO GRAB THE FORECAST INFO
    forecastURL = "http://api.openweathermap.org/data/2.5/forecast/daily?lat=" + lat + "&lon=" + lon + "&cnt=5&appid=11a6edf7f55109a8876a082e0f89437e"
    
    // SECOND AJAX CALL USES LONGITUDE AND LATITUDE VARS DEFINED IN PREV AJAX CALL
    $.ajax({
      url: forecastURL,
      method: "GET",
    }).then(function (responseForecast) {
      
      // console.log(responseForecast);
      console.log(responseForecast.city.coord.lon, responseForecast.city.coord.lat);
      // UPDATES JUMBOTRON INFORMATION
      // var jumboTempUnit = responseForecast.list[0].temp.day
      // console.log(jumboTempUnit);
      // jumboTempUnit = jumboTempUnit.toFixed(0) + "°C";
      // jumboTempEl.text("Temperature: " + jumboTempUnit);
      // jumboWindEl.text("Wind Speed: " + responseForecast.list[0].speed + " km/h");
      // jumboHumidityEl.text("Humidity: " + responseForecast.list[0].humidity + "%");
  
      // for (let i = 0; i < responseForecast.list.length; i++) {
  
        // var date = new Date(responseForecast.list[i].dt * 1000);
        // date = date.toLocaleDateString();
  
        // var temperature = (responseForecast.list[i].temp.day - 32) * 0.5556;
        // temperature = temperature.toFixed(0) + "°C";
  
        // var humidity = responseForecast.list[i].humidity + "%";
  
      // }
          // forecastDisplayer.append(newDiv)
          // newDiv.addClass("card col-2")
          // newDiv.append(newh5)
    });
  });


  //EVENT LISTENER CLOSES
});
