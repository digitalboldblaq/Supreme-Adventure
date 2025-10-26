//WEATHER APP

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKeys = "0bb64af02f596c9a0efb2c930e984211";

weatherForm.addEventListener("submit",  async event => {
event.preventDefault();
const city = cityInput.value;
if(city){
    try{
        const weatherData = await getweatherData(city);
        displayweatherInfo(weatherData)
    }catch(error){
        console.error(error);
        displayError(error);
    }

}else{
displayError("Please enter a city");
}
});

function showLoading() {
  document.getElementById("loading").classList.remove("hidden");
  document.getElementById("weather-info").classList.add("hidden");
}

function hideLoading() {
  document.getElementById("loading").classList.add("hidden");
  document.getElementById("weather-info").classList.remove("hidden");
}

async function getweatherData(city){

    try{
      showLoading();
  
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeys}&units=metric`;
    const response = await fetch(apiUrl);
    console.log(response);

    if(!response.ok){
        throw new Error("could not fetch weather data");
    }

    return await response.json();
      } catch (error){
        throw new Error("could not fetch weather data. please try again")
      }finally{
        hideLoading();
      }
}

function displayweatherInfo(data){
    const {
        name: city,
        main:{temp,humidity},
        weather:[{ description , id}]
    } = data;

        card.textContent = "";
        card.style.display = "flex";

        const cityDisplay = document.createElement("h1");
      const tempDisplay = document.createElement("p");
       const humidityDIsplay = document.createElement("p");
       const descDisplay = document.createElement("p");
       const weatherEmoji = document.createElement("p");

     cityDisplay. textContent = city;
     tempDisplay.textContent = `${temp.toFixed(1)}°C`;
     humidityDIsplay.textContent =` Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getweatherEmoji(id);

     cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
     humidityDIsplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");




    card.appendChild(cityDisplay);
     card.appendChild(tempDisplay);
     card.appendChild(humidityDIsplay);
      card.appendChild(descDisplay);
      card.appendChild(weatherEmoji);

}

function getweatherEmoji(weatherId) {
  switch (true) {
    case (weatherId >= 200 && weatherId < 300):  // Thunderstorm
      return "⛈️";

    case (weatherId >= 300 && weatherId < 400):  // Drizzle
      return "🌧️";

    case (weatherId >= 500 && weatherId < 600):  // Rain
      return "🌧️";

    case (weatherId >= 600 && weatherId < 700):  // Snow
      return "❄️";

    case (weatherId >= 700 && weatherId < 800):  // Atmosphere (mist, smoke, haze)
      return "🌫️";

    case (weatherId === 800):  // Clear sky
      return "☀️";

    case (weatherId > 800 && weatherId < 900):  // Clouds
      return "☁️";

    default:
      return "❓";  // Unknown
  }
}

function displayError(message){

const errorDisplay = document.createElement("p");
errorDisplay.textContent = message;
errorDisplay.classList.add(".errorDisplay");

card.textContent = "";
card.style.display = "flex";
card.appendChild(errorDisplay);

}