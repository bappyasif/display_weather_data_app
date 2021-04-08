function initOpenWeatherData() {
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=dhaka&appid=c2e7a52486f1a1308371ac385b792714';
    let weatherRequest = fetch(url);
    weatherRequest.then(res => res.json()).then(data=> {
        console.log(data, data.weather, data.main);
        let temp = convertKelvinToCelsius(data.main.temp);
        console.log(temp);
    });
}

function initGiphy() {
    let url = 'https://api.giphy.com/v1/gifs/trending?api_key=TpnE8CtDArV0DqW17cilRKXCIptJJ621&s=whatsweather';
    let giphyRequest = fetch(url, {mode:'cors'});
    giphyRequest.then(res=>res.json()).then(giphs => {
        // console.log(giphs, giphs.data)
        let randGiph = chooseRandomlyFromGifs(giphs.data.length);
        console.log(randGiph, giphs.data[randGiph].images.original.url);
        showGifOnDom(giphs.data[randGiph].images.original.url);
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
    return kelvin - 273.15;
}
initOpenWeatherData();
initGiphy();