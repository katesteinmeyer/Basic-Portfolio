<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Weather App</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <input type="text" id="zipcode" placeholder="Enter ZIP Code">
    <button id="button">Get Weather</button>
    <div id="cityName"></div>
    <div id="forecast"></div>
    <div id="temp"></div>
    <div id="mainIcon"></div>
    <table id="temps"></table>
    <table id="weathericons"></table>
    <table id="days"></table>

    <script>
        var days = ["SUN","MON","TUE","WED","THUR","FRI","SAT","SUN","MON","TUE","WED","THU","FRI","SAT"];
        var d = new Date();
        var dayNum = d.getDay();

        //call function using zip code
        function search() {
            searchZip = $('#zipcode').val();
            $('#temps, #weathericons tr, #days tr, #mainIcon').empty();
            getWeather(searchZip);
        }

        //convert floats to ints
        function float2int (value) {
            return value | 0;
        }

        var getUrlParameter = function getUrlParameter(sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        };

        //get weather data
        function getWeather(zipCode) {
            //get current weather conditions
            $.get('http://api.openweathermap.org/data/2.5/weather?zip=' + zipCode + ',us&units=imperial&APPID=ded17c04cecada392fc437e96cea4205')
                .done(function(data) {
                    var name = data.name;
                    $('#cityName').text(name);
                    var main = data.weather[0].main;
                    $('#forecast').text(main);
                    var temp = data.main.temp;
                    $('#temp').text(temp);
                    var mainIcon = data.weather[0].icon;
                    $('#mainIcon').append("<div class=\"icon-" + mainIcon + "\"></div>");
                    //get 7 day forecast using coordinates from current weather data
                    getForecast(data.coord.lat, data.coord.lon);
                })
                .fail(function() {
                    console.error('Error fetching current weather data');
                });
        }

        //get 7 day forecast
        function getForecast(lat, lon) {
            $.get('http://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly,minutely&units=imperial&appid=ded17c04cecada392fc437e96cea4205')
                .done(function(forecastData) {
                    for (i = 0; i < 7; i++) {
                        var dayTemp = forecastData.daily[i].temp.day;
                        var dayTemp = float2int(dayTemp);
                        var dayCond = forecastData.daily[i].weather[0].main;
                        var icon = forecastData.daily[i].weather[0].icon;

                        //populate days of the week
                        $("#temps").append("<td class=\"letter forecastTemps\">" + dayTemp + "</td>");
                        $("#weathericons tr").append(
                            "<td class=\"weather-icons\"><img src=\"http://openweathermap.org/img/wn/" + icon + ".png\" /></td>"
                        );
                        $("#days tr").append(
                            "<td class=\"letter\">" + days[dayNum + i] + "</td>"
                        );
                    }
                })
                .fail(function() {
                    console.error('Error fetching forecast data');
                });
        }

        var searchZip = getUrlParameter('zip');

        // This method runs when the HTML is loaded, everything else runs before the 
        // HTML is loaded
        $(document).ready(function(){
            $('#zipcode').val(searchZip);
            getWeather(searchZip);

            $('#button').click(search);
            $('#zipcode').keydown(function(e) {
                if(e.which == 13) {
                    search();
                }
            }); 
        });

        $('head').append('<meta name="viewport" content="width=device-width, user-scalable=0, minimal-ui">');
    </script>
</body>
</html>
