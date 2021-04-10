import {readyWeeklyWeatherData} from './readyData.js';

async function initWeeklyWeatherForecast(latitude, longitude) {
    try {
        let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=c2e7a52486f1a1308371ac385b792714`;
        let weeklyWeatherForcastRequest = await fetch(url);

        let forecastData = await weeklyWeatherForcastRequest.json();
        forecastData['daily'].shift();
        
        let dailyForecasts = forecastData['daily'];
        readyWeeklyWeatherData(dailyForecasts);
    } catch(err) {
        console.log(err);
    }
}

export {initWeeklyWeatherForecast}