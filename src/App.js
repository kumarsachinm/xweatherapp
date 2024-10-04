import "./App.css";
import { useState } from "react";

export default function App() {
  const [loading, setLoading] = useState("");
  const [text, setText] = useState("");
  const [apiData, setApiData] = useState({});
  const [isApiData, setIsApiData] = useState(false);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=3ed0316e183c4a32b85143523230110&q=${text}&aqi=yes`
      );
      const data = await response.json();
      setApiData(data);
      console.log("data", data);
      console.log("apiData", apiData);
      console.log("loading weather data of", text);
      setIsApiData(true);
    } catch (error) {
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <form>
        <input
          style={{
            marginTop: "40px",
            height: "30px",
            marginRight: "20px",
            fontSize: "20px",
          }}
          placeholder="Enter city name"
          type="text"
          value={text}
          onChange={handleChange}
        />
        <button
          style={{
            backgroundColor: "green",
            color: "white",
            height: "35px",
            width: "100px",
          }}
          type="Submit"
          onClick={handleClick}
        >
          Search
        </button>
      </form>
      {loading && <p>Loading data...</p>}
      {isApiData && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperatue</h3>
            <p>{apiData.current.temp_c} C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{apiData.current.humidity} %</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{apiData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{apiData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}
