const form = document.getElementById('weatherForm')
const inputField = document.getElementById('searchInput')

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const city = inputField.value.trim()

    if (!city) {
        alert('provide a city')
        return
    }

    try {
        const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)
        const data = await response.json()

        if (!response.ok) {
            alert(data.message || 'Could not find that city')
            return
        }

        showWeather(data)

    } catch (error) {
        console.log(error.message)
        alert('Something went wrong fetching the weather')
    }
})

function showWeather(data) {
    document.getElementById('cityName').textContent = `${data.name},`
    document.getElementById('locationSub').textContent = `${data.sys.country}`
    document.getElementById('tempValue').textContent = Math.round(data.main.temp)
    document.getElementById('feelsLikeValue').textContent = Math.round(data.main.feels_like)
    document.getElementById('humidityValue').textContent = `${data.main.humidity}%`
    document.getElementById('cloudValue').textContent = `${data.clouds.all}%`
    document.getElementById('windValue').textContent = `${Math.round(data.wind.speed * 3.6)} km/h`
    document.getElementById('conditionText').textContent = data.weather[0].description
}