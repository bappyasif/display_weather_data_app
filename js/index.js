function searchWeatherByCity() {
    let inputEl = document.querySelector('input');
    inputEl.addEventListener('keyup', evt => {
        if(evt.key === 'Enter') {
            // console.log(evt.key);
            let userInput = evt.target.value;
            console.log(userInput);
            initOpenWeatherData(userInput);
        }
    });
}

function initOpenWeatherData(cityName) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=c2e7a52486f1a1308371ac385b792714`;
    let weatherRequest = fetch(url);
    weatherRequest.then(res => res.json()).then(data=> {
        // console.log(data, data.weather, data.main);
        readyOpenWeatherData(data);
        // let temp = convertKelvinToCelsius(data.main.temp);
        // console.log(temp);
    });
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
    initGiphy(data.weather[0].main);
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

function initGiphy(weatherType) {
    console.log(weatherType)
    // let url = `https://api.giphy.com/v1/gifs/trending?api_key=TpnE8CtDArV0DqW17cilRKXCIptJJ621&s=${weatherType}`;
    // let url = `https://api.giphy.com/v1/gifs/random?api_key=TpnE8CtDArV0DqW17cilRKXCIptJJ621&tag=${weatherType}`;
    // let url = `https://api.giphy.com/v1/gifs/search?api_key=TpnE8CtDArV0DqW17cilRKXCIptJJ621&tag=${weatherType}&limit=20`;
    let url = `https://api.giphy.com/v1/gifs/search?api_key=TpnE8CtDArV0DqW17cilRKXCIptJJ621&q=${weatherType}&limit=20`;
    let giphyRequest = fetch(url, {mode:'cors'});
    giphyRequest.then(res=>res.json()).then(giphs => {
        console.log(giphs, giphs.data)
        let randGiph = chooseRandomlyFromGifs(giphs.data.length);
        // console.log(randGiph, giphs.data[randGiph].images.original.url);
        // console.log(randGiph, giphs.data.images.original.url);
        showGifOnDom(giphs.data[randGiph].images.original.url);
        // showGifOnDom(giphs.data.images.original.url);
    });
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
// initOpenWeatherData();
searchWeatherByCity();
// initGiphy();