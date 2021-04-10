import {WeatherData} from './weatherDataUsingFactory.js';

let url = `https://api.openweathermap.org/data/2.5/weather?q=dhaka&appid=c2e7a52486f1a1308371ac385b792714`;
let getData = WeatherData(url);
getData.getCurrentWeatherData();

// let datas = getData.getCurrentWeatherData();
// datas.then(vals=> {
//     console.log(vals);
// })
// let jsonData = getData.getCurrentWeatherData();
// console.log(jsonData);
// getData.extractDataFromJson(jsonData);