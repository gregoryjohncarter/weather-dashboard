var today = new Date();
var apiKey = "2fdc7aca44061435df6123deff5f269c";
var correctDate = today.getMonth() + 1;
var todayDate = correctDate+"/"+today.getDate()+"/"+today.getFullYear();
var idCounter = 0;

    // check if the array was gotten already
    if (!tagArray) {
        var tagArray = [];
    }

// function to add days to a string dynamically
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

var getTodaysWeather = function(cityName) {
    // format the openweather api
    var apiUrl1 = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=imperial";
    
    fetch(apiUrl1).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                responseLat = data.coord.lat;
                responseLon = data.coord.lon;

                // second api call to onecall with the lat and long from the first call, to garner more results
                var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + responseLat + "&lon=" + responseLon + "&exclude=minutely,hourly&appid=" + apiKey + "&units=imperial";
                fetch(apiUrl2).then(function(response) {
                    if (response.ok) {
                        response.json().then(function(data) {
                            //console.log(data)
                            displayWeather(data, cityName);
                        })
                    }
                });
            });
        } else {
            alert("Error: City name not registered");
        }
    })
    .catch(function(error) {
        alert("Unable to find city");
    });
};

// todays weather div to be appended to
var todayEl = document.querySelector("#today-weather");

// used to submit the search and define the cityname
var formSubmitHandler = function(event) {
    event.preventDefault();

    var cityName = cityNameEl.value.trim();

    if (cityName) {
        getTodaysWeather(cityName);
        cityNameEl.value = "";
    } else {
        alert("Please enter a city name!");
    }
};

