const form = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const errorBox = document.getElementById('weatherError');

const weatherIcon = document.getElementById('weatherIcon');
const conditionText = document.getElementById('conditionText');
const tempValue = document.getElementById('tempValue');
const feelsLikeValue = document.getElementById('feelsLikeValue');
const updatedTime = document.getElementById('updatedTime');
const cityName = document.getElementById('cityName');
const locationSub = document.getElementById('locationSub');
const cloudValue = document.getElementById('cloudValue');
const windValue = document.getElementById('windValue');
const humidityValue = document.getElementById('humidityValue');

// maps OpenWeatherMap's condition name to one of the FontAwesome
// icons already used elsewhere in this page's markup
function getIconClass(main) {
    const icons = {
        Clear: 'fa-sun',
        Clouds: 'fa-cloud',
        Rain: 'fa-cloud-rain',
        Drizzle: 'fa-cloud-rain',
        Thunderstorm: 'fa-cloud-bolt',
        Snow: 'fa-snowflake',
        Mist: 'fa-smog',
        Fog: 'fa-smog',
        Haze: 'fa-smog'
    };
    return icons[main] || 'fa-cloud';
}

async function loadWeather(city) {
    errorBox.style.display = 'none';

    try {
        const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
        const data = await response.json();

        if (!response.ok) {
            errorBox.textContent = data.message || 'Could not load weather for that city.';
            errorBox.style.display = 'block';
            return;
        }

        updateUI(data);

    } catch (error) {
        console.error(error);
        errorBox.textContent = 'Could not reach the weather service.';
        errorBox.style.display = 'block';
    }
}

function updateUI(data) {
    const condition = data.weather[0].main;
    const description = data.weather[0].description;

    weatherIcon.className = `fa-solid ${getIconClass(condition)} text-white opacity-75`;
    conditionText.textContent = description.replace(/\b\w/g, c => c.toUpperCase());
    tempValue.textContent = Math.round(data.main.temp);
    feelsLikeValue.textContent = Math.round(data.main.feels_like);
    updatedTime.textContent = 'Updated just now';

    cityName.textContent = `${data.name},`;
    locationSub.textContent = `${data.sys.country} • ${new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}`;

    cloudValue.textContent = `${data.clouds.all}%`;
    windValue.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    humidityValue.textContent = `${data.main.humidity}%`;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        loadWeather(city);
    }
});

// load the default city shown in the search bar as soon as the page opens
loadWeather(cityInput.value);