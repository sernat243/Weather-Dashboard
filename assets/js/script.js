const apiKey = '89159feb546b2bfd8414fbf0260c7099'

    const searchButton = document.getElementById('searchButton');
    const cityInput = document.getElementById('cityInput');

    const cityElement = document.getElementById('city');
    const temperatureElement = document.getElementById('temperature');
    const windElement = document.getElementById('wind');
    const humidityElement = document.getElementById('humidity');

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
            console.log(data);
    
            // Update the content of the weather-info div
            cityElement.textContent = cityName;
            temperatureElement.textContent = temperature + ' °C';
            windElement.textContent = wind + ' m/s';
            humidityElement.textContent = humidity;
    
            // Use the data to update the 5-day forecast divs (if needed)
            // ...
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      });