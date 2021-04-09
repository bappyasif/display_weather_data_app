import {initOpenWeatherData} from "./openWeather.js";

function searchWeatherByCity() {
    let inputEl = document.querySelector('input');
    inputEl.addEventListener('keyup', async evt => {
        if(evt.key === 'Enter') {
            let userInput = evt.target.value;
            await initOpenWeatherData(userInput);
        }
    });
}

searchWeatherByCity();