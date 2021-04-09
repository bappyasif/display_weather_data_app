function searchWeatherByCity() {
    let inputEl = document.querySelector('input');
    inputEl.addEventListener('keyup', async evt => {
        if(evt.key === 'Enter') {
            let userInput = evt.target.value;
            await initOpenWeatherData(userInput);
        }
    });
}

async function initOpenWeatherData(cityName) {
    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=c2e7a52486f1a1308371ac385b792714`;
        let weatherRequest = await fetch(url);
        let weatherData = await weatherRequest.json();
        readyOpenWeatherData(weatherData);
        await initGiphy(weatherData.weather[0].main);
    } catch(err) {
        console.log(err);
    }
}

function readyOpenWeatherData(data) {
    console.log(data);
    let tempDiv = document.querySelector('.temp-div');
    let feelsLike = document.querySelector('.feels-like');
    let maxTemp = document.querySelector('.max-temp');
    let minTemp = document.querySelector('.min-temp');
    let humidity = document.querySelector('.humidity');
    let weatherType = document.querySelector('.w-type');
    let cityName = document.querySelector('.city-name');
    cleanUpPreviousData([tempDiv,feelsLike,maxTemp,minTemp,humidity,weatherType,cityName]);
    displayOpenWeatherData(tempDiv,feelsLike,maxTemp,minTemp,humidity,weatherType,cityName,data);
    // initGiphy(data.weather[0].main);
}

function displayOpenWeatherData(tempDiv,feelsLike,maxTemp,minTemp,humidity,weatherType,cityName,data) {
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

}

function cleanUpPreviousData(domElements) {
    domElements.forEach(node => node.textContent = '');
}

async function initGiphy(weatherType) {
    console.log(weatherType);
    try {
        let url = `https://api.giphy.com/v1/gifs/search?api_key=TpnE8CtDArV0DqW17cilRKXCIptJJ621&q=${weatherType}&limit=20`;
    let giphyRequest = await fetch(url, {mode:'cors'});
    let giphsData = await giphyRequest.json();
    let randGiph = chooseRandomlyFromGifs(giphsData.data.length);
    showGifOnDom(giphsData.data[randGiph].images.original.url);
    } catch(err) {
        console.log(err);
    }
}

function showGifOnDom(giphUrl) {
    let giphEl = document.createElement('img');
    giphEl.src = giphUrl;
    giphEl.classList.add('giphs');
    let container = document.querySelector('.container');
    container.style.background = `url('${giphEl.src}') no-repeat`;
    container.style.backgroundSize = 'cover';
}

function chooseRandomlyFromGifs(num)  {
    return (Math.floor(Math.random() * num))
}

function convertKelvinToCelsius(kelvin) {
    return Number.parseFloat((kelvin - 273.15)).toPrecision(2);
}

searchWeatherByCity();