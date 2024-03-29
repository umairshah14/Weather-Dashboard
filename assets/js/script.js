//GLOBAL VARIABLES
var city = "";
var forecastURL = "";
var searchHistory = []
var today = moment();

//DOM REFERENCES
var searchBtnEl = $("#search-button");
var currentDayEl = $("#currentDay");
var additionalCitiesDiv = $(".additionalCities");
var attachForecastEl = $("#attachForecast");
var jumboTempEl = $("#jumboTemp");
var jumboWindEl = $("#jumboWind");
var jumboHumidityEl = $("#jumboHumidity");
var jumboWeatherEl = $("#jumboWeatherIcon");
var jumboDescriptionEl = $("#jumboDescription");
var jumboHolderTitle = $("#todaysWeather");
var jumboHolderEl = $("#jumboHolder");
var cityInfoEl = $("#cityInfo");

$(currentDayEl).text("Please search for a city to begin");
jumboHolderEl.hide()
jumboWeatherEl.hide()

// CREATES A BUTTON FOR THE CITY YOU JUST SEARCHED FOR
function CreateSearchHistoryButtons(){
  additionalCitiesDiv.html("")

  searchHistory.forEach((cityName) =>{
    var storedCity = $(("<button>"))
    storedCity.text(cityName)
    storedCity.attr("data-search", cityName)
    storedCity.attr('aria-controls', 'today forecast');
    storedCity.addClass("btn btnWidth btn-dark spaceAround2 btn-history")
    additionalCitiesDiv.append(storedCity)
  })
}

// GETS THE NAME OF THE CITY YOU JUST SEARCHED FOR FROM LOCAL STORAGE
function getSearchHistory() {
  var citySearched = localStorage.getItem("citiesSearched")
  
  // CHECKS IF THERE IS ANY EXISTING SEARCH HISTORY
  if(citySearched){
    searchHistory = JSON.parse(localStorage.getItem("citiesSearched"))
  }
  CreateSearchHistoryButtons()
}

// ADDS THE CITY YOU SEARCHED FOR TO LOCAL STORAGE
function addCity(city){

  // CHECKS TO SEE IF CITY IS ALREADY IN THE ARRAY BEFORE SETTING TO STORAGE
  if (!searchHistory.includes(city)){
    searchHistory.push(city)
    localStorage.setItem("citiesSearched", JSON.stringify(searchHistory))

  }
  CreateSearchHistoryButtons()
}

