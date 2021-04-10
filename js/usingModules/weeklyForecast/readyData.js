import {dailyForecastedWeatherData} from './displayData.js';
import {whichDayOfWeek} from '../utilityMethods.js';

function readyWeeklyWeatherData(forecastData) {
    let today = new Date().getDay();
    
    forecastData.forEach(forecast => {
        dailyForecastedWeatherData(forecast, today);
        today += 1;
        today = whichDayOfWeek(today);
    });
}

export {readyWeeklyWeatherData}