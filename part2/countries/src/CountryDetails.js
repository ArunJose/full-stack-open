import React, { useEffect, useState } from "react";
import axios from "axios";
const apiKey = process.env.REACT_APP_API_KEY;
const CountryDetails = ({ country }) => {
  const [cityTemp, setCityTemp] = useState(undefined);
  const [weatherImg, setWeatherImg] = useState(undefined);
  const [wind, setWind] = useState(undefined);
  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${apiKey}&query=${country.capital}`
      )
      .then((response) => {
        setCityTemp(response.data.current.temperature);
        setWind(
          `${response.data.current.wind_speed} mph direction ${response.data.current.wind_dir}`
        );
        setWeatherImg(response.data.current.weather_icons[0]);
      });
  }, []);
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="flag" height="100px" />
      <h2>Weather in {country.capital}</h2>
      <p>Temperature: {cityTemp} Celcius</p>
      <img src={weatherImg} alt="weather image" />
      <p>Wind: {wind}</p>
    </div>
  );
};

export default CountryDetails;
