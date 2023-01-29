var searchBtnEl = $("#search-button");
var currentDayEl = $("#currentDay");
var additionalCitiesDiv = $(".additionalCities");
var forecastDisplayer = $(".attachForecast");
var searchCity = "";
var forecastURL = ""
var lat = 0
var lon = 0

var newDiv = $("<div>")
var newh5 = $("<h5>")
var newImg = $("<img>")

var today = moment();
$(currentDayEl).text("LONDON, GB" + today.format(" (MM/DD/YYYY)"));

var newButton = $('<button>')
searchBtnEl.on("click", function (event) {
  event.preventDefault();
  // GRABS THE CITY USER TYPES IN
  searchCity = document.querySelector("#search-input").value.toUpperCase();
  console.log("city is: " + searchCity);
  additionalCitiesDiv.append(newButton)
  newButton.addClass("btn btnWidth btn-light quickSearchItem")
  newButton.text(searchCity)

  // PASSES THE CITY INTO THE URL TO GRAB THE LONGITUDE AND LATITUDE
  var LonLatURL ="http://api.openweathermap.org/geo/1.0/direct?q=" + searchCity + "&limit=1&appid=11a6edf7f55109a8876a082e0f89437e";

  // FIRST AJAX API CALL GIVES THE LONGITUDE AND LATITUDE CO ORDINATES
  $.ajax({
    url: LonLatURL,
    method: "GET",
  }).then(function (response) {

    //SETS THE DATE AND CITY NAME
    $(currentDayEl).text(searchCity + ", " + response[0].country + today.format(" (MM/DD/YYYY)"));
    lat = response[0].lon;
    lon = response[0].lat;
    console.log("Longitude: " + lat);
    console.log("Latitude: " + lon);
  });

  // SECOND AJAX CALL USES LONGITUDE AND LATITUDE DEFINED IN PREV AJAX CALL
  forecastURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&cnt=15&appid=11a6edf7f55109a8876a082e0f89437e"
                       
  $.ajax({
    url: forecastURL,
    method: "GET",
  }).then(function (responseForecast) {
    console.log(responseForecast);

    for (let i = 0; i < 5; i++) {
     
        forecastDisplayer.append(newDiv)
        newDiv.addClass("card col-2")
        newDiv.append(newh5)
        
    }


  });



  //EVENT LISTENER CLOSES
});
