function date(date) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentYear = date.getFullYear();
  let currentMonth = months[date.getMonth()];
  let currentDay = days[date.getDay()];
  let currentDate = date.getDate();
  let currentHour = date.getHours();
  let currentMinute = date.getMinutes();

  let today = `${currentDay}, ${currentMonth} ${currentDate} ${currentYear}, ${currentHour}:${currentMinute}`;
  return today;
}

let currentDate = document.querySelector("#currentDate");
currentDate.innerHTML = date(new Date());

function searchCity(event) {
  event.preventDefault();
  let changeCity = document.querySelector("#search-city");
  displayCity(changeCity.value);
}

function displayCity(city) {
  let apiKey = "ae3ffbb2ba5fd172289cc56d929ac85e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(getTemp);
}

let checkButton = document.querySelector("#search-form");
checkButton.addEventListener("submit", searchCity);

function getTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(response.data);
  let currentTemp = document.querySelector("#current-weather");
  currentTemp.innerHTML = temperature;
  document.querySelector("#city").innerHTML = response.data.name;
}

function showCurrentLocation(position) {
  let apiKey = `ae3ffbb2ba5fd172289cc56d929ac85e`;
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);
