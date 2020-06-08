const DID = (id) => document.getElementById(id);

const city = DID('city');
const tempCurrentD = DID('tempCurrent');
const tempFeelsLikeD = DID('tempFeelsLike');
const tempMaxD = DID('tempMax');
const tempMinD = DID('tempMin');
const descriptionD = DID('description');

const weatherURL = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b3bd6f49f5db753d46c6a24720f1fda7`;

async function fetchData(city) {
    try {
        const url = weatherURL(city);
        const response = await fetch(url, {mode: 'cors'});
        const weatherData = await response.json();
        const processedData = processData(weatherData);
        return processedData
    } catch(err) {
        console.log(err)
    }

}

const processData = (data) => {
    return {
        tempMin: formatTempKToC(data.main.temp_max),
        tempMax: formatTempKToC(data.main.temp_min),
        tempCurrent: formatTempKToC(data.main.temp),
        tempFeelsLike: formatTempKToC(data.main.feels_like),
        description: data.weather[0].description
    }
}

function formatTempKToC (kalvin) {
    return (kalvin - 273.15).toFixed(1) + ' ˚C';
}

async function updateLoc() {
    const {tempMin, tempMax, tempCurrent, tempFeelsLike, description} = await fetchData(city.value)
    tempCurrentD.textContent = 'Temp: ' + tempCurrent;
    tempFeelsLikeD.textContent = 'Feels Like Temp: ' + tempFeelsLike;
    tempMinD.textContent = 'Max: ' + tempMin;
    tempMaxD.textContent = 'Min: ' + tempMax;
    descriptionD.textContent = description;
}