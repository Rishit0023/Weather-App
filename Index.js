const api_key = "38ec57c8cb2aef707ab6c9102dae1f88";

let citySearch = document.querySelector(".weather_search");

let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temp = document.querySelector(".weather_temp");
let w_min = document.querySelector(".weather_min");
let w_max = document.querySelector(".weather_max");

let w_feel = document.querySelector(".weather_feel_like");
let w_hum = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pre = document.querySelector(".weather_pressure");

//Get full country name

const getCountry = (code) => {
    return new Intl.DisplayNames([code], {type: "region"}).of(code);
};

const getDateTime = (dt) => {
    const curDate = new Date(dt * 1000);
    console.log(curDate);

    const Options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    const formatter = new Intl.DateTimeFormat("en-US", Options);

    return formatter.format(curDate);
     
};

let city = "Delhi";

citySearch.addEventListener("submit", (e) => {
    e.preventDefault();

    let searchName = document.querySelector(".search");
    city = searchName.value;
    getWeatherData();

    searchName.value = "";
})

const getWeatherData = async () => {

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPId=38ec57c8cb2aef707ab6c9102dae1f88`;
    
    try {
        const response = await fetch(weatherUrl);

        const data = await response.json();
        //console.log(data);

        const {main, name, weather, wind, sys, dt} = data;

        cityName.innerHTML = `${name},${getCountry(sys.country)}`

        dateTime.innerHTML = getDateTime(dt);

        w_forecast.innerHTML = weather[0].main;

        //w_icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather[0].icon}10d@2x.png"/>`; //"http://openweather.org/img/wn/${weather[0].icon}@4x.png" 

        w_temp.innerHTML = `${main.temp} &#176F`;   

        w_min.innerHTML = `Min: ${main.temp_min} &#176F`;

        w_max.innerHTML = `Max: ${main.temp_max} &#176F`;

        w_feel.innerHTML = `${main.feels_like} &#176F`;

        w_hum.innerHTML = `${main.humidity} %`;

        w_wind.innerHTML = `${wind.speed} m/s`;

        w_pre.innerHTML = `${main.pressure} hPa`;

    } catch (error) {
        console.log(error);
    }
}

document.body.addEventListener("load", getWeatherData());