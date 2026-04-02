let btnElement = document.querySelector("#getWeatherBTN")
let inputElement = document.querySelector("#cityInput")
let resultElement = document.querySelector("#showWeather")

function renderData(dataWeather) {

    let weather = dataWeather.weather[0].main;
    let icon = "";

    if (weather == "Clouds") {
        icon = '<i class="fa-solid fa-cloud whitecloud"></i>';
    }
    else if (weather == "Rain") {
        icon = '<i class="fa-solid fa-cloud-rain rain"></i>';
    }
    else if (weather == "Clear") {
        icon = '<i class="fa-solid fa-sun clouds" ></i>';
    }
    else if (weather == "Snow") {
        icon = '<i class="fa-solid fa-snowflake" style="color:#4fc3f7></i>';
    }
    else if(weather == "Smog"){
        icon = '<i class="fa-solid fa-smog" style="color:gray></i>'
    }
    else{
        icon = '<i class="fa-solid fa-bolt clouds"></i>'
    }

    resultElement.innerHTML = `

<h3 class="text-center">${dataWeather.name} <span style="color:gray">${dataWeather.sys.country}</span></h3>

<div class="weatherIcon text-center ">${icon}</div>
<h1 class="text-center light p-3">Weather Dashboard</h1>

 <div class="top-cards">

        <div class="card-box">
            <i class="fa-solid fa-temperature-high temp"></i>
            <h6>Temperature</h6>
            <h3>${dataWeather.main.temp}<sup>°</sup>C</h3>
        </div>

        <div class="card-box">
            <i class="fa-solid fa-cloud-rain rain"></i>
            <h6>Weather</h6>
            <h3>${dataWeather.weather[0].main} </h3>
        </div>

         <div class="card-box">
            <i class="fa-solid fa-droplet humidity"></i>
            <h6>Humidity</h6>
            <h3>${dataWeather.main.humidity}%</h3>
        </div>

         <div class="card-box">
            <i class="fa-solid fa-wind wind"></i>
            <h6>Speed</h6>
            <h3>${dataWeather.wind.speed}km/h</h3>
        </div>

         <div class="card-box">
            <i class="fa-solid fa-temperature-high max"></i>
            <h6>Maximum Temperature</h6>
            <h3>${dataWeather.main.temp_max}<sup>°</sup>C</h3>
        </div>

         <div class="card-box">
            <i class="fa-solid fa-temperature-low min"></i>
            <h6> Minimum Temperature</h6>
            <h3>${dataWeather.main.temp_min}<sup>°</sup>C</h3>
        </div>

         <div class="card-box">
            <i class="fa-solid fa-cloud-sun alert"></i>
            <h6>Description</h6>
            <h3>${dataWeather.weather[0].description}</h3>
        </div>   
</div>
`
}

async function fetchAPI(cName) {
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cName}&units=metric&appid=ca018df54353f065aaed7d802825b8be`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            renderData(data)
        })
        .catch(err => console.log(err))


    document.getElementById("icon").innerHTML = icon;

}

function showWeather() {
    const city = inputElement.value
    fetchAPI(city)
    inputElement.value = ''
}

btnElement.addEventListener('click', showWeather)
