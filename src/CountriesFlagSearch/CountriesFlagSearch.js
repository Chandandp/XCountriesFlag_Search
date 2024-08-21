import { useEffect, useState } from "react";

const CountryCard = ({ name, flag, altText }) => {
  return (
    <div
      className="countryCard"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid grey",
        gap: "4px",
        borderRadius: "8px",
        height: "200px",
        width: "200px",
        margin: "10px",
        padding: "10px",
        textAlign: "center",
      }}
    >
      <img
        src={flag}
        alt={altText}
        style={{
          height: "100px",
          width: "100px",
        }}
      />
      <h2>{name}</h2>
    </div>
  );
};

const API_URL = "https://restcountries.com/v3.1/all";

function CountriesFlagSearch() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          margin: "20px",
          padding: "10px",
          width: "300px",
          borderRadius: "4px",
          border: "1px solid grey",
        }}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {filteredCountries.map((country) => (
          <CountryCard
            key={country.cca3}
            name={country.name.common}
            flag={country.flags.png}
            altText={country.cca3}
          />
        ))}
      </div>
    </div>
  );
}

export default CountriesFlagSearch;
