const apiKey = "YOUR_API_KEY";
async function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city name!");
  fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}
function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
      },
      () => {
        alert("Unable to retrieve your location!");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
async function fetchWeatherData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod !== 200) {
      alert("City not found!");
      return;
    }
    document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("temperature").textContent = `🌡 ${data.main.temp}°C`;
    document.getElementById("humidity").textContent = `💧 Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").textContent = `💨 Wind: ${data.wind.speed} m/s`;
    document.getElementById("weatherResult").classList.remove("hidden");
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Failed to fetch weather data!");
  }
}
