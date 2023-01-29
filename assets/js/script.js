var searchBtnEl = $("#search-button");
var currentDayEl = $("#currentDay");
var additionalCitiesDiv = $(".additionalCities");
var forecastDisplayer = $(".attachForecast");
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
$(currentDayEl).text("LONDON, GB" + today.format(" (MM/DD/YYYY)"));

function renderSearchHistory(searchHistory) {
        var newButton = $("<button>");
        newButton.text(searchHistory);
        newButton.addClass("form-input")
        additionalCitiesDiv.append(newButton);
}

searchBtnEl.on("click", function (event) {
  event.preventDefault();

  // GRABS THE CITY USER TYPES IN
  searchCity = document.querySelector("#search-input").value.toUpperCase();

  console.log("city is: " + searchCity);
  searchHistory = searchCity
  console.log(searchHistory);
  renderSearchHistory(searchHistory)


  // CREATE URL TO RUN THE API CALL
  var queryURL = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + searchCity + "&units=metric&cnt=5&appid=11a6edf7f55109a8876a082e0f89437e"

  //USE AJAX TO DO API CALL TO DISPLAY CITY  AND WEATHER INFO
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var date = new Date(response.list[1].dt * 1000)
    date = date.toLocaleDateString()
    console.log(date);
      $(currentDayEl).text(searchCity + ", " + response.city.country + today.format(" (MM/DD/YYYY)"));

        // forecastDisplayer.append(newDiv)
        // newDiv.addClass("card col-2")
        // newDiv.append(newh5)
  });



  //EVENT LISTENER CLOSES
});