var searchBtnEl = $("#search-button");
var currentDayEl = $("#currentDay");
var searchCity = "";
var today = moment();
var forecastURL = ""
$(currentDayEl).text("London" + today.format(" (MM/DD/YYYY)"));

searchBtnEl.on("click", function (event) {
  event.preventDefault();
  // GRABS THE CITY USER TYPES IN
  searchCity = document.querySelector("#search-input").value.toUpperCase();
  console.log("city is: " + searchCity);

  //SETS THE DATE
  $(currentDayEl).text(searchCity + today.format(" (MM/DD/YYYY)"));

  // PASSES THE CITY INTO THE URL TO GRAB THE LONGITUDE AND LATITUDE
  var LonLatURL ="http://api.openweathermap.org/geo/1.0/direct?q=" + searchCity + "&limit=1&appid=11a6edf7f55109a8876a082e0f89437e";

  // FIRST AJAX API CALL GIVES THE LONGITUDE AND LATITUDE CO ORDINATES
  $.ajax({
    url: LonLatURL,
    method: "GET",
  }).then(function (response) {
    var lat = response[0].lon;
    var lon = response[0].lat;
    console.log("Longitude: " + lat);
    console.log("Latitude: " + lon);
  });


  // SECOND AJAX CALL USES LONGITUDE AND LATITUDE DEFINED IN PREV AJAX CALL
  forecastURL ="api.openweathermap.org/data/2.5/forecast/daily?lat=" + lat + "&lon=" + lon +"&cnt=5&appid=11a6edf7f55109a8876a082e0f89437e";
    
  $.ajax({
      url: forecastURL,
      method: "GET",
  }).then(function (responseForecast) {
      console.log(responseForecast);
  });

  //EVENT LISTENER CLOSES
});
