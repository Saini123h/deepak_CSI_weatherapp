import React, { useState } from "react";
import Displayweather from "./Displayweather";
import "./weather.css";
// usestae ek hook h jo dynamic change ke liye use hota h
function Weather() {
  const [weather, setWeather] = useState([]);
  const [form, setForm] = useState({
    city: "",
    country: "",
  });
  async function weatherData(e) {
    e.preventDefault();
    if (form.city === "") {
      alert("Add values");
    } else {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&appid=9f08cd5b8f6527665ed8bdb222901e16`
      )
        .then((res) => res.json())
        .then((data) => data);

      setWeather({ data: data });
    }
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "city") {
      setForm({ ...form, city: value });
    }
    if (name === "country") {
      setForm({ ...form, country: value });
    }
  };
  return (
    <div className="weather">
      <span className="title">Weather App</span>
      <br />
      <form>
        <input
          type="text"
          placeholder="city"
          name="city"
          onChange={(e) => handleChange(e)}
        />
        &nbsp; &nbsp; &nbsp;&nbsp;
        <input
          type="text"
          placeholder="Country"
          name="country"
          onChange={(e) => handleChange(e)}
        />
        <button className="getweather" onClick={(e) => weatherData(e)}>
          Submit
        </button>
      </form>

      {/* {console.log(weather)} */}
      {weather.data !== undefined ? (
        <div>
          <Displayweather data={weather.data} />
        </div>
      ) : null}
    </div>
  );
}

export default Weather;