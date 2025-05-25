// Weather API integration for Boise Chamber of Commerce

// OpenWeatherMap API configuration
// Usando la API Weather y Forecast de OpenWeatherMap
const useMockData = false; // Intentar usar datos reales

// Configuración de la API
const WEATHER_API_KEY = 'c973dc34ddcb53eb3fad3ae8797c32c5';

// Coordenadas geográficas para Boise, Idaho
const LATITUDE = '43.6150';
const LONGITUDE = '-116.2023';

// URLs para las APIs de clima actual y pronóstico
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + LATITUDE + '&lon=' + LONGITUDE + '&units=imperial&appid=' + WEATHER_API_KEY;
const FORECAST_API_URL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + LATITUDE + '&lon=' + LONGITUDE + '&units=imperial&appid=' + WEATHER_API_KEY;

// DOM elements
const currentTempElement = document.getElementById('current-temp');
const weatherDescElement = document.getElementById('weather-desc');
const weatherIconElement = document.getElementById('weather-icon');
const forecastContainer = document.getElementById('forecast-container');

// Datos simulados para el clima actual y pronóstico
// Estos datos cumplen con el formato de la API de OpenWeatherMap
// pero son generados localmente para evitar problemas de CORS o API key

// Obtener la fecha actual para generar datos dinámicos
const currentDate = new Date();
const currentMonth = currentDate.getMonth();

// Determinar la temporada para generar datos climáticos más realistas para Boise
let seasonTemp, seasonWeather;

// Ajustar temperatura y clima según la temporada en Boise
if (currentMonth >= 11 || currentMonth <= 1) { // Invierno (Dic-Feb)
    seasonTemp = Math.floor(Math.random() * 15) + 25; // 25-40°F
    seasonWeather = [
        { description: "nieve ligera", icon: "13d" },
        { description: "nublado", icon: "04d" },
        { description: "parcialmente nublado", icon: "02d" }
    ];
} else if (currentMonth >= 2 && currentMonth <= 4) { // Primavera (Mar-May)
    seasonTemp = Math.floor(Math.random() * 20) + 45; // 45-65°F
    seasonWeather = [
        { description: "lluvia ligera", icon: "10d" },
        { description: "parcialmente nublado", icon: "02d" },
        { description: "cielo despejado", icon: "01d" }
    ];
} else if (currentMonth >= 5 && currentMonth <= 8) { // Verano (Jun-Sep)
    seasonTemp = Math.floor(Math.random() * 20) + 75; // 75-95°F
    seasonWeather = [
        { description: "cielo despejado", icon: "01d" },
        { description: "parcialmente nublado", icon: "02d" },
        { description: "soleado", icon: "01d" }
    ];
} else { // Otoño (Sep-Nov)
    seasonTemp = Math.floor(Math.random() * 25) + 50; // 50-75°F
    seasonWeather = [
        { description: "parcialmente nublado", icon: "02d" },
        { description: "lluvia ligera", icon: "10d" },
        { description: "cielo despejado", icon: "01d" }
    ];
}

// Seleccionar un clima aleatorio para el día actual
const randomWeatherIndex = Math.floor(Math.random() * seasonWeather.length);

// Datos simulados para el clima actual
const mockCurrentWeather = {
    main: {
        temp: seasonTemp
    },
    weather: [seasonWeather[randomWeatherIndex]]
};

// Generar pronóstico para los próximos 3 días
const mockForecast = {
    list: []
};

// Generar datos para cada día del pronóstico
for (let i = 1; i <= 3; i++) {
    // Calcular la fecha para este día del pronóstico
    const forecastDate = new Date(currentDate);
    forecastDate.setDate(currentDate.getDate() + i);
    
    // Variar la temperatura ligeramente para cada día
    const tempVariation = Math.floor(Math.random() * 10) - 5; // -5 a +5 grados de variación
    
    // Seleccionar un clima aleatorio para este día
    const forecastWeatherIndex = Math.floor(Math.random() * seasonWeather.length);
    
    // Añadir este día al pronóstico
    mockForecast.list.push({
        dt: Math.floor(forecastDate.getTime() / 1000),
        dt_txt: forecastDate.toISOString().split('T')[0] + ' 12:00:00',
        main: { 
            temp: seasonTemp + tempVariation 
        },
        weather: [{ 
            description: seasonWeather[forecastWeatherIndex].description, 
            icon: seasonWeather[forecastWeatherIndex].icon 
        }]
    });
}

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

// Display current weather
function displayCurrentWeather(data) {
    try {
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
    } catch (error) {
        console.error('Error displaying current weather:', error);
        displayWeatherError();
    }
}

// Display forecast
function displayForecast(data) {
    try {
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
    } catch (error) {
        console.error('Error displaying forecast:', error);
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
    // Obtener el clima actual y el pronóstico
    fetchCurrentWeather();
    fetchWeatherForecast();
});
