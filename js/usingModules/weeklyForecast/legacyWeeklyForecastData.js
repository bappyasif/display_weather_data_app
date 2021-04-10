import {getSvgUrlOnly} from '../weatherIcons.js';
// let dailyForecasts = document.querySelector('.days-forecast');

async function initWeeklyWeatherForecast(latitude, longitude) {
    try {
        let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=c2e7a52486f1a1308371ac385b792714`;
        let weeklyWeatherForcastRequest = await fetch(url);
        let forecastData = await weeklyWeatherForcastRequest.json();
        // console.log(forecastData);
        forecastData['daily'].shift();
        let dailyForecasts = forecastData['daily'];
        // console.log(dailyForecasts);
        // cleanUp(dailyForecasts);
        readyWeeklyWeatherData(dailyForecasts);
    } catch(err) {
        console.log(err);
    }
}

function readyWeeklyWeatherData(forecastData) {
    let today = new Date().getDay();
    // console.log("??",today)
    
    forecastData.forEach(forecast => {
        // console.log("<>",today)
        dailyForecastedWeatherData(forecast, today);
        today += 1;
        today = whichDayOfWeek(today);
    });
}

function whichDayOfWeek(today) {
    return today > 6 ? 0 : today;
}

function dailyForecastedWeatherData(dailyData, today) {
    console.log(dailyData, today);
    let day = checkIsItDay();
    // console.log(day);
    let temp = day ? dailyData['temp']['day'] : dailyData['temp']['night'];
    // console.log(temp);
    let weatherType = dailyData['weather'][0].main;
    // console.log(temp, weatherType);
    // let svgEl = chooseSvg(weatherType.toLowerCase());
    let svgUrl = getSvgUrlOnly(weatherType.toLowerCase());
    console.log(temp, weatherType, svgUrl);
    // let dailyWeatherForecastNode = createNodesForDOM(temp);
    let dailyWeatherForecastNode = createNodesForDOM(svgUrl, temp, today);
    // displayOpenWeatherData(dailyWeatherForecastNode, svgEl);
    displayOpenWeatherData(dailyWeatherForecastNode);
}

function checkIsItDay() {
    let time = new Date().getHours();
    // console.log(time.getHours());
    return time > 6 && time < 18;
}

function displayOpenWeatherData(nodeFragment) {
    console.log(nodeFragment);
    let dailyForecasts = document.querySelector('.days-forecast');
    // if(dailyForecasts.length > 0) cleanUp(dailyForecasts);
    // cleanUp(dailyForecasts);
    dailyForecasts.append(nodeFragment);
    // let showTemps = dailyForecasts.querySelector('.show-temps');
    // showTemps.insertAdjacentElement('afterbegin', svgEl);
}

function cleanUp(container) {
    container.innerHTML = '';
    // container.forEach(item=>item.innerHTML='');
}

function whichDay(day) {
    let days = {
        0: 'Zondag',
        1: 'Mandag',
        2: 'Dinsdag',
        3: 'Woensdag',
        4: 'Donderdag',
        5: 'Vrijdag',
        6: 'Zaterdag'
    }
    return days[day];
}

function createNodesForDOM(svgUrl,temp, day) {
    // let day = whichDay();
    let domStr = 
    `<div class='days'>
        <label>${whichDay(day)}</label>
        <div class='show-temps'>
            <img class='forecast-svg' src='${svgUrl}'/>
            <div class='temp'>${temp}</div>
        </div>
    </div>`;
    let dailyFragment = document.createRange().createContextualFragment(domStr).firstChild;
    return dailyFragment;
}

export {initWeeklyWeatherForecast}