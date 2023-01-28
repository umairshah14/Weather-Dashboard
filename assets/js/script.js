var searchBtnEl = $("#search-button");
var currentDayEl = $("#currentDay");

var searchCity = "";

searchBtnEl.on("click", function (event) {
  event.preventDefault();
  searchCity = document.querySelector("#search-input").value;
  console.log("city is: " + searchCity);

  //SETS THE DATE
  var today = moment();
  $(currentDayEl).text(searchCity + today.format(" (dddd, MMMM Do)"));

  var citytoLonLatURL = "http://api.openweathermap.org/geo/1.0/direct?q=" +  searchCity + "&limit=1&appid=11a6edf7f55109a8876a082e0f89437e"
  $.ajax({
      url : citytoLonLatURL,
      method : "GET"
  }).then (function (response) {
      console.log(response);
  })
});
