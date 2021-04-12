import {
  createLeftViewNode,
  createRightViewNode,
  getSvgIconUrl,
  createNodesForDOM,
  checkIsItDay,
  convertKelvinToCelsius,
  whichDayOfWeek,
  chooseRandomlyFromGifs,
  showGifOnDom,
} from "./utilityMethods.js";
let loader = document.querySelector('.loader');

function WeatherData(currentUrl) {
  async function getCurrentAndWeeklyWeatherData() {
    try {
      // bringing in spinner action
      if ((loader.style.display = "none")) {
        loader.style.display = "block";
      }

      let currentWeather = await getData(currentUrl);
      // console.log(jsonData);
      extractCurrentWeatherData(currentWeather);
      // return jsonData;
      let latitude = currentWeather["coord"].lat;
      let longitude = currentWeather["coord"].lon;
      let weeklyWeatherForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=c2e7a52486f1a1308371ac385b792714`;
      let weeklyOpenWeatherData = await getData(weeklyWeatherForecastUrl);
      // console.log(weeklyOpenWeatherData);
      weeklyOpenWeatherData["daily"].shift();
      let dailyForecasts = weeklyOpenWeatherData["daily"];
      readyWeeklyWeatherData(dailyForecasts);

      let giphUrl = `https://api.giphy.com/v1/gifs/search?api_key=TpnE8CtDArV0DqW17cilRKXCIptJJ621&q=${currentWeather["weather"][0].description}&limit=20`;
      let getGiph = await getData(giphUrl);
      // console.log(getGiph);
      let randGiph = chooseRandomlyFromGifs(getGiph.data.length);
      showGifOnDom(getGiph.data[randGiph].images.original.url);

      // showing weekly Forecast Label
    document.querySelector('.show-label').style.display = 'block';
    
    } catch (err) {
      console.log(err);
      alert('enter valid city name');
    }
    // taking off loader after
    loader.style.display = "none";
  }

  async function getData(url) {
    let dataRequest = await fetch(url);
    let jsonData = await dataRequest.json();
    return jsonData;
  }

  function extractCurrentWeatherData(jsonData) {
    let weatherType = jsonData["weather"][0].description;
    let temp = jsonData["main"].temp;
    let feelsLike = jsonData["main"].feels_like;
    let tempMax = jsonData["main"].temp_max;
    let tempMin = jsonData["main"].temp_min;
    let humidity = jsonData["main"].humidity;
    let cityName = jsonData.name;

    let svgUrl = getSvgIconUrl(weatherType.toLowerCase());

    let readyData = {
      weatherType,
      temp,
      feelsLike,
      tempMax,
      tempMin,
      humidity,
      cityName,
      svgUrl,
    };
    createCurrentWeatherNode(readyData);
  }

  function createCurrentWeatherNode(dataObj) {
    let leftViewDomNode = createLeftViewNode(dataObj);

    let rightViewDomNode = createRightViewNode(dataObj);

    displayNodesOnDom(leftViewDomNode, rightViewDomNode);
  }

  function displayNodesOnDom(left, right) {
    let weatherDiv = document.querySelector(".weather");
    cleanUpPreviousData(weatherDiv);
    cleanUpPreviousData(document.querySelector(".days-forecast"));
    weatherDiv.append(left, right);
  }

  function cleanUpPreviousData(elements) {
    // console.log(elements);
    elements.innerHTML = "";
  }

  function readyWeeklyWeatherData(forecastData) {
    let today = new Date().getDay();

    forecastData.forEach((forecast) => {
      today += 1;
      dailyForecastedWeatherData(forecast, today);
      // today += 1;
      today = whichDayOfWeek(today);
    });
  }

  function dailyForecastedWeatherData(dailyData, today) {
    let day = checkIsItDay();

    let temp = day ? dailyData["temp"]["day"] : dailyData["temp"]["night"];
    let convertedTemp = convertKelvinToCelsius(temp);

    let weatherType = dailyData["weather"][0].main;
    let svgUrl = getSvgIconUrl(weatherType.toLowerCase());
    // console.log(svgUrl, weatherType);

    let dailyWeatherForecastNode = createNodesForDOM(
      svgUrl,
      convertedTemp,
      today
    );
    displayOpenWeatherData(dailyWeatherForecastNode);
  }

  function displayOpenWeatherData(nodeFragment) {
    let dailyForecasts = document.querySelector(".days-forecast");
    dailyForecasts.append(nodeFragment);
  }

  return {
    getCurrentAndWeeklyWeatherData
  };
}

export { WeatherData };
