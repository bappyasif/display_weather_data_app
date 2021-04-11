/**
 * it wraps weekday counts so that it doesn't exceed 0-6
 * @param {number} today
 * @returns
 */
function whichDayOfWeek(today) {
  return today > 6 ? 0 : today;
}

/**
 * is it a daytime or not
 * @returns
 */
function checkIsItDay() {
  let time = new Date().getHours();
  // console.log(time.getHours());
  return time > 6 && time < 18;
}

/**
 * checks which day of a week it is
 * @param {number} day
 * @returns
 */
function whichDay(day) {
  let days = {
    0: "Zondag",
    1: "Mandag",
    2: "Dinsdag",
    3: "Woensdag",
    4: "Donderdag",
    5: "Vrijdag",
    6: "Zaterdag",
  };
  return days[day];
}

/**
 * returns a DOM node
 * @param {*} svgUrl
 * @param {*} temp
 * @param {*} day
 * @returns
 */
function createNodesForDOM(svgUrl, temp, day) {
  // let day = whichDay();
  let domStr = 
  `<div class='days contrasted'>
        <label>${whichDay(day)}</label>
        <div class='show-temps'>
            <img class='forecast-svg' src='${svgUrl}'/>
            <div class='temp'>${temp}</div>
        </div>
    </div>`;
  let dailyFragment = document.createRange().createContextualFragment(domStr)
    .firstChild;
  return dailyFragment;
}

/**
 * utility function to clean up previously held divs data
 * @param {*} domElements
 */
function cleanUpPreviousData(domElements) {
  domElements.forEach((node) => (node.textContent = ""));
}

/**
 * utility to convert kelvin to celsius
 * @param {number} kelvin
 * @returns
 */
function convertKelvinToCelsius(kelvin) {
  return Number.parseFloat(kelvin - 273.15).toPrecision(2);
}

function createLeftViewNode(dataObj) {
  let domStr = `<div class='left-view contrasted'>
      <div class="city-detail">
        <span>${dataObj["cityName"]} city sky is forecasted currently as ${dataObj["weatherType"]}</span>
      </div>
      <div class="w-now">
        <div class="svg-div">
          <img src='${dataObj["svgUrl"]}' class='svgs'/>
        </div>
        <div class="temp-div">${convertKelvinToCelsius(dataObj["temp"])}</div>
      </div>
    </div>
    `;
  let leftNode = document.createRange().createContextualFragment(domStr)
    .firstChild;
  return leftNode;
}

function createRightViewNode(dataObj) {
  let domStr = `<div class='right-view contrasted'>
    <div class="temp-details">Temperature Details</div>
      <fieldset>
        <label>feels like</label>
        <div class="feels-like">${convertKelvinToCelsius(
          dataObj["feelsLike"]
        )}</div>
      </fieldset>
      <fieldset>
        <label>max-temp</label>
        <div class="max-temp">${convertKelvinToCelsius(
          dataObj["tempMax"]
        )}</div>
      </fieldset>
      <fieldset>
        <label>min-temp</label>
        <div class="min-temp">${convertKelvinToCelsius(
          dataObj["tempMin"]
        )}</div>
      </fieldset>
      <fieldset>
        <label>humidity</label>
        <div class="humidity">${dataObj["humidity"]}</div>
      </fieldset>
    </div>
    `;
  let rightNode = document.createRange().createContextualFragment(domStr)
    .firstChild;
  return rightNode;
}

function getSvgIconUrl(weatherType) {
  let svgTypes = {
    haze: "../../icons/heavy_clouds.svg",
    cloud: "../../icons/mostly_cloudy.svg",
    mist: "../../icons/partly_cloudy.svg",
    clear: "../../icons/mostly_sunny.svg",
    rain: "../../icons/sunny_rainy.svg",
    storm: "../../icons/sun_rain.svg",
    scat: "../../icons/less_cloudy.svg"
  };

  for (let key in svgTypes) {
    // console.log(weatherType.includes(key), weatherType, svgTypes[weatherType]);
    if (weatherType.includes(key)) {
      return svgTypes[key];
    } 
    // else {
    //   return svgTypes['less'];
    // }
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

export {
  whichDayOfWeek,
  whichDay,
  checkIsItDay,
  createNodesForDOM,
  convertKelvinToCelsius,
  cleanUpPreviousData,
  createLeftViewNode,
  createRightViewNode,
  getSvgIconUrl,
  showGifOnDom,
  chooseRandomlyFromGifs
};
