var today = new Date();
var apiKey = "2fdc7aca44061435df6123deff5f269c";
var correctDate = today.getMonth() + 1;
var date = correctDate+"/"+today.getDate()+"/"+today.getFullYear();
var idCounter = 0;

var getTodaysWeather = function(cityName) {
    // format the oneweather api
    var apiUrl1 = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=imperial";
    
    fetch(apiUrl1).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                responseLat = data.coord.lat;
                responseLon = data.coord.lon;

                var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + responseLat + "&lon=" + responseLon + "&exclude=minutely,hourly&appid=" + apiKey + "&units=imperial";
                fetch(apiUrl2).then(function(response) {
                    if (response.ok) {
                        response.json().then(function(data) {
                            console.log(data)
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

var todayEl = document.querySelector("#today-weather");


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
     $(".flex-row").remove();
     idCounter += idCounter;
    
    // check if api returned any weather
    if (weather.length === 0) {
        todayEl.textContent = "This city is not registered!"
        return;
    }
    
    // grab the icon and convert format
    var todayIcon = weather.daily[0].weather[0].icon;
    var icon = JSON.stringify(todayIcon);
    icon = icon.replace("\"","");
    icon = icon.replace("\"","");

    // create todayEl title
    var todayElTitle = document.createElement("h2");
    todayElTitle.innerHTML = city + " (" + date + ")" + "<img src='http://openweathermap.org/img/w/" + icon + ".png' width='55' height='55'/>";
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

    uv = parseInt(uv);
    if (uv < 3) {
        todayElQualities.innerHTML = "Temp: " + temp + "°F <br>Wind: " + wind + " MPH <br>Humidity: " + humidity + "% <br>UV Index: <span class='uvSpan3'>  " + uv + "  </span>";
    } else if (uv < 6 && uv > 2) {
        todayElQualities.innerHTML = "Temp: " + temp + "°F <br>Wind: " + wind + " MPH <br>Humidity: " + humidity + "% <br>UV Index: <span class='uvSpan2'>  " + uv + "  </span>";
    } else {
        todayElQualities.innerHTML = "Temp: " + temp + "°F <br>Wind: " + wind + " MPH <br>Humidity: " + humidity + "% <br>UV Index: <span class='uvSpan1'>  " + uv + "  </span>";
    }

    todayEl.appendChild(todayElQualities);
    todayElQualities.classList = "flex-row todayElQualities"

    var recentBtn = document.createElement("button");
    recentBtn.textContent = "" + city;
    var recentSearches = document.querySelector("#recent-searches");
    recentBtn.setAttribute("id", "btn" + idCounter)
    recentBtn.classList = "recent-btn"
    recentSearches.appendChild(recentBtn);

}


var formEl = document.querySelector("#user-form");
var cityNameEl = document.querySelector("#city");
formEl.addEventListener("submit", formSubmitHandler);