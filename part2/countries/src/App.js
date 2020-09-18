import React, { useState, useEffect } from "react";
import axios from "axios";
import CountryDetails from "./CountryDetails";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const handleSearch = (e) => {
    if (!!selectedCountry) {
      setSelectedCountry(null);
    }
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);
  let filteredCountries = countries.filter((country) => {
    return country.name.toUpperCase().includes(searchTerm.toUpperCase());
  });
  const handleShow = (c) => {
    setSelectedCountry(c);
  };
  return (
    <div className="App">
      <span>find countries</span>
      <input
        type="text"
        value={searchTerm}
        name="search"
        onChange={handleSearch}
      />
      <br />
      {(() => {
        if (!!selectedCountry) {
          return <CountryDetails country={selectedCountry} />;
        } else if (filteredCountries.length === 0) {
          return <div> No results found </div>;
        } else if (filteredCountries.length > 10) {
          return <div>Too many matches, specify another filter</div>;
        } else if (filteredCountries.length === 1) {
          return <CountryDetails country={filteredCountries[0]} />;
        } else {
          return filteredCountries.map((country) => (
            <span key={country.name}>
              {country.name}{" "}
              <button onClick={() => handleShow(country)}>Show</button>
              <br />
            </span>
          ));
        }
      })()}
    </div>
  );
}

export default App;
