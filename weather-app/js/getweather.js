$(document).ready(function(){
	var searchZip = '';

	//get today's day of the week
	function getDay() {
		var days = ["SUN","MON","TUE","WED","THUR","FRI","SAT","SUN","MON","TUE","WED","THU","FRI","SAT"];
		var d = new Date();
		var dayNum = d.getDay();

		//convert floats to ints
		function float2int (value) {
    		return value | 0;
		}


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
								"<td class=\"weather-icons icon-" + icon + "\"></td>"
							);
							$("#days tr").append(
								"<td class=\"letter\">" + days[dayNum + i] + "</td>"
							);
						}
						var day0Temp = forecastData.list[0].temp.day;
					})
		}

		getWeather(searchZip);
	}

	//call function using zip code
	function search() {
		searchZip = $('#zipcode').val();
		$('#temps, #weathericons tr, #days tr, #mainIcon').empty();
		getDay();
	}
	$('#button').click(search);
	$('#zipcode').keydown(function(e) {
  		if(e.which == 13) {
    	search();
  	}
});	
})



