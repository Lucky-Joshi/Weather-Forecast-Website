document.getElementById('weatherForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const city = document.getElementById('cityInput').value;
    const apiKey = 'cc0b10ba1762869505680d820244a656'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert('City not found!');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Failed to fetch weather data');
        });
});

function displayWeather(data) {
    const weatherHTML = `
        <div class="weather-card">
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        </div>
    `;

    const newTab = window.open();
    newTab.document.body.innerHTML = weatherHTML;
    const style = newTab.document.createElement('style');
    style.innerHTML = `
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: #f0f0f0;
            margin: 0;
        }
        .weather-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin: 20px;
            text-align: center;
        }
        .weather-card h2 {
            margin: 0;
        }
        .weather-card p {
            margin: 5px 0;
        }
    `;
    newTab.document.head.appendChild(style);
}
