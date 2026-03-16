import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function getWeatherLabel(code) {
    if (code === 0) return "Clear Sky ☀️";
    if (code <= 2) return "Partly Cloudy ⛅";
    if (code === 3) return "Overcast ☁️";
    if (code <= 49) return "Foggy 🌫️";
    if (code <= 59) return "Drizzle 🌦️";
    if (code <= 69) return "Rainy 🌧️";
    if (code <= 79) return "Snowy 🌨️";
    if (code <= 84) return "Rain Showers 🌦️";
    if (code <= 94) return "Thunderstorm ⛈️";
    return "Unknown";
  }

  async function handleSearch() {
    if (!city.trim()) return setError("Please enter a city name.");

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      // Step 1 - Get coordinates from city name
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError("City not found. Please try another name.");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // Step 2 - Get weather using coordinates
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relative_humidity_2m,wind_speed_10m,apparent_temperature&temperature_unit=celsius`
      );
      const weatherData = await weatherRes.json();
      const current = weatherData.current_weather;

      setWeather({
        city: name,
        country: country,
        temp: current.temperature,
        wind: current.windspeed,
        label: getWeatherLabel(current.weathercode),
        humidity: weatherData.hourly.relative_humidity_2m[0],
        feelsLike: weatherData.hourly.apparent_temperature[0],
      });

    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSearch();
  }

  return (
    <div className="page">

      {/* Header */}
      <header className="header">
        <p className="header-logo">✦ MyApp</p>
        <nav className="header-nav">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      {/* Main */}
      <main className="main">
        <div className="container">
          <h1>Weather Dashboard</h1>
          <p className="subtitle">SEARCH FOR ANY CITY</p>
          <div className="divider"></div>

          {/* Search */}
          <div className="section">
            <p className="section-title">ENTER CITY</p>
            <div className="input-row">
              <input
                type="text"
                placeholder="e.g. London, Tokyo, New York..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button onClick={handleSearch}>Search</button>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="card center">
              <p className="muted">Fetching weather data...</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="card center">
              <p className="error">{error}</p>
            </div>
          )}

          {/* Weather Result */}
          {weather && (
            <div className="section">
              <div className="divider"></div>
              <p className="section-title">CURRENT WEATHER</p>

              <div className="card">
                <h2 className="city-name">{weather.city}, {weather.country}</h2>
                <p className="weather-label">{weather.label}</p>
                <p className="temp">{weather.temp}°C</p>

                <div className="divider"></div>

                <div className="stats-grid">
                  <div className="stat-item">
                    <p className="stat-label">FEELS LIKE</p>
                    <p className="stat-value">{weather.feelsLike}°C</p>
                  </div>
                  <div className="stat-item">
                    <p className="stat-label">HUMIDITY</p>
                    <p className="stat-value">{weather.humidity}%</p>
                  </div>
                  <div className="stat-item">
                    <p className="stat-label">WIND SPEED</p>
                    <p className="stat-value">{weather.wind} km/h</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Default Empty State */}
          {!loading && !error && !weather && (
            <p className="empty">Enter a city above to see the weather.</p>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 MyApp. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Support</a>
        </div>
      </footer>

    </div>
  );
}

export default App;