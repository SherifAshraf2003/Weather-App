


const weatherForm = document.querySelector('.weatherForm'); 
const cityName = document.querySelector('.cityName');
const card = document.querySelector('.weatherDisplay');
const apiKey = 'fa914cc684778b453e555c990021d0bd';


weatherForm.addEventListener('submit', async event => {
  event.preventDefault();
  const city = cityName.value;
  if(city){
      try{
        const data = await getWeatherData(city);
        displayWeatherData(data);
      }catch(error){
        console.error(error);
        displayError(error);
      }
  }else{
    displayError('Please enter a city name');
  
  }
});

async function getWeatherData(city){
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
  const data = await response.json();
  if(!response.ok){
    throw new Error("Couldn't find the city");
  }
  return data;
}

function displayWeatherData(data){
  const {name:city, main:{temp, humidity}, weather: [{description, id}]} = data;
  card.textContent = '';
  card.style.display = 'flex';

  const cityDisplay = document.createElement('h1');
  const tempDisplay = document.createElement('p');
  const humidityDisplay = document.createElement('p');
  const descDisplay = document.createElement('p');
  const weatherEmoji = document.createElement('p');

  cityDisplay.textContent = city;
  tempDisplay.textContent = `Temperature: ${(temp-273.15).toFixed(1)}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);  

  cityDisplay.classList.add('cityDisplay');
  tempDisplay.classList.add('tempDisplay');
  humidityDisplay.classList.add('humidityDisplay');
  descDisplay.classList.add('descDisplay');
  weatherEmoji.classList.add('weatherEmoji');

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);



}



function getWeatherEmoji(weatherId){
  if(weatherId >= 200 && weatherId < 300){
    return '⛈️';
  }else if(weatherId >= 300 && weatherId < 600){
    return '🌧️';
  }else if(weatherId >= 600 && weatherId < 700){
    return '❄️';
  }else if(weatherId >= 700 && weatherId < 800){
    return '🌫️';
  }else if(weatherId === 800){
    return '☀️';
  }else if(weatherId > 800){
    return '☁️';
  }
}

function displayError(message){
  const errorDisplay = document.createElement('p');
  errorDisplay.textContent = message;
  errorDisplay.classList.add('errorDisplay');

  card.textContent = '';
  card.style.display = 'flex';
  card.appendChild(errorDisplay);
}



