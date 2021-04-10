import {createNodesForDOM, checkIsItDay, convertKelvinToCelsius} from '../utilityMethods.js';
import {getSvgUrlOnly} from '../weatherIcons.js';

function dailyForecastedWeatherData(dailyData, today) {
    // checks if its a day time or not
    let day = checkIsItDay();
    
    // returns wither day time temp or night time temp and then extracted values is converted into celsius
    let temp = day ? dailyData['temp']['day'] : dailyData['temp']['night'];
    let convertedTemp = convertKelvinToCelsius(temp);

    // based on weatherType giphs are goinbg to be generated
    let weatherType = dailyData['weather'][0].main;
    let svgUrl = getSvgUrlOnly(weatherType.toLowerCase());
    
    // for each day of week a new node is going to be generated and will be displaying related weather data
    let dailyWeatherForecastNode = createNodesForDOM(svgUrl, convertedTemp, today);
    displayOpenWeatherData(dailyWeatherForecastNode);
}

function displayOpenWeatherData(nodeFragment) {
    // console.log(nodeFragment);
    let dailyForecasts = document.querySelector('.days-forecast');
    dailyForecasts.append(nodeFragment);
}

export {dailyForecastedWeatherData}