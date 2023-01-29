var searchBtnEl = $("#search-button");
var currentDayEl = $("#currentDay");
var additionalCitiesDiv = $(".additionalCities");
var attachForecastEl = $(".attachForecast");
var jumboTempEl = $("#jumboTemp");
var jumboWindEl = $("#jumboWind");
var jumboHumidityEl = $("#jumboHumidity");
var jumboWeatherEl = $("#jumboWeatherIcon");
var jumboDescriptionEl = $("#jumboDescription");
var jumboHolderTitle = $("#todaysWeather");
var jumboHolderEl = $("#jumboHolder");
var searchCity = "";
var forecastURL = "";
var searchHistory = [];

var newButton = $("<button>");
var cardDiv = $("<div>");
var cardDate = $("<h5>");
var cardImg = $("<img>");
var cardUl = $("<ul>");
var cardLi1 = $("<li>");
var cardLi2 = $("<li>");
var cardLi3 = $("<li>");


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
  var LonLatURL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    searchCity +
    "&limit=1&appid=11a6edf7f55109a8876a082e0f89437e";

  // FIRST AJAX API CALL GIVES THE LONGITUDE AND LATITUDE CO ORDINATES
  $.ajax({
    url: LonLatURL,
    method: "GET",
  }).then(function (response) {
    if (response.length === 0) {
      $(currentDayEl).text("No match found for: " + searchCity);
      jumboHolderEl.empty();
      return;
    }
    console.log(response);
    console.log("search city: " + searchCity);
    console.log("response name: " + response.name);

    //SETS THE DATE AND CITY NAME
    $(currentDayEl).text(
      searchCity + ", " + response[0].country + today.format(" (MM/DD/YYYY)")
    );

    // READS API TO GET LON AND LAT COORDS
    var lat = response[0].lat.toString();
    var lon = response[0].lon.toString();

    console.log(lon, lat);
    // PASSES THE LAT AND LON COORDS INTO THE URL TO GRAB THE FORECAST INFO
    forecastURL = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&units=metric&cnt=6&appid=11a6edf7f55109a8876a082e0f89437e`;

    // SECOND AJAX CALL USES LONGITUDE AND LATITUDE VARS DEFINED IN PREV AJAX CALL
    $.ajax({
      url: forecastURL,
      method: "GET",
    }).then(function (responseForecast) {
      console.log(responseForecast);
      console.log(
        responseForecast.city.coord.lon,
        responseForecast.city.coord.lat
      );

      // UPDATES JUMBOTRON INFORMATION
      var jumboTempUnit = responseForecast.list[0].temp.day;
      var jumboTempIcon =
        "http://openweathermap.org/img/wn/" +
        responseForecast.list[0].weather[0].icon +
        "@2x.png";
      jumboHolderTitle.text("Today's weather:");
      jumboTempUnit = jumboTempUnit.toFixed(0) + "°C";
      jumboTempEl.text("Temperature: " + jumboTempUnit);
      jumboWindEl.text(
        "Wind Speed: " + responseForecast.list[0].speed + " k/ph"
      );
      jumboHumidityEl.text(
        "Humidity: " + responseForecast.list[0].humidity + "%"
      );
      jumboWeatherEl.attr("src", jumboTempIcon);
      jumboDescriptionEl.text(
        "Expected weather: " + responseForecast.list[0].weather[0].description
      );

      for (let i = 1; i < responseForecast.list.length; i++) {
        var date = new Date(responseForecast.list[i].dt * 1000);
        date = date.toLocaleDateString();
        var temperature = (responseForecast.list[i].temp.day - 32) * 0.5556;
        temperature = temperature.toFixed(0) + "°C";
        var humidity = responseForecast.list[i].humidity + "%";
        var tempIcon = "http://openweathermap.org/img/wn/" + responseForecast.list[i].weather[i].icon + "@2x.png";
        var windSpeed =  responseForecast.list[i].speed + " k/ph"
          attachForecastEl.append(cardDiv)
          cardDiv.addClass("card col-2")
          cardDiv.append(cardDate)
          cardDate.text(date)
          cardDiv.append(cardImg)
          cardImg.attr("src", tempIcon)
          cardImg.addClass("card-img-top")
          cardDiv.append(cardUl)
          cardUl.append(cardLi1)
          cardUl.append(cardLi2)
          cardUl.append(cardLi3)
          cardLi1.text("Temp: " + temperature)
          cardLi2.text("Wind: " + windSpeed)
          cardLi3.text("Humidity: " + humidity)
      }
    });
  });

  //EVENT LISTENER CLOSES
});
