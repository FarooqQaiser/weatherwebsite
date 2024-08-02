import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";

export default function Search({ onSearchChange }) {
  const [search, setSearch] = useState(null);

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        geoApiOptions
      );
      const responseData = await response.json();

      if (responseData.data) {
        return {
          options: responseData.data.map((city) => ({
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          })),
        };
      } else {
        console.error("Invalid response structure: ", responseData);
      }
    } catch (error) {
      console.error(error);
      return {
        options: [],
      };
    }
  };

  return (
    <div>
      <AsyncPaginate
        placeholder="Search for city"
        value={search}
        onChange={handleOnChange}
        debounceTimeout={600}
        loadOptions={loadOptions}
      />
    </div>
  );
}
