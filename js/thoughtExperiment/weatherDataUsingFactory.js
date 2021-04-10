import { convertKelvinToCelsius } from "../usingModules/utilityMethods.js";

function WeatherData(currentUrl) {
  async function getCurrentWeatherData() {
    let dataRequest = await fetch(currentUrl);
    let jsonData = await dataRequest.json();
    // console.log(jsonData);
    extractDataFromJson(jsonData);
    // return jsonData;
  }

  function extractDataFromJson(jsonData) {
    let latitude = jsonData["coord"].lat;
    let longitude = jsonData["coord"].lon;
    let weatherType = jsonData["weather"][0].description;
    let temp = jsonData["main"].temp;
    let feelsLike = jsonData["main"].feels_like;
    let tempMax = jsonData["main"].temp_max;
    let tempMin = jsonData["main"].temp_min;
    let humidity = jsonData["main"].humidity;
    let cityName = jsonData.name;

    // console.log(latitude,longitude, weatherType, temp, feelsLike, tempMax, tempMin, humidity)
    // return {latitude,longitude, weatherType, temp, feelsLike, tempMax, tempMin, humidity};
    let readyData = {
      weatherType,
      temp,
      feelsLike,
      tempMax,
      tempMin,
      humidity,
      cityName,
    };
    readyCurrentWeatherInfo(readyData);
  }

  function readyCurrentWeatherInfo(dataObj) {
    let tempDiv = document.querySelector(".temp-div");
    let feelsLike = document.querySelector(".feels-like");
    let maxTemp = document.querySelector(".max-temp");
    let minTemp = document.querySelector(".min-temp");
    let humidityDiv = document.querySelector(".humidity");
    let weatherType = document.querySelector(".w-type");
    let cityName = document.querySelector(".city-name");
    let svgDiv = document.querySelector(".svg-div");

    cleanUpPreviousData([
      tempDiv,
      feelsLike,
      maxTemp,
      minTemp,
      humidityDiv,
      weatherType,
      cityName,
      svgDiv,
    ]);
    displayCurrentWeatherData(
      [
        tempDiv,
        feelsLike,
        maxTemp,
        minTemp,
        humidityDiv,
        weatherType,
        cityName,
        svgDiv,
      ],
      dataObj
    );

    showSvgForWeather(svgDiv, weatherType);
  }

  function showSvgForWeather(svgDiv, weatherType) {
      let 
  }

  function displayCurrentWeatherData(elements, datas) {
    elements[0].textContent = convertKelvinToCelsius(datas["temp"]);
    elements[1].textContent = convertKelvinToCelsius(datas["feelsLike"]);
    elements[2].textContent = convertKelvinToCelsius(datas["tempMax"]);
    elements[3].textContent = convertKelvinToCelsius(datas["tempMin"]);
    elements[4].textContent = datas["humidity"];
    elements[5].textContent = datas["weatherType"];
    elements[6].textContent = datas["cityName"];
  }

  function cleanUpPreviousData(elements) {
    elements.forEach((elem) => (elem.textContent = ""));
  }

  return {
    getCurrentWeatherData,
    extractDataFromJson,
  };
}

export { WeatherData };
