var searchCity = $("#search-input").val();
var searchBtnEl = $("#search-button")

searchBtnEl.on("click", function(event){
    event.preventDefault();
    console.log("city is: " + searchCity);
})