var displayWeather = function(weather, city) {
    // remove the old current and 5day categories
     $(".flex-row").remove();
     $(".five-day-div").remove();
    
    // check if api returned any weather
    if (weather.length === 0) {
        todayEl.textContent = "This city is not registered!"
        return;
    }
    
    // grab the icon and convert format
    var todayIcon = weather.current.weather[0].icon;
    var icon = JSON.stringify(todayIcon);
    icon = icon.replace("\"","");
    icon = icon.replace("\"","");

    // format city name
    var city = city.charAt(0).toUpperCase() + city.slice(1);

    // increment the counter
    idCounter += 1;

    // create todayEl title
    var todayElTitle = document.createElement("h2");
    todayElTitle.innerHTML = city + " (" + todayDate + ")" + "<img src='http://openweathermap.org/img/w/" + icon + ".png' width='55' height='55'/>";
    todayEl.appendChild(todayElTitle);
    todayElTitle.classList = "flex-row todayElTitle"

    var todayElQualities = document.createElement("p");
    
    // stringify values for each quality
    var todayTemp = weather.current.temp;
    var temp = JSON.stringify(todayTemp);
    temp = temp.replace("\"","");
    temp = temp.replace("\"","");

    var todayWind = weather.daily[0].wind_speed;
    var wind = JSON.stringify(todayWind);
    wind = wind.replace("\"","");
    wind = wind.replace("\"","");

    var todayHumidity = weather.daily[0].humidity;
    var humidity = JSON.stringify(todayHumidity);
    humidity = humidity.replace("\"","");
    humidity = humidity.replace("\"","");

    var todayUV = weather.daily[0].uvi;
    var uv = JSON.stringify(todayUV);
    uv = uv.replace("\"","");
    uv = uv.replace("\"","");

    // display different colors depending on the UV index
    uv = parseInt(uv);
    if (uv < 3) {
        todayElQualities.innerHTML = "Temp: " + temp + "°F <br>Wind: " + wind + " MPH <br>Humidity: " + humidity + "% <br>UV Index: <span class='uvSpan3'>  " + uv + "  </span>";
    } else if (uv < 6 && uv > 2) {
        todayElQualities.innerHTML = "Temp: " + temp + "°F <br>Wind: " + wind + " MPH <br>Humidity: " + humidity + "% <br>UV Index: <span class='uvSpan2'>  " + uv + "  </span>";
    } else {
        todayElQualities.innerHTML = "Temp: " + temp + "°F <br>Wind: " + wind + " MPH <br>Humidity: " + humidity + "% <br>UV Index: <span class='uvSpan1'>  " + uv + "  </span>";
    }

    // append the current weather to the div, with class flex row to enable jquery to remove later
    todayEl.appendChild(todayElQualities);
    todayElQualities.classList = "flex-row todayElQualities"

    // create a recent button with the idCounter increment
    var recentBtn = document.createElement("button");
    recentBtn.textContent = "" + city;
    var recentSearches = document.querySelector("#recent-searches");
    recentBtn.setAttribute("id", "btn" + (idCounter - 1))
    recentBtn.classList = "recent-btn"
    recentSearches.appendChild(recentBtn);

    // create divs and ps for five days
    var fiveDiv1 = document.createElement("div");
    fiveDiv1.classList = "five-day-div"
    
    var fiveP1 = document.createElement("p");
    fiveP1.classList = "divP"

    var fiveDiv2 = document.createElement("div");
    fiveDiv2.classList = "five-day-div"

    var fiveP2 = document.createElement("p");
    fiveP2.classList = "divP"

    var fiveDiv3 = document.createElement("div");
    fiveDiv3.classList = "five-day-div"

    var fiveP3 = document.createElement("p");
    fiveP3.classList = "divP"

    var fiveDiv4 = document.createElement("div");
    fiveDiv4.classList = "five-day-div"

    var fiveP4 = document.createElement("p");
    fiveP4.classList = "divP"

    var fiveDiv5 = document.createElement("div");
    fiveDiv5.classList = "five-day-div"

    var fiveP5 = document.createElement("p");
    fiveP5.classList = "divP"

    var fiveDayDiv = document.querySelector("#five-day")

    // grab the icon 5day and convert format
    var todayIcon1 = weather.daily[1].weather[0].icon;
    var icon1 = JSON.stringify(todayIcon1);
    icon1 = icon1.replace("\"","");
    icon1 = icon1.replace("\"","");

     // stringify values 5day for each quality
     var todayTemp1 = weather.daily[1].temp.day;
     var temp1 = JSON.stringify(todayTemp1);
     temp1 = temp1.replace("\"","");
     temp1 = temp1.replace("\"","");
 
     var todayWind1 = weather.daily[1].wind_speed;
     var wind1 = JSON.stringify(todayWind1);
     wind1 = wind1.replace("\"","");
     wind1 = wind1.replace("\"","");
 
     var todayHumidity1 = weather.daily[1].humidity;
     var humidity1 = JSON.stringify(todayHumidity1);
     humidity1 = humidity1.replace("\"","");
     humidity1 = humidity1.replace("\"","");

    fiveP1.innerHTML = addDays(today, 1).toLocaleDateString("en-US") + "<br><img src='http://openweathermap.org/img/w/" + icon1 + ".png' width='55' height='55'/><br>Temp: " + temp1 + " °F<br>Wind: " + wind1 + " MPH<br>Humidity: " + humidity1 +"%";
    fiveDayDiv.appendChild(fiveDiv1);
    fiveDiv1.appendChild(fiveP1)

    var todayIcon2 = weather.daily[2].weather[0].icon;
    var icon2 = JSON.stringify(todayIcon2);
    icon2 = icon2.replace("\"","");
    icon2 = icon2.replace("\"","");

    var todayTemp2 = weather.daily[2].temp.day;
     var temp2 = JSON.stringify(todayTemp2);
     temp2 = temp2.replace("\"","");
     temp2 = temp2.replace("\"","");
 
     var todayWind2 = weather.daily[2].wind_speed;
     var wind2 = JSON.stringify(todayWind2);
     wind2 = wind2.replace("\"","");
     wind2 = wind2.replace("\"","");
 
     var todayHumidity2 = weather.daily[2].humidity;
     var humidity2 = JSON.stringify(todayHumidity2);
     humidity2 = humidity2.replace("\"","");
     humidity2 = humidity2.replace("\"","");

     fiveP2.innerHTML = addDays(today, 2).toLocaleDateString("en-US") + "<br><img src='http://openweathermap.org/img/w/" + icon2 + ".png' width='55' height='55'/><br>Temp: " + temp2 + " °F<br>Wind: " + wind2 + " MPH<br>Humidity: " + humidity2 +"%";
    fiveDayDiv.appendChild(fiveDiv2);
    fiveDiv2.appendChild(fiveP2)

    var todayIcon3 = weather.daily[3].weather[0].icon;
    var icon3 = JSON.stringify(todayIcon3);
    icon3 = icon3.replace("\"","");
    icon3 = icon3.replace("\"","");

    var todayTemp3 = weather.daily[3].temp.day;
     var temp3 = JSON.stringify(todayTemp3);
     temp3 = temp3.replace("\"","");
     temp3 = temp3.replace("\"","");
 
     var todayWind3 = weather.daily[3].wind_speed;
     var wind3 = JSON.stringify(todayWind3);
     wind3 = wind3.replace("\"","");
     wind3 = wind3.replace("\"","");
 
     var todayHumidity3 = weather.daily[3].humidity;
     var humidity3 = JSON.stringify(todayHumidity3);
     humidity3 = humidity3.replace("\"","");
     humidity3 = humidity3.replace("\"","");

     fiveP3.innerHTML = addDays(today, 3).toLocaleDateString("en-US") + "<br><img src='http://openweathermap.org/img/w/" + icon3 + ".png' width='55' height='55'/><br>Temp: " + temp3 + " °F<br>Wind: " + wind3 + " MPH<br>Humidity: " + humidity3 +"%";
    fiveDayDiv.appendChild(fiveDiv3);
    fiveDiv3.appendChild(fiveP3)

    var todayIcon4 = weather.daily[4].weather[0].icon;
    var icon4 = JSON.stringify(todayIcon4);
    icon4 = icon4.replace("\"","");
    icon4 = icon4.replace("\"","");

    var todayTemp4 = weather.daily[4].temp.day;
     var temp4 = JSON.stringify(todayTemp4);
     temp4 = temp4.replace("\"","");
     temp4 = temp4.replace("\"","");
 
     var todayWind4 = weather.daily[4].wind_speed;
     var wind4 = JSON.stringify(todayWind4);
     wind4 = wind4.replace("\"","");
     wind4 = wind4.replace("\"","");
 
     var todayHumidity4 = weather.daily[4].humidity;
     var humidity4 = JSON.stringify(todayHumidity4);
     humidity4 = humidity4.replace("\"","");
     humidity4 = humidity4.replace("\"","");

     fiveP4.innerHTML = addDays(today, 4).toLocaleDateString("en-US") + "<br><img src='http://openweathermap.org/img/w/" + icon4 + ".png' width='55' height='55'/><br>Temp: " + temp4 + " °F<br>Wind: " + wind4 + " MPH<br>Humidity: " + humidity4 +"%";
    fiveDayDiv.appendChild(fiveDiv4);
    fiveDiv4.appendChild(fiveP4)

    var todayIcon5 = weather.daily[5].weather[0].icon;
    var icon5 = JSON.stringify(todayIcon5);
    icon5 = icon5.replace("\"","");
    icon5 = icon5.replace("\"","");

    var todayTemp5 = weather.daily[5].temp.day;
     var temp5 = JSON.stringify(todayTemp5);
     temp5 = temp5.replace("\"","");
     temp5 = temp5.replace("\"","");
 
     var todayWind5 = weather.daily[5].wind_speed;
     var wind5 = JSON.stringify(todayWind5);
     wind5 = wind5.replace("\"","");
     wind5 = wind5.replace("\"","");
 
     var todayHumidity5 = weather.daily[5].humidity;
     var humidity5 = JSON.stringify(todayHumidity5);
     humidity5 = humidity5.replace("\"","");
     humidity5 = humidity5.replace("\"","");

     fiveP5.innerHTML = addDays(today, 5).toLocaleDateString("en-US") + "<br><img src='http://openweathermap.org/img/w/" + icon5 + ".png' width='55' height='55'/><br>Temp: " + temp5 + " °F<br>Wind: " + wind5 + " MPH<br>Humidity: " + humidity5 +"%";
    fiveDayDiv.appendChild(fiveDiv5);
    fiveDiv5.appendChild(fiveP5);

    // SECTION FOR LOCALSTORAGE SETTING **function
    function setElement() {
        var cityElement = {};
        
        // keep count of cities searched and therefore buttons
        localStorage.setItem("idCounter", idCounter);
        cityElement.idCounter = idCounter;

        cityElement.city = city;
        cityElement.icon = todayIcon;
        cityElement.temp = todayTemp;
        cityElement.wind = todayWind;
        cityElement.humidity = todayHumidity;
        cityElement.uv = todayUV

        cityElement.icon1 = todayIcon1;
        cityElement.temp1 = todayTemp1;
        cityElement.wind1 = todayWind1;
        cityElement.humidity1 = todayHumidity1;

        cityElement.icon2 = todayIcon2;
        cityElement.temp2 = todayTemp2;
        cityElement.wind2 = todayWind2;
        cityElement.humidity2 = todayHumidity2;

        cityElement.icon3 = todayIcon3;
        cityElement.temp3 = todayTemp3;
        cityElement.wind3 = todayWind3;
        cityElement.humidity3 = todayHumidity3;

        cityElement.icon4 = todayIcon4;
        cityElement.temp4 = todayTemp4;
        cityElement.wind4 = todayWind4;
        cityElement.humidity4 = todayHumidity4;

        cityElement.icon5 = todayIcon5;
        cityElement.temp5 = todayTemp5;
        cityElement.wind5 = todayWind5;
        cityElement.humidity5 = todayHumidity5;
        
        tagArray.push(cityElement);
        localStorage.setItem("tagArray", JSON.stringify(tagArray));   
    }

    setElement();

        // button handler for adding click events for the buttons
        $(document).on('click','#btn' + (idCounter - 1),function() {
            // remove the old current and 5day categories
            $(".flex-row").remove();
            $(".five-day-div").remove();
            
            tagArray = localStorage.getItem("tagArray");
            tagArray = JSON.parse(tagArray);
            
            // grab the icon and convert format
            var todayIcon = tagArray[idCounter - 1].icon;
            var icon = JSON.stringify(todayIcon);
            icon = icon.replace("\"","");
            icon = icon.replace("\"","");

            // format city name
            var city = tagArray[idCounter - 1].city;

            // create todayEl title
            var todayElTitle = document.createElement("h2");
            todayElTitle.innerHTML = city + " (" + todayDate + ")" + "<img src='http://openweathermap.org/img/w/" + icon + ".png' width='55' height='55'/>";
            todayEl.appendChild(todayElTitle);
            todayElTitle.classList = "flex-row todayElTitle"

            var todayElQualities = document.createElement("p");
            
            // stringify values for each quality
            var todayTemp = tagArray[idCounter - 1].temp;
            var temp = JSON.stringify(todayTemp);
            temp = temp.replace("\"","");
            temp = temp.replace("\"","");

            var todayWind = tagArray[idCounter - 1].wind;
            var wind = JSON.stringify(todayWind);
            wind = wind.replace("\"","");
            wind = wind.replace("\"","");

            var todayHumidity = tagArray[idCounter - 1].humidity;
            var humidity = JSON.stringify(todayHumidity);
            humidity = humidity.replace("\"","");
            humidity = humidity.replace("\"","");

            var todayUV = tagArray[idCounter - 1].uv
            var uv = JSON.stringify(todayUV);
            uv = uv.replace("\"","");
            uv = uv.replace("\"","");

            // display different colors depending on the UV index
            uv = parseInt(uv);
            if (uv < 3) {
                todayElQualities.innerHTML = "Temp: " + temp + "°F <br>Wind: " + wind + " MPH <br>Humidity: " + humidity + "% <br>UV Index: <span class='uvSpan3'>  " + uv + "  </span>";
            } else if (uv < 6 && uv > 2) {
                todayElQualities.innerHTML = "Temp: " + temp + "°F <br>Wind: " + wind + " MPH <br>Humidity: " + humidity + "% <br>UV Index: <span class='uvSpan2'>  " + uv + "  </span>";
            } else {
                todayElQualities.innerHTML = "Temp: " + temp + "°F <br>Wind: " + wind + " MPH <br>Humidity: " + humidity + "% <br>UV Index: <span class='uvSpan1'>  " + uv + "  </span>";
            }

            // append the current weather to the div, with class flex row to enable jquery to remove later
            todayEl.appendChild(todayElQualities);
            todayElQualities.classList = "flex-row todayElQualities"

            // create divs and ps for five days
            var fiveDiv1 = document.createElement("div");
            fiveDiv1.classList = "five-day-div"
            
            var fiveP1 = document.createElement("p");
            fiveP1.classList = "divP"

            var fiveDiv2 = document.createElement("div");
            fiveDiv2.classList = "five-day-div"

            var fiveP2 = document.createElement("p");
            fiveP2.classList = "divP"

            var fiveDiv3 = document.createElement("div");
            fiveDiv3.classList = "five-day-div"

            var fiveP3 = document.createElement("p");
            fiveP3.classList = "divP"

            var fiveDiv4 = document.createElement("div");
            fiveDiv4.classList = "five-day-div"

            var fiveP4 = document.createElement("p");
            fiveP4.classList = "divP"

            var fiveDiv5 = document.createElement("div");
            fiveDiv5.classList = "five-day-div"

            var fiveP5 = document.createElement("p");
            fiveP5.classList = "divP"

            var fiveDayDiv = document.querySelector("#five-day")

            // grab the icon 5day and convert format
            var todayIcon1 = tagArray[idCounter - 1].icon1;
            var icon1 = JSON.stringify(todayIcon1);
            icon1 = icon1.replace("\"","");
            icon1 = icon1.replace("\"","");

            // stringify values 5day for each quality
            var todayTemp1 = tagArray[idCounter - 1].temp1;
            var temp1 = JSON.stringify(todayTemp1);
            temp1 = temp1.replace("\"","");
            temp1 = temp1.replace("\"","");
        
            var todayWind1 = tagArray[idCounter - 1].wind1;
            var wind1 = JSON.stringify(todayWind1);
            wind1 = wind1.replace("\"","");
            wind1 = wind1.replace("\"","");
        
            var todayHumidity1 = tagArray[idCounter - 1].humidity1;
            var humidity1 = JSON.stringify(todayHumidity1);
            humidity1 = humidity1.replace("\"","");
            humidity1 = humidity1.replace("\"","");

            fiveP1.innerHTML = addDays(today, 1).toLocaleDateString("en-US") + "<br><img src='http://openweathermap.org/img/w/" + icon1 + ".png' width='55' height='55'/><br>Temp: " + temp1 + " °F<br>Wind: " + wind1 + " MPH<br>Humidity: " + humidity1 +"%";
            fiveDayDiv.appendChild(fiveDiv1);
            fiveDiv1.appendChild(fiveP1)

            var todayIcon2 = tagArray[idCounter -1].icon2;
            var icon2 = JSON.stringify(todayIcon2);
            icon2 = icon2.replace("\"","");
            icon2 = icon2.replace("\"","");

            var todayTemp2 = tagArray[idCounter -1].temp2;
            var temp2 = JSON.stringify(todayTemp2);
            temp2 = temp2.replace("\"","");
            temp2 = temp2.replace("\"","");
        
            var todayWind2 = tagArray[idCounter -1].wind2;
            var wind2 = JSON.stringify(todayWind2);
            wind2 = wind2.replace("\"","");
            wind2 = wind2.replace("\"","");
        
            var todayHumidity2 = tagArray[idCounter -1].humidity2;
            var humidity2 = JSON.stringify(todayHumidity2);
            humidity2 = humidity2.replace("\"","");
            humidity2 = humidity2.replace("\"","");

            fiveP2.innerHTML = addDays(today, 2).toLocaleDateString("en-US") + "<br><img src='http://openweathermap.org/img/w/" + icon2 + ".png' width='55' height='55'/><br>Temp: " + temp2 + " °F<br>Wind: " + wind2 + " MPH<br>Humidity: " + humidity2 +"%";
            fiveDayDiv.appendChild(fiveDiv2);
            fiveDiv2.appendChild(fiveP2)

            var todayIcon3 = tagArray[idCounter -1].icon3;
            var icon3 = JSON.stringify(todayIcon3);
            icon3 = icon3.replace("\"","");
            icon3 = icon3.replace("\"","");

            var todayTemp3 = tagArray[idCounter -1].temp3;
            var temp3 = JSON.stringify(todayTemp3);
            temp3 = temp3.replace("\"","");
            temp3 = temp3.replace("\"","");
        
            var todayWind3 = tagArray[idCounter -1].wind3;
            var wind3 = JSON.stringify(todayWind3);
            wind3 = wind3.replace("\"","");
            wind3 = wind3.replace("\"","");
        
            var todayHumidity3 = tagArray[idCounter -1].humidity3;
            var humidity3 = JSON.stringify(todayHumidity3);
            humidity3 = humidity3.replace("\"","");
            humidity3 = humidity3.replace("\"","");

            fiveP3.innerHTML = addDays(today, 3).toLocaleDateString("en-US") + "<br><img src='http://openweathermap.org/img/w/" + icon3 + ".png' width='55' height='55'/><br>Temp: " + temp3 + " °F<br>Wind: " + wind3 + " MPH<br>Humidity: " + humidity3 +"%";
            fiveDayDiv.appendChild(fiveDiv3);
            fiveDiv3.appendChild(fiveP3)

            var todayIcon4 = tagArray[idCounter -1].icon4;
            var icon4 = JSON.stringify(todayIcon4);
            icon4 = icon4.replace("\"","");
            icon4 = icon4.replace("\"","");

            var todayTemp4 = tagArray[idCounter -1].temp4;
            var temp4 = JSON.stringify(todayTemp4);
            temp4 = temp4.replace("\"","");
            temp4 = temp4.replace("\"","");
        
            var todayWind4 = tagArray[idCounter -1].wind4;
            var wind4 = JSON.stringify(todayWind4);
            wind4 = wind4.replace("\"","");
            wind4 = wind4.replace("\"","");
        
            var todayHumidity4 = tagArray[idCounter -1].humidity4;
            var humidity4 = JSON.stringify(todayHumidity4);
            humidity4 = humidity4.replace("\"","");
            humidity4 = humidity4.replace("\"","");

            fiveP4.innerHTML = addDays(today, 4).toLocaleDateString("en-US") + "<br><img src='http://openweathermap.org/img/w/" + icon4 + ".png' width='55' height='55'/><br>Temp: " + temp4 + " °F<br>Wind: " + wind4 + " MPH<br>Humidity: " + humidity4 +"%";
            fiveDayDiv.appendChild(fiveDiv4);
            fiveDiv4.appendChild(fiveP4)

            var todayIcon5 = tagArray[idCounter -1].icon5;
            var icon5 = JSON.stringify(todayIcon5);
            icon5 = icon5.replace("\"","");
            icon5 = icon5.replace("\"","");

            var todayTemp5 = tagArray[idCounter -1].temp5;
            var temp5 = JSON.stringify(todayTemp5);
            temp5 = temp5.replace("\"","");
            temp5 = temp5.replace("\"","");
        
            var todayWind5 = tagArray[idCounter -1].wind5;
            var wind5 = JSON.stringify(todayWind5);
            wind5 = wind5.replace("\"","");
            wind5 = wind5.replace("\"","");
        
            var todayHumidity5 = tagArray[idCounter -1].humidity5;
            var humidity5 = JSON.stringify(todayHumidity5);
            humidity5 = humidity5.replace("\"","");
            humidity5 = humidity5.replace("\"","");

            fiveP5.innerHTML = addDays(today, 5).toLocaleDateString("en-US") + "<br><img src='http://openweathermap.org/img/w/" + icon5 + ".png' width='55' height='55'/><br>Temp: " + temp5 + " °F<br>Wind: " + wind5 + " MPH<br>Humidity: " + humidity5 +"%";
            fiveDayDiv.appendChild(fiveDiv5);
            fiveDiv5.appendChild(fiveP5);
    });
}

