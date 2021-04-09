import {initGiphy} from "./giphyFlows.js";
import {chooseSvg} from "./weatherIcons.js";
import {initWeeklyWeatherForecast} from "./weekForecast/owdProcessing.js";
let dailyForecast = document.querySelector('.days-forecast');

async function initOpenWeatherData(cityName) {
    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=c2e7a52486f1a1308371ac385b792714`;
        let weatherRequest = await fetch(url);
        let weatherData = await weatherRequest.json();
        // console.log(weatherData.coord.lat, weatherData.coord.lon);
        readyOpenWeatherData(weatherData);
        await initGiphy(weatherData.weather[0].main);
        await initWeeklyWeatherForecast(weatherData.coord.lat, weatherData.coord.lon);
    } catch(err) {
        console.log(err);
    }
}

function readyOpenWeatherData(data) {
    // console.log(data);
    let tempDiv = document.querySelector('.temp-div');
    let feelsLike = document.querySelector('.feels-like');
    let maxTemp = document.querySelector('.max-temp');
    let minTemp = document.querySelector('.min-temp');
    let humidity = document.querySelector('.humidity');
    let weatherType = document.querySelector('.w-type');
    let cityName = document.querySelector('.city-name');
    let svgDiv = document.querySelector('.svg-div');
    cleanUpPreviousData([tempDiv,feelsLike,maxTemp,minTemp,humidity,weatherType,cityName,svgDiv, dailyForecast]);
    displayOpenWeatherData(tempDiv,feelsLike,maxTemp,minTemp,humidity,weatherType,cityName,svgDiv,data);
}

function displayOpenWeatherData(tempDiv,feelsLike,maxTemp,minTemp,humidity,weatherType,cityName,svgDiv,data) {
    let temp = convertKelvinToCelsius(data.main.temp);
    tempDiv.textContent = temp;

    let feelsLT = convertKelvinToCelsius(data.main['feels_like']);
    feelsLike.textContent = feelsLT;

    let maxT = convertKelvinToCelsius(data.main['temp_max']);
    maxTemp.textContent = maxT;

    let minT = convertKelvinToCelsius(data.main['temp_min']);
    minTemp.textContent = minT;

    humidity.textContent = data.main.humidity;
    weatherType.textContent = data.weather[0].main;
    cityName.textContent = data.name;
    let svgEl = chooseSvg(data.weather[0].main.toLowerCase());
    svgDiv.append(svgEl);
}

function cleanUpPreviousData(domElements) {
    domElements.forEach(node => node.textContent = '');
}

function convertKelvinToCelsius(kelvin) {
    return Number.parseFloat((kelvin - 273.15)).toPrecision(2);
}

export {initOpenWeatherData}