const apiKey = '89159feb546b2bfd8414fbf0260c7099'

    const searchButton = document.getElementById('searchButton');
    const cityInput = document.getElementById('cityInput');

    const cityElement = document.getElementById('city');
    const cityIconEl = document.getElementById('city-icon')
    const temperatureElement = document.getElementById('temperature');
    const windElement = document.getElementById('wind');
    const humidityElement = document.getElementById('humidity');

    const forecastDays = document.querySelectorAll('.forecast > div');

    // Function to store the searched city in local storage
function addToSearchHistory(city) {
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || { cities: [] };
    searchHistory.cities.push(city);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }

// Function to display the search history as buttons
function displaySearchHistory() {
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || { cities: [] };
    const searchHistoryDiv = document.querySelector('.search-history');
    searchHistoryDiv.innerHTML = '';
  
    for (const city of searchHistory.cities) {
      const button = document.createElement('button');
      button.textContent = city;
      button.addEventListener('click', () => {
        // Call the API with the selected city when the button is clicked
        searchWeather(city);
      });
      searchHistoryDiv.appendChild(button);
    }
  }  

    //event listener for search button
    searchButton.addEventListener('click', () => {
        const city = cityInput.value;
        if (city.trim() === '') {
          alert('Please enter a city name.');
          return;
        }
    
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            // Extract the relevant data from the API response
            const cityName = data.city.name;
            const temperature = data.list[0].main.temp;
            const wind = data.list[0].wind.speed;
            const humidity = data.list[0].main.humidity;
            const date = data.list[0].dt_txt;
            const cityIcon = data.list[0].weather[0].icon;
            console.log(cityIcon);
            console.log(data);

            addToSearchHistory(city);

            displaySearchHistory();

            const formattedDate = dayjs(date).format('MM/DD/YYYY');
    
            // Update the content of the weather-info div
            cityElement.textContent = cityName + " " + "(" + formattedDate + ")";
            cityIconEl.src = `https://openweathermap.org/img/w/${cityIcon}.png`;
            temperatureElement.textContent = temperature + ' °C';
            windElement.textContent = wind + ' m/s';
            humidityElement.textContent = humidity;
    
             // Display 5-day forecast information
            for (let i = 1; i <= 5; i++) {
                const forecast = data.list[i];
                const forecastDate = dayjs(forecast.dt_txt).format('MM/DD/YYYY');
                const weatherIcon = forecast.weather[0].icon;
                const temperature = forecast.main.temp;
                const wind = forecast.wind.speed;
                const humidity = forecast.main.humidity;
    
                const dayElement = forecastDays[i - 1];
                dayElement.querySelector('.date').textContent = forecastDate;
                dayElement.querySelector('.weather-icon').src = `https://openweathermap.org/img/w/${weatherIcon}.png`;
                dayElement.querySelector('.temperature').textContent = temperature + ' °C';
                dayElement.querySelector('.wind').textContent = wind + ' m/s';
                dayElement.querySelector('.humidity').textContent = humidity;
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      });

      displaySearchHistory();