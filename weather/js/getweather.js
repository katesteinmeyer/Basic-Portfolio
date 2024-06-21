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
            const apiKey = 'ba8f25aa65e54097a8b162107242106';
            console.log('Fetching current weather for zip:', zipCode);
            //get current weather conditions
            $.get('https://api.weatherapi.com/v1/current.json?key=' + apiKey + '&q=' + zipCode + '&aqi=no')
                .done(function(data) {
                    console.log('Current weather data:', data);
                    var name = data.location.name;
                    $('#cityName').text(name);
                    var main = data.current.condition.text;
                    $('#forecast').text(main);
                    var temp = data.current.temp_f;
                    $('#temp').text(temp + '°F');
                    var mainIcon = data.current.condition.icon;
                    $('#mainIcon').append("<img src=\"" + mainIcon + "\" alt=\"Weather Icon\">");

                    //get 7 day forecast using coordinates from current weather data
                    getForecast(data.location.lat, data.location.lon);
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    console.error('Error fetching current weather data:', textStatus, errorThrown);
                });
        }

        //get 7 day forecast
        function getForecast(lat, lon) {
            const apiKey = 'ba8f25aa65e54097a8b162107242106'; 
            console.log('Fetching 7 day forecast for coordinates:', lat, lon);
            $.get('https://api.weatherapi.com/v1/forecast.json?key=' + apiKey + '&q=' + lat + ',' + lon + '&days=7&aqi=no&alerts=no')
                .done(function(forecastData) {
                    console.log('7 day forecast data:', forecastData);
                    for (i = 0; i < 7; i++) {
                        var dayTemp = forecastData.forecast.forecastday[i].day.avgtemp_f;
                        dayTemp = float2int(dayTemp);
                        var dayCond = forecastData.forecast.forecastday[i].day.condition.text;
                        var icon = forecastData.forecast.forecastday[i].day.condition.icon;

                        //populate days of the week
                        $("#temps").append("<td class=\"letter forecastTemps\">" + dayTemp + "</td>");
                        $("#weathericons tr").append(
                            "<td class=\"weather-icons\"><img src=\"" + icon + "\" alt=\"Weather Icon\"></td>"
                        );
                        $("#days tr").append(
                            "<td class=\"letter\">" + days[dayNum + i] + "</td>"
                        );
                    }
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    console.error('Error fetching forecast data:', textStatus, errorThrown);
                });
        }

        var searchZip = getUrlParameter('zip');

        // This method runs when the HTML is loaded, everything else runs before the 
        // HTML is loaded
        $(document).ready(function(){
            if (searchZip) {
                $('#zipcode').val(searchZip);
                getWeather(searchZip);
            }

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
