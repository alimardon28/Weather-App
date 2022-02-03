const api = {
    weatherKey: "0d22eda295693becc5ee5b1607ec3a8b",
    weatherUrl: "https://api.openweathermap.org/data/2.5/",
};

const elCitySearchInput = document.querySelector(".city__search");
// const elCitySearchButton = document.querySelector(".city__search-button");

elCitySearchInput.addEventListener("keypress" , setQuery);

function setQuery(e){
    if(e.keyCode == 13){
        getResults(elCitySearchInput.value);
    }
}

function getResults(query){
    fetch(`${api.weatherUrl}weather?q=${query}&units=metric&APPID=${api.weatherKey}`).then((weather) =>{
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather){
    console.log(weather);

    let elLocationCity = document.querySelector('.city__weather')
    elLocationCity.innerHTML = `${weather.name} , ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.date');
    date.innerHTML = dateToCreate(now);

    let weatherTemp = document.querySelector('.temp');
    weatherTemp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let elWeather = document.querySelector('.weather');
    elWeather.innerHTML = weather.weather[0].main;

    let averageTemperature = document.querySelector('.average__temperature');
    averageTemperature.innerHTML = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}

function dateToCreate(s){
    let months = ['January', 'February', 'March', 'April' ,'May' , 'June','July','August','September','October','November','December'];
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    let day = days[s.getDay()];
    let date = s.getDate()
    let month = months[s.getMonth()];
    let year = s.getFullYear();

    return `${day} ${date} ${month} ${year}`;
};