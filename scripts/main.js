import orderedDays from "./Utility/timeHandler.js";

const API_KEY = "2bafbeb367d729d6edb9335e000158bf";

let resultsApi;

const weatherApp = document.querySelector(".weather-app");
const temperatureApp = document.querySelector(".temperature-app");
const locationApp = document.querySelector(".location-app");
const hour = document.querySelectorAll(".hour-name-prevision");
const weatherByHour = document.querySelectorAll(".hour-prevision-value");
const daysDiv = document.querySelectorAll(".day-prevision-name");
const daysWeatherDiv = document.querySelectorAll(".day-prevision-temperature");
const weatherIcon = document.querySelector(".logo-weather");
const loadingContainer = document.querySelector(".overlay-icon-loading");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      let long = position.coords.longitude;
      let lat = position.coords.latitude;

      callApi(long, lat);
    },

    () => {
      alert("We cannot locate your position, please allow the geolocation.");
    }
  );
}
const callApi = (long, lat) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&appid=${API_KEY}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      resultsApi = data;

      weatherApp.innerText = resultsApi.current.weather[0].description;
      temperatureApp.innerText = `${Math.trunc(
        resultsApi.current.temperature
      )}℃`;
      locationApp.innerText = resultsApi.timezone;

      // Hours, every 3h, with their temperature
      let actualHour = new Date().getHours();

      for (let i = 0; i < hour.length; i++) {
        let incrHour = actualHour + i * 3;

        if (incrHour > 24) {
          hour[i].innerText = `${incrHour - 24} h`;
        } else if (incrHour === 24) {
          hour[i].innerText = "00 h";
        } else {
          hour[i].innerText = `${incrHour} h`;
        }
      }

      //Weather, every 3h
      for (let j = 0; j < weatherByHour.length; j++) {
        weatherByHour[j].innerText = `${Math.trunc(
          resultsApi.hourly[j * 3].temp
        )}℃`;
      }

      // Days' first three letters
      for (let k = 0; k < orderedDays.length; k++) {
        daysDiv[k].innerText = orderedDays[k].slice(0, 3);
      }
      // Weather by day
      for (let m = 0; m < 7; m++) {
        daysWeatherDiv[m].innerText = `${Math.trunc(
          resultsApi.daily[m + 1].temp.day
        )}℃`;
      }

      // Dynamic icon
      if (actualHour >= 6 && actualHour < 21) {
        weatherIcon.src = `resources/day/${resultsApi.current.weather[0].icon}.svg`;
      } else {
        weatherIcon.src = `resources/night/${resultsApi.current.weather[0].icon}.svg`;
      }

      loadingContainer.classList.add("vanishing");
    });
};
