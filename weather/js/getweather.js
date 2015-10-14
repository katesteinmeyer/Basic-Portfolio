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
		//get current weather condiditons
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
		})
		//get 7 day forecast
		$.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + zipCode + ',us&cnt=7&units=imperial&APPID=ded17c04cecada392fc437e96cea4205')
			.done(function(forecastData) {
				for (i = 0; i < 7; i++) {
					var dayTemp = forecastData.list[i].temp.day;
					var dayTemp = float2int(dayTemp);
					var dayCond = forecastData.list[i].weather[0].main;
					var icon = forecastData.list[i].weather[0].icon;

					//populate days of the week
					$("#temps").append("<td class=\"letter forecastTemps\">" + dayTemp + "</td>");
					$("#weathericons tr").append(
						"<td class=\"weather-icons\"><img src=\"img/"+icon+".png\" /></td>"
					);
					$("#days tr").append(
						"<td class=\"letter\">" + days[dayNum + i] + "</td>"
					);
				}
				var day0Temp = forecastData.list[0].temp.day;
			})
}

var searchZip = getUrlParameter('zip');

// This method runs when the HTML is loaded, everything else runs before the 
// HMTL is loaded
$(document).ready(function(){
	$('#zipcode').val(searchZip);
	getWeather(searchZip);

	$('#button').click(search);
	$('#zipcode').keydown(function(e) {
  		if(e.which == 13) {
			search();
  		}
	});	
})


$('head').append('<meta name="viewport" content="width=device-width, user-scalable=0, minimal-ui">');