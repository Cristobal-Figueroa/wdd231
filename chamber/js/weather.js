// Weather API integration for Boise Chamber of Commerce

// OpenWeatherMap API configuration
const WEATHER_API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
const CITY_ID = '5586437'; // Boise, ID city ID
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?id=${CITY_ID}&units=imperial&appid=${WEATHER_API_KEY}`;
const FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?id=${CITY_ID}&units=imperial&appid=${WEATHER_API_KEY}`;

// DOM elements
const currentTempElement = document.getElementById('current-temp');
const weatherDescElement = document.getElementById('weather-desc');
const weatherIconElement = document.getElementById('weather-icon');
const forecastContainer = document.getElementById('forecast-container');

// Fetch current weather data
async function fetchCurrentWeather() {
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
