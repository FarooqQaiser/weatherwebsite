import "./App.css";
import React, { useEffect, useState } from "react";
import Search from "./components/search/Search";
import CurrentWeather from "./components/current weather/CurrentWeather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import Forecast from "./components/forecast/Forecast";

function App() {
  const [defaultcurrentWeather, setdefaultCurrentWeather] = useState(null);
  const [defaultforecast, setdefaultForecast] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const defaultLat = 33.6007;
  const defaultLon = 73.0679;

  useEffect(() => {
    const defaultCurrentWeatherApi = fetch(
      `${WEATHER_API_URL}/forecast?lat=${defaultLat}&lon=${defaultLon}&appid=${WEATHER_API_KEY}&units=metric`
    ).then((response) => response.json());

    const defaultForecastApi = fetch(
      `${WEATHER_API_URL}/forecast?lat=${defaultLat}&lon=${defaultLon}&appid=${WEATHER_API_KEY}&units=metric`
    ).then((response) => response.json());

    Promise.all([defaultCurrentWeatherApi, defaultForecastApi])
      .then((response) => {
        setdefaultCurrentWeather(response[0]);
        setdefaultForecast(response[1]);
      })
      .catch((error) => console.error(error));
  }, []);

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
  };
  console.log(currentWeather);

  return (
    <div className="flex flex-col items-center w-full h-full gap-7 px-10 py-5 bg-[#D4D4D4]">
      <div className="w-full">
        <Search onSearchChange={handleSearchOnChange} />
      </div>
      <div className="flex w-full">
        <div className="flex flex-col w-1/2 justify-center items-center bg-[#FEFEFE]">
          <div className="w-5/6">
            {currentWeather ? (
              <>
                <CurrentWeather
                  showWeatherDetails={false}
                  date={currentWeather.list[0].dt_txt}
                  city={currentWeather.city.name}
                  weather={currentWeather.list[0].weather[0].description}
                  icon={currentWeather.list[0].weather[0].icon}
                  temperature={currentWeather.list[0].main.temp}
                  feelsLike={currentWeather.list[0].main.feels_like}
                  wind={currentWeather.list[0].wind.speed}
                  humidity={currentWeather.list[0].main.humidity}
                  pressure={currentWeather.list[0].main.pressure}
                />
              </>
            ) : (
              <>
                {defaultcurrentWeather ? (
                  <>
                    <CurrentWeather
                      showWeatherDetails={false}
                      date={defaultcurrentWeather.list[0].dt_txt}
                      city={defaultcurrentWeather.city.name}
                      weather={
                        defaultcurrentWeather.list[0].weather[0].description
                      }
                      icon={defaultcurrentWeather.list[0].weather[0].icon}
                      temperature={defaultcurrentWeather.list[0].main.temp}
                      feelsLike={defaultcurrentWeather.list[0].main.feels_like}
                      wind={defaultcurrentWeather.list[0].wind.speed}
                      humidity={defaultcurrentWeather.list[0].main.humidity}
                      pressure={defaultcurrentWeather.list[0].main.pressure}
                    />
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        </div>
        <div className="w-full bg-[#EEEEEE] p-10">
          {currentWeather ? (
            <>
              <CurrentWeather
                showWeatherDetails={true}
                groundLevel={currentWeather.list[0].main.grnd_level}
                seaLevel={currentWeather.list[0].main.sea_level}
                clouds={currentWeather.list[0].clouds.all}
                maxTemp={currentWeather.list[0].main.temp_max}
                minTemp={currentWeather.list[0].main.temp_min}
                weather={currentWeather.list[0].weather[0].description}
                temperature={currentWeather.list[0].main.temp}
                feelsLike={currentWeather.list[0].main.feels_like}
                wind={currentWeather.list[0].wind.speed}
                humidity={currentWeather.list[0].main.humidity}
                pressure={currentWeather.list[0].main.pressure}
              />
            </>
          ) : (
            <>
              {defaultcurrentWeather ? (
                <>
                  <CurrentWeather
                    showWeatherDetails={true}
                    groundLevel={defaultcurrentWeather.list[0].main.grnd_level}
                    seaLevel={defaultcurrentWeather.list[0].main.sea_level}
                    clouds={defaultcurrentWeather.list[0].clouds.all}
                    maxTemp={defaultcurrentWeather.list[0].main.temp_max}
                    minTemp={defaultcurrentWeather.list[0].main.temp_min}
                    weather={
                      defaultcurrentWeather.list[0].weather[0].description
                    }
                    temperature={defaultcurrentWeather.list[0].main.temp}
                    feelsLike={defaultcurrentWeather.list[0].main.feels_like}
                    wind={defaultcurrentWeather.list[0].wind.speed}
                    humidity={defaultcurrentWeather.list[0].main.humidity}
                    pressure={defaultcurrentWeather.list[0].main.pressure}
                  />
                </>
              ) : (
                <></>
              )}
            </>
          )}
        </div>
      </div>
      {/* <div className="">
        <button className="transition ease-in-out delay-100 border border-[#748CF1] bg-[#748CF1] text-white text-lg font-semibold p-4 hover:text-[#748CF1] hover:border hover:border-[#748CF1] hover:bg-white ">
          View 7 Days Forecast
        </button>
      </div> */}
      <div className="w-full bg-[#EEEEEE] p-10">
        {forecast ? (
          <>
            <Forecast data={forecast} />
          </>
        ) : (
          <>
            {defaultforecast ? (
              <>
                <Forecast data={defaultforecast} />
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
