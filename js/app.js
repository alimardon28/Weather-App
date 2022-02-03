let elLocationCity = document.querySelector('.city__weather');
let date = document.querySelector('.date');
let weatherTemp = document.querySelector('.temp');
let elTempIcons = document.getElementById('#temp__icon');
let elWeather = document.querySelector('.weather');
let averageTemperature = document.querySelector('.average__temperature');
let img;


const elCitySearchInput = document.querySelector(".city__search");
// const elCitySearchButton = document.querySelector(".city__search-button");

const api = {
    weatherKey: "0d22eda295693becc5ee5b1607ec3a8b",
    weatherUrl: "https://api.openweathermap.org/data/2.5/",
};

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
    elLocationCity.innerHTML = `${weather.name} , ${weather.sys.country}`;

    let now = new Date();
    date.innerHTML = dateToCreate(now);

    weatherTemp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    // if(id<300 && id>200){
    //     elTempIcons.textContent.src="./img/weather.png"
    // }else if(id<400 && id>300){
    //     elTempIcons.textContent.src="./img/cloud.svg"
    // }else  if(id<600 && id>500){
    //     elTempIcons.textContent.src="./img/rain.svg"
    // }else  if(id<700 && id>600){
    //     elTempIcons.textContent.src="./img/snow.svg"
    // }else  if(id<800 && id>700){
    //     elTempIcons.textContent.src="./img/cloud.svg"
    // }else  if(id==800){
    //     elTempIcons.textContent.src="./img/sunny-sunny.svg"
    // }

    elWeather.innerHTML = weather.weather[0].main;
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