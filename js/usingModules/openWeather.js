import { initGiphy } from "./giphyFlows.js";
import { chooseSvg } from "./weatherIcons.js";
import { initWeeklyWeatherForecast } from "./weeklyForecast/curateRequest.js";
import {
  convertKelvinToCelsius,
  cleanUpPreviousData,
} from "./utilityMethods.js";
let dailyForecast = document.querySelector(".days-forecast");
let loader = document.querySelector(".loader");
let leftView = document.querySelector(".left-view");
let rightView = document.querySelector(".right-view");

async function initOpenWeatherData(cityName) {
  try {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=c2e7a52486f1a1308371ac385b792714`;

    // bringing in spinner action
    if ((loader.style.display = "none")) {
      loader.style.display = "block";
    }

    let weatherRequest = await fetch(url);
    let weatherData = await weatherRequest.json();

    // taking out sppinner when weather data is ready
    loader.style.display = "none";

    // curating open weather data for displaying
    readyOpenWeatherData(weatherData);

    // to get proper Giphs based on weather type
    await initGiphy(weatherData.weather[0].main);

    // to get weekly weather forecast data
    await initWeeklyWeatherForecast(
      weatherData.coord.lat,
      weatherData.coord.lon
    );

    // making backgrounds of data visulazation contrasted for better readablity
    contrastBackground([leftView, rightView, dailyForecast]);
  } catch (err) {
    console.log(err);
    // when there is an error there is no need to be contrasted
    contrastBackground([leftView, rightView, dailyForecast]);
  }
}

/**
 * utility function to contrast background for better datta readablity
 * @param {leftView, rightView, weeklyForecast} elements
 */
function contrastBackground(elements) {
  elements.forEach((elem) => {
    if (!elem.classList.contains("contrasted")) {
      elem.classList.add("contrasted");
    } else {
      elem.classList.remove("contrasted");
    }
  });
}

function readyOpenWeatherData(data) {
  // console.log(data);
  let tempDiv = document.querySelector(".temp-div");
  let feelsLike = document.querySelector(".feels-like");
  let maxTemp = document.querySelector(".max-temp");
  let minTemp = document.querySelector(".min-temp");
  let humidity = document.querySelector(".humidity");
  let weatherType = document.querySelector(".w-type");
  let cityName = document.querySelector(".city-name");
  let svgDiv = document.querySelector(".svg-div");

  // cleaning up divs before displayinf data
  cleanUpPreviousData([
    tempDiv,
    feelsLike,
    maxTemp,
    minTemp,
    humidity,
    weatherType,
    cityName,
    svgDiv,
    dailyForecast,
  ]);

  // passing all related div to making data to be displayed on DOM
  displayOpenWeatherData(
    tempDiv,
    feelsLike,
    maxTemp,
    minTemp,
    humidity,
    weatherType,
    cityName,
    svgDiv,
    data
  );
}

function displayOpenWeatherData(
  tempDiv,
  feelsLike,
  maxTemp,
  minTemp,
  humidity,
  weatherType,
  cityName,
  svgDiv,
  data
) {
  let temp = convertKelvinToCelsius(data.main.temp);
  tempDiv.textContent = temp;

  let feelsLT = convertKelvinToCelsius(data.main["feels_like"]);
  feelsLike.textContent = feelsLT;

  let maxT = convertKelvinToCelsius(data.main["temp_max"]);
  maxTemp.textContent = maxT;

  let minT = convertKelvinToCelsius(data.main["temp_min"]);
  minTemp.textContent = minT;

  humidity.textContent = data.main.humidity;
  weatherType.textContent = data.weather[0].main;
  cityName.textContent = data.name;
  let svgEl = chooseSvg(data.weather[0].main.toLowerCase());
  svgDiv.append(svgEl);
}

export { initOpenWeatherData };

/**
 * 
 * 
 function cleanUpPreviousData(domElements) {
  domElements.forEach((node) => (node.textContent = ""));
}

function convertKelvinToCelsius(kelvin) {
  return Number.parseFloat(kelvin - 273.15).toPrecision(2);
}
 * 
 * 
 async function initOpenWeatherData(cityName) {
  try {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=c2e7a52486f1a1308371ac385b792714`;
    if ((loader.style.display = "none")) {
      loader.style.display = "block";
    }

    let weatherRequest = await fetch(url);
    let weatherData = await weatherRequest.json();
    loader.style.display = "none";
    readyOpenWeatherData(weatherData);
    await initGiphy(weatherData.weather[0].main);
    await initWeeklyWeatherForecast(
      weatherData.coord.lat,
      weatherData.coord.lon
    );
    // else {
    //   let weatherRequest = await fetch(url);
    //   let weatherData = await weatherRequest.json();
    //   loader.style.display = "none";
    //   readyOpenWeatherData(weatherData);
    //   await initGiphy(weatherData.weather[0].main);
    //   await initWeeklyWeatherForecast(
    //     weatherData.coord.lat,
    //     weatherData.coord.lon
    //   );
    //  }

    // let weatherRequest = await fetch(url);
    // let weatherData = await weatherRequest.json();
    // console.log(weatherData.coord.lat, weatherData.coord.lon);
    // readyOpenWeatherData(weatherData);
    // await initGiphy(weatherData.weather[0].main);
    // await initWeeklyWeatherForecast(weatherData.coord.lat, weatherData.coord.lon);
  } catch (err) {
    console.log(err);
  }
}
 */
