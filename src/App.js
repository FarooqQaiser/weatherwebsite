import React, { useState } from "react";
import Search from "./components/search/Search";
import CurrentWeather from "./components/current weather/CurrentWeather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import Forecast from "./components/forecast/Forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleSearchOnChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherApi = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    ).then((response) => response.json());
    const forecastApi = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    ).then((response) => response.json());

    Promise.all([currentWeatherApi, forecastApi])
      .then(async (response) => {
        setCurrentWeather(await response[0]);
        setForecast(await response[1]);
      })
      .catch((error) => console.error(error));
    console.log(currentWeather);
  };

  return (
    <div className="flex flex-col gap-4 w-full items-center p-4 bg-[#D4D4D4]">
      <div className="w-5/6">
        <Search onSearchChange={handleSearchOnChange} />
      </div>
      <div className="">
        {currentWeather ? (
          <>
            <CurrentWeather
              // date={currentWeather.list[0].dt_txt}
              city={currentWeather.city.name}
              weather={currentWeather.list[0].weather[0].main}
              icon={currentWeather.list[0].weather[0].icon}
              temperature={currentWeather.list[0].main.temp}
              feelsLike={currentWeather.list[0].main.feels_like}
              wind={currentWeather.list[0].wind.speed}
              humidity={currentWeather.list[0].main.humidity}
              pressure={currentWeather.list[0].main.pressure}
            />
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="w-5/6">
        {forecast ? (
          <>
            <Forecast data={forecast} />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default App;
