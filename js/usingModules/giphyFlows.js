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

export {initGiphy}