var searchCity = document.querySelector("#search-input");
var searchBtnEl = $("#search-button");
var currentDayEl = $("#currentDay");

var today = moment()
$(currentDayEl).text(searchCity.value + today.format("dddd, MMMM Do"));

searchBtnEl.on("click", function (event) {
  event.preventDefault();
  searchCity = $(searchCity).val()
  console.log("city is: " + searchCity);
});

var citytoLonLatURL = "http://api.openweathermap.org/geo/1.0/direct?q=" +  searchCity.val + "&limit=1&appid=11a6edf7f55109a8876a082e0f89437e"
$.ajax({
    url : citytoLonLatURL,
    method : "GET"
}).then (function (response) {
    console.log(response);
})