// misc query selectors and the submit button for formEl
var formEl = document.querySelector("#user-form");
var cityNameEl = document.querySelector("#city");
formEl.addEventListener("submit", formSubmitHandler);

function loadButtonsFirst() {
    var idCounter = localStorage.getItem("idCounter");

    if (idCounter > 0) {
        tagArray = localStorage.getItem("tagArray");
        tagArray = JSON.parse(tagArray);
    
        for (i = 0; i < tagArray.length; i++) { 
            // create a recent button iteration loop with the id# of the buttons
            var recentBtn = document.createElement("button");
            recentBtn.textContent = "" + tagArray[i].city;
            var recentSearches = document.querySelector("#recent-searches");
            recentBtn.setAttribute("id", "btn" + (tagArray[i].idCounter - 1));
            recentBtn.classList = "recent-btn";
            recentSearches.appendChild(recentBtn);

            // button handler for loaded searches with ls
            $(document).on('click','#btn' + (tagArray[i].idCounter - 1),function() {
                // remove the old current and 5day categories
                $(".flex-row").remove();
                $(".five-day-div").remove();

                debugger;
                tagArray = localStorage.getItem("tagArray");
                tagArray = JSON.parse(tagArray);
                // grab the icon and convert format
                var todayIcon = tagArray[idCounter - 1].icon;
                var icon = JSON.stringify(todayIcon);
                icon = icon.replace("\"","");
                icon = icon.replace("\"","");

                // format city name
                var city = tagArray[idCounter - 1].city;

                // create todayEl title
                var todayElTitle = document.createElement("h2");
                todayElTitle.innerHTML = city + " (" + todayDate + ")" + "<img src='http://openweathermap.org/img/w/" + icon + ".png' width='55' height='55'/>";
                todayEl.appendChild(todayElTitle);
                todayElTitle.classList = "flex-row todayElTitle"

                var todayElQualities = document.createElement("p");
                
                // stringify values for each quality
                var todayTemp = tagArray[idCounter - 1].temp;
                var temp = JSON.stringify(todayTemp);
                temp = temp.replace("\"","");
                temp = temp.replace("\"","");

                var todayWind = tagArray[idCounter - 1].wind;
                var wind = JSON.stringify(todayWind);
                wind = wind.replace("\"","");
                wind = wind.replace("\"","");

                var todayHumidity = tagArray[idCounter - 1].humidity;
                var humidity = JSON.stringify(todayHumidity);
                humidity = humidity.replace("\"","");
                humidity = humidity.replace("\"","");

                var todayUV = tagArray[idCounter - 1].uv
                var uv = JSON.stringify(todayUV);
                uv = uv.replace("\"","");
                uv = uv.replace("\"","");

                // display different colors depending on the UV index
                uv = parseInt(uv);
                if (uv < 3) {
                    todayElQualities.innerHTML = "Temp: " + temp + "°F <br>Wind: " + wind + " MPH <br>Humidity: " + humidity + "% <br>UV Index: <span class='uvSpan3'>  " + uv + "  </span>";
                } else if (uv < 6 && uv > 2) {
                    todayElQualities.innerHTML = "Temp: " + temp + "°F <br>Wind: " + wind + " MPH <br>Humidity: " + humidity + "% <br>UV Index: <span class='uvSpan2'>  " + uv + "  </span>";
                } else {
                    todayElQualities.innerHTML = "Temp: " + temp + "°F <br>Wind: " + wind + " MPH <br>Humidity: " + humidity + "% <br>UV Index: <span class='uvSpan1'>  " + uv + "  </span>";
                }

                // append the current weather to the div, with class flex row to enable jquery to remove later
                todayEl.appendChild(todayElQualities);
                todayElQualities.classList = "flex-row todayElQualities"

                // create divs and ps for five days
                var fiveDiv1 = document.createElement("div");
                fiveDiv1.classList = "five-day-div"
                
                var fiveP1 = document.createElement("p");
                fiveP1.classList = "divP"

                var fiveDiv2 = document.createElement("div");
                fiveDiv2.classList = "five-day-div"

                var fiveP2 = document.createElement("p");
                fiveP2.classList = "divP"

                var fiveDiv3 = document.createElement("div");
                fiveDiv3.classList = "five-day-div"

                var fiveP3 = document.createElement("p");
                fiveP3.classList = "divP"

                var fiveDiv4 = document.createElement("div");
                fiveDiv4.classList = "five-day-div"

                var fiveP4 = document.createElement("p");
                fiveP4.classList = "divP"

                var fiveDiv5 = document.createElement("div");
                fiveDiv5.classList = "five-day-div"

                var fiveP5 = document.createElement("p");
                fiveP5.classList = "divP"

                var fiveDayDiv = document.querySelector("#five-day")

                // grab the icon 5day and convert format
                var todayIcon1 = tagArray[idCounter - 1].icon1;
                var icon1 = JSON.stringify(todayIcon1);
                icon1 = icon1.replace("\"","");
                icon1 = icon1.replace("\"","");

                // stringify values 5day for each quality
                var todayTemp1 = tagArray[idCounter - 1].temp1;
                var temp1 = JSON.stringify(todayTemp1);
                temp1 = temp1.replace("\"","");
                temp1 = temp1.replace("\"","");
            
                var todayWind1 = tagArray[idCounter - 1].wind1;
                var wind1 = JSON.stringify(todayWind1);
                wind1 = wind1.replace("\"","");
                wind1 = wind1.replace("\"","");
            
                var todayHumidity1 = tagArray[idCounter - 1].humidity1;
                var humidity1 = JSON.stringify(todayHumidity1);
                humidity1 = humidity1.replace("\"","");
                humidity1 = humidity1.replace("\"","");

                fiveP1.innerHTML = addDays(today, 1).toLocaleDateString("en-US") + "<br><img src='http://openweathermap.org/img/w/" + icon1 + ".png' width='55' height='55'/><br>Temp: " + temp1 + " °F<br>Wind: " + wind1 + " MPH<br>Humidity: " + humidity1 +"%";
                fiveDayDiv.appendChild(fiveDiv1);
                fiveDiv1.appendChild(fiveP1)

                var todayIcon2 = tagArray[idCounter - 1].icon2;
                var icon2 = JSON.stringify(todayIcon2);
                icon2 = icon2.replace("\"","");
                icon2 = icon2.replace("\"","");

                var todayTemp2 = tagArray[idCounter - 1].temp2;
                var temp2 = JSON.stringify(todayTemp2);
                temp2 = temp2.replace("\"","");
                temp2 = temp2.replace("\"","");
            
                var todayWind2 = tagArray[idCounter - 1].wind2;
                var wind2 = JSON.stringify(todayWind2);
                wind2 = wind2.replace("\"","");
                wind2 = wind2.replace("\"","");
            
                var todayHumidity2 = tagArray[idCounter - 1].humidity2;
                var humidity2 = JSON.stringify(todayHumidity2);
                humidity2 = humidity2.replace("\"","");
                humidity2 = humidity2.replace("\"","");

                fiveP2.innerHTML = addDays(today, 2).toLocaleDateString("en-US") + "<br><img src='http://openweathermap.org/img/w/" + icon2 + ".png' width='55' height='55'/><br>Temp: " + temp2 + " °F<br>Wind: " + wind2 + " MPH<br>Humidity: " + humidity2 +"%";
                fiveDayDiv.appendChild(fiveDiv2);
                fiveDiv2.appendChild(fiveP2)

                var todayIcon3 = tagArray[idCounter - 1].icon3;
                var icon3 = JSON.stringify(todayIcon3);
                icon3 = icon3.replace("\"","");
                icon3 = icon3.replace("\"","");

                var todayTemp3 = tagArray[idCounter - 1].temp3;
                var temp3 = JSON.stringify(todayTemp3);
                temp3 = temp3.replace("\"","");
                temp3 = temp3.replace("\"","");
            
                var todayWind3 = tagArray[idCounter - 1].wind3;
                var wind3 = JSON.stringify(todayWind3);
                wind3 = wind3.replace("\"","");
                wind3 = wind3.replace("\"","");
            
                var todayHumidity3 = tagArray[idCounter - 1].humidity3;
                var humidity3 = JSON.stringify(todayHumidity3);
                humidity3 = humidity3.replace("\"","");
                humidity3 = humidity3.replace("\"","");

                fiveP3.innerHTML = addDays(today, 3).toLocaleDateString("en-US") + "<br><img src='http://openweathermap.org/img/w/" + icon3 + ".png' width='55' height='55'/><br>Temp: " + temp3 + " °F<br>Wind: " + wind3 + " MPH<br>Humidity: " + humidity3 +"%";
                fiveDayDiv.appendChild(fiveDiv3);
                fiveDiv3.appendChild(fiveP3)

                var todayIcon4 = tagArray[idCounter - 1].icon4;
                var icon4 = JSON.stringify(todayIcon4);
                icon4 = icon4.replace("\"","");
                icon4 = icon4.replace("\"","");

                var todayTemp4 = tagArray[idCounter - 1].temp4;
                var temp4 = JSON.stringify(todayTemp4);
                temp4 = temp4.replace("\"","");
                temp4 = temp4.replace("\"","");
            
                var todayWind4 = tagArray[idCounter - 1].wind4;
                var wind4 = JSON.stringify(todayWind4);
                wind4 = wind4.replace("\"","");
                wind4 = wind4.replace("\"","");
            
                var todayHumidity4 = tagArray[idCounter - 1].humidity4;
                var humidity4 = JSON.stringify(todayHumidity4);
                humidity4 = humidity4.replace("\"","");
                humidity4 = humidity4.replace("\"","");

                fiveP4.innerHTML = addDays(today, 4).toLocaleDateString("en-US") + "<br><img src='http://openweathermap.org/img/w/" + icon4 + ".png' width='55' height='55'/><br>Temp: " + temp4 + " °F<br>Wind: " + wind4 + " MPH<br>Humidity: " + humidity4 +"%";
                fiveDayDiv.appendChild(fiveDiv4);
                fiveDiv4.appendChild(fiveP4)

                var todayIcon5 = tagArray[idCounter - 1].icon5;
                var icon5 = JSON.stringify(todayIcon5);
                icon5 = icon5.replace("\"","");
                icon5 = icon5.replace("\"","");

                var todayTemp5 = tagArray[idCounter - 1].temp5;
                var temp5 = JSON.stringify(todayTemp5);
                temp5 = temp5.replace("\"","");
                temp5 = temp5.replace("\"","");
            
                var todayWind5 = tagArray[idCounter - 1].wind5;
                var wind5 = JSON.stringify(todayWind5);
                wind5 = wind5.replace("\"","");
                wind5 = wind5.replace("\"","");
            
                var todayHumidity5 = tagArray[idCounter - 1].humidity5;
                var humidity5 = JSON.stringify(todayHumidity5);
                humidity5 = humidity5.replace("\"","");
                humidity5 = humidity5.replace("\"","");

                fiveP5.innerHTML = addDays(today, 5).toLocaleDateString("en-US") + "<br><img src='http://openweathermap.org/img/w/" + icon5 + ".png' width='55' height='55'/><br>Temp: " + temp5 + " °F<br>Wind: " + wind5 + " MPH<br>Humidity: " + humidity5 +"%";
                fiveDayDiv.appendChild(fiveDiv5);
                fiveDiv5.appendChild(fiveP5);
            });
        }
    } 
}

loadButtonsFirst();
