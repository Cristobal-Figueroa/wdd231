// Weather API integration for Boise Chamber of Commerce

// OpenWeatherMap API configuration
// Debido a problemas con la API, volvemos a usar datos de ejemplo
const useMockData = true; // Usando datos de ejemplo

// Configuración real de la API - Nota: puede haber problemas con la API key o limitaciones de CORS
// Para un entorno de producción, necesitarías un backend o proxy para evitar exponer la API key
const WEATHER_API_KEY = 'c973dc34ddcb53eb3fad3ae8797c32c5'; 
const CITY_ID = '5586437'; // Boise, ID city ID
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather?id=' + CITY_ID + '&units=imperial&appid=' + WEATHER_API_KEY;
const FORECAST_API_URL = 'https://api.openweathermap.org/data/2.5/forecast?id=' + CITY_ID + '&units=imperial&appid=' + WEATHER_API_KEY;

// DOM elements
const currentTempElement = document.getElementById('current-temp');
const weatherDescElement = document.getElementById('weather-desc');
const weatherIconElement = document.getElementById('weather-icon');
const forecastContainer = document.getElementById('forecast-container');

// Datos de ejemplo para desarrollo/pruebas
const mockCurrentWeather = {
    main: {
        temp: 75.2
    },
    weather: [{
        description: "cielo despejado",
        icon: "01d"
    }]
};

const mockForecast = {
    list: [
        {
            dt: Math.floor(Date.now() / 1000) + 86400, // Mañana
            dt_txt: new Date(Date.now() + 86400000).toISOString().split('T')[0] + ' 12:00:00',
            main: { temp: 78.5 },
            weather: [{ description: "parcialmente nublado", icon: "02d" }]
        },
        {
            dt: Math.floor(Date.now() / 1000) + 172800, // Pasado mañana
            dt_txt: new Date(Date.now() + 172800000).toISOString().split('T')[0] + ' 12:00:00',
            main: { temp: 80.1 },
            weather: [{ description: "soleado", icon: "01d" }]
        },
        {
            dt: Math.floor(Date.now() / 1000) + 259200, // En tres días
            dt_txt: new Date(Date.now() + 259200000).toISOString().split('T')[0] + ' 12:00:00',
            main: { temp: 76.8 },
            weather: [{ description: "lluvia ligera", icon: "10d" }]
        }
    ]
};

// Fetch current weather data
async function fetchCurrentWeather() {
    if (useMockData) {
        // Usar datos de ejemplo
        displayCurrentWeather(mockCurrentWeather);
        return;
    }
    
    try {
        const response = await fetch(WEATHER_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        console.error('Error fetching current weather data:', error);
        displayWeatherError();
    }
}

// Display current weather
function displayCurrentWeather(data) {
    // Extract weather data
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    
    // Update DOM elements
    currentTempElement.textContent = temperature;
    weatherDescElement.textContent = description;
    weatherIconElement.src = iconUrl;
    weatherIconElement.alt = description;
}

// Fetch weather forecast
async function fetchWeatherForecast() {
    if (useMockData) {
        // Usar datos de ejemplo
        displayForecast(mockForecast);
        return;
    }
    
    try {
        const response = await fetch(FORECAST_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error('Error fetching forecast data:', error);
        displayForecastError();
    }
}

// Display 3-day forecast
function displayForecast(data) {
    // Clear forecast container
    forecastContainer.innerHTML = '';
    
    // Get forecast for noon each day (12:00)
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00'));
    
    // Take only the first 3 days
    const threeDayForecast = dailyForecasts.slice(0, 3);
    
    // Create forecast elements
    threeDayForecast.forEach(day => {
        // Create forecast day element
        const forecastDay = document.createElement('div');
        forecastDay.className = 'forecast-day';
        
        // Format date
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        // Round temperature
        const temp = Math.round(day.main.temp);
        
        // Get weather icon
        const iconCode = day.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
        
        // Create forecast HTML
        forecastDay.innerHTML = `
            <p class="forecast-date">${dayName}</p>
            <img src="${iconUrl}" alt="${day.weather[0].description}" class="forecast-icon">
            <p class="forecast-temp">${temp}°F</p>
        `;
        
        // Add to forecast container
        forecastContainer.appendChild(forecastDay);
    });
}

// Display error message for current weather
function displayWeatherError() {
    currentTempElement.textContent = '--';
    weatherDescElement.textContent = 'Weather data unavailable';
    weatherIconElement.src = '';
    weatherIconElement.alt = 'Weather data unavailable';
}

// Display error message for forecast
function displayForecastError() {
    forecastContainer.innerHTML = '<p class="error">Forecast data unavailable</p>';
}

// Initialize weather data on page load
document.addEventListener('DOMContentLoaded', function() {
    fetchCurrentWeather();
    fetchWeatherForecast();
});
