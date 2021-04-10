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

/**
 * returns a DOM node
 * @param {*} svgUrl 
 * @param {*} temp 
 * @param {*} day 
 * @returns 
 */
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

export {whichDayOfWeek, whichDay, checkIsItDay, createNodesForDOM, convertKelvinToCelsius, cleanUpPreviousData}