// TAKES IN THE CITY SEARCHED AND GRABS THE WEATHER INFO FOR THAT CITY
function grabWeatherInfo(city) {

  // PASSES THE CITY INTO THE URL TO GRAB THE LONGITUDE AND LATITUDE
  var LonLatURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=11a6edf7f55109a8876a082e0f89437e";

  // FIRST AJAX API CALL GIVES THE LONGITUDE AND LATITUDE CO ORDINATES
  $.ajax({
    url: LonLatURL,
    method: "GET",
  }).then(function (response) {

    // CHECKS IF A VALID CITY HAS BEEN ENTERED
    if (response.length === 0) {
      $(currentDayEl).text("No match found for: " + city);
      jumboHolderEl.hide()
      jumboWeatherEl.hide()
      $("#infoHere").empty();
      $("#5dayCast").text("");
      return;
    }

    //ADD THE BUTTON FOR THE CITY JUST SEARCHED
    addCity(city)

    //SETS THE DATE AND CITY NAME
    $(currentDayEl).text(
      city + ", " + response[0].country + today.format(" (DD/MM/YYYY)")
    );

    // READS API TO GET LON AND LAT COORDS
    var lat = response[0].lat.toString();
    var lon = response[0].lon.toString();

    // PASSES THE LAT AND LON COORDS INTO THE URL TO GRAB THE FORECAST INFO
    forecastURL = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&units=metric&cnt=5&appid=11a6edf7f55109a8876a082e0f89437e`;

    // SECOND AJAX CALL USES LONGITUDE AND LATITUDE VARS DEFINED IN PREV AJAX CALL
    $.ajax({
      url: forecastURL,
      method: "GET",
    }).then(function (responseForecast) {
      console.log(responseForecast);

      // UPDATES JUMBOTRON INFORMATION
      jumboHolderEl.show()
      jumboWeatherEl.show()
      var jumboTempUnit = responseForecast.list[0].temp.day;
      var jumboTempIcon ="http://openweathermap.org/img/wn/" + responseForecast.list[0].weather[0].icon +"@2x.png";
      jumboHolderTitle.text("Today's weather:");
      jumboTempUnit = jumboTempUnit.toFixed(0) + "°C";
      jumboTempEl.text("Temperature: " + jumboTempUnit);
      jumboWindEl.text("Wind Speed: " + responseForecast.list[0].speed + " k/ph");
      jumboHumidityEl.text("Humidity: " + responseForecast.list[0].humidity + "%");
      jumboWeatherEl.attr("src", jumboTempIcon);
      jumboDescriptionEl.text("Expected weather: " + responseForecast.list[0].weather[0].description);

      $("#infoHere").empty();
      $("#5dayCast").text("5 DAY FORECAST: ");

      for (let i = 0; i < responseForecast.list.length; i++) {
        var date = new Date(responseForecast.list[i].dt * 1000);
        date = date.toLocaleDateString();
        var tempIcon ="http://openweathermap.org/img/wn/" +responseForecast.list[i].weather[0].icon +"@2x.png";
        var temperature = responseForecast.list[i].temp.day;
        temperature = temperature.toFixed(0) + "°C";
        var windSpeed = responseForecast.list[i].speed + " k/ph";
        var humidity = responseForecast.list[i].humidity + "%";
        /// create the card
        let cardDiv = $("<div>");
        let cardDate = $("<h5>");
        let cardImg = $("<img>");
        let cardUl = $("<ul>");
        let cardLi1 = $("<li>");
        let cardLi2 = $("<li>");
        let cardLi3 = $("<li>");
        let cardLi4 = $("<li>");
        let attachForecastEl = $("<div>");

        // attach the card to the page
        attachForecastEl.append(cardDiv);
        cardDiv.addClass("card col-12 spaceAround");
        cardDiv.append(cardDate);
        cardDate.text(date);
        cardDiv.append(cardImg);
        cardImg.attr("src", tempIcon);
        cardImg.addClass("card-img-top");
        cardDiv.append(cardUl);
        cardUl.addClass("list-group list-group-flush");
        cardUl.append(cardLi4);
        cardUl.append(cardLi1);
        cardUl.append(cardLi2);
        cardUl.append(cardLi3);
        cardLi4.text(responseForecast.list[i].weather[0].description);
        cardLi1.text("Temp: " + temperature);
        cardLi2.text("Wind: " + windSpeed);
        cardLi3.text("Humidity: " + humidity);
        cardLi4.addClass("list-group-item");
        cardLi1.addClass("list-group-item");
        cardLi2.addClass("list-group-item");
        cardLi3.addClass("list-group-item");
        $("#infoHere").append(attachForecastEl);
      }
    });
    //EVENT LISTENER CLOSES
  });
}

// THIS GRABS THE CITY YOU SEARCHED FOR TO THEN PASS IT IN TO THE ON CLICK LISTENER ATTACHED TO "additionalCitiesDiv"
function historySearchShortcut (event){
  event.preventDefault()
  console.log("INSIDE HANDLE SEARCH");
  console.log(event.target);
  if (!$(event.target).hasClass("btn-history")){
    return
  }
  var search = $(event.target).data("search")
  grabWeatherInfo(search)
}

getSearchHistory()

searchBtnEl.on("click", function(){
  city = document.querySelector("#search-input").value.toUpperCase();
  grabWeatherInfo(city)
})
additionalCitiesDiv.on("click", historySearchShortcut)
