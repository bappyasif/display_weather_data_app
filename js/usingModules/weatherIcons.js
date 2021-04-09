let svgTypes = {
    haze: '../icons/heavy_clouds.svg',
    clouds: '../icons/mostly_cloudy.svg',
    mist: '../icons/partly_cloudy.svg',
    clear: '../icons/mostly_sunny.svg',
    rains: '../icons/sunny_rainy.svg',
    stormy: '../icons/sun_rain.svg'
}

function getSvgUrlOnly(weatherType) {
    for(let key in svgTypes) {
        // console.log(weatherType.includes(key));
        if(key.includes(weatherType)) {
            return svgTypes[key];
        }
    }
}

function chooseSvg(weatherType) {
    // console.log(weatherType);   
    for(let key in svgTypes) {
        // console.log(weatherType.includes(key));
        if(key.includes(weatherType)) {
            return displayingSvg(svgTypes[key]);
        }
    }
}

function displayingSvg(url) {
    // console.log(url);
    let svgEl = document.createElement("img");
    svgEl.src = url;
    svgEl.classList.add('svgs');
    return svgEl;
}

export {chooseSvg, getSvgUrlOnly}