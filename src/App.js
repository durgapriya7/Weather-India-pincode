import { useState,useEffect } from "react";

function App() {
  const [search, setSearch] = useState("thiruvananthapuram");
  const [city, setCity] = useState(null);
  const [error, setError] = useState("");

  const getWeatherData = () => {
    const isZip = /^[0-9]{5,6}$/.test(search);

    const query = isZip
      ? `zip=${search},IN` // Append `,IN` for Indian Pin codes
      : `q=${search}`; // For city names

    fetch(`https://api.openweathermap.org/data/2.5/weather?${query}&appid=7db7f4dc24f41ff2956b0ddce4ddf5da&units=metric`)
      .then(response => response.json())
      .then(result => {
        if (result.cod === 200) {
          setCity(result);
          setError("");
        } else {
          setCity(null);
          setError("Location not found. Please try again.");
        }
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
        setError("Failed to fetch data. Please try again later.");
      });
  };

  useEffect(() => {
    getWeatherData();
  }, [search]);

  return (
    <div className="App">
      <div className="weather-card">
        <div className="search">
          <input 
            type="search" 
            placeholder="Enter city name or ZIP/Pin code" 
            spellCheck="false" 
            onChange={(e) => setSearch(e.target.value)} 
          />
        </div>
        {error && <p className="error">{error}</p>}
        {city ? (
          <div className="weather">
            <img 
              className="weather-icon" 
              src="https://static.vecteezy.com/system/resources/previews/024/825/182/non_2x/3d-weather-icon-day-with-rain-free-png.png" 
              alt="weather-icon" 
            />
            <h1 className="temp">{city?.main?.temp}°C </h1>
            <h2 className="city">{city?.name}</h2>
            <div className="details">
              <div style={{ display: 'flex' }} className="col">
                <img 
                  className="humi" 
                  src="https://static-00.iconduck.com/assets.00/humidity-icon-2048x1675-xxsge5os.png" 
                  alt="humidity-icon" 
                />
                <div className="info">
                  <p className="humidity">{city?.main?.humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="col">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/136/136712.png" 
                  alt="wind-icon" 
                />
                <div className="info">
                  <p className="wind">{city?.wind?.speed} km/h</p>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
export default App
