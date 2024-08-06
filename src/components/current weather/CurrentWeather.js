import React from "react";

export default function CurrentWeather(props) {
  const temp = Math.ceil(props.temperature);
  const feelsLike = Math.ceil(props.feelsLike);
  let dateAndTime = null;
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date().getDay();
  const day = weekday[d];

  if (!props.showWeatherDetails) {
    dateAndTime = props.date.split(" ");
  }

  return (
    <>
      {props.showWeatherDetails ? (
        <>
          <p className="border-b-2 border-[#A0A0A0] text-xl font-semibold">
            Details
          </p>
          <div className="grid grid-cols-[1fr_1fr_1fr] gap-4 w-full my-5">
            <div className="flex flex-col gap-3 text-white bg-[#748CF1] p-4">
              <p className="">Feels like</p>
              <p className="font-bold">{feelsLike} °C</p>
            </div>
            <div className="flex flex-col gap-3 text-white bg-[#748CF1] p-4">
              <p className="">Wind</p>
              <p className="font-bold">{props.wind} m/s</p>
            </div>
            <div className="flex flex-col gap-3 text-white bg-[#748CF1] p-4">
              <p className="">Humidity</p>
              <p className="font-bold">{props.humidity}%</p>
            </div>
            <div className="flex flex-col gap-3 text-white bg-[#748CF1] p-4">
              <p className="">Pressure</p>
              <p className="font-bold">{props.pressure} hPa</p>
            </div>
            <div className="flex flex-col gap-3 text-white bg-[#748CF1] p-4">
              <p className="">Maximum Temperature</p>
              <p className="font-bold">{Math.ceil(props.maxTemp)} °C</p>
            </div>
            <div className="flex flex-col gap-3 text-white bg-[#748CF1] p-4">
              <p className="">Minimum Temperature</p>
              <p className="font-bold">{Math.ceil(props.minTemp)} °C</p>
            </div>
            <div className="flex flex-col gap-3 text-white bg-[#748CF1] p-4">
              <p className="">Clouds</p>
              <p className="font-bold">{props.clouds} %</p>
            </div>
            <div className="flex flex-col gap-3 text-white bg-[#748CF1] p-4">
              <p className="">Ground Level</p>
              <p className="font-bold">{props.groundLevel} ft</p>
            </div>
            <div className="flex flex-col gap-3 text-white bg-[#748CF1] p-4">
              <p className="">Sea Level</p>
              <p className="font-bold">{props.seaLevel} ft</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4 items-center border-b border-b-gray-400">
              <div className="flex w-full justify-center">
                <img src={`icons/${props.icon}.png`} alt="sunny" />
              </div>
              <div className="flex justify-center w-full">
                <p className="text-7xl">
                  {temp}
                  <span className="align-top text-4xl">°C</span>
                </p>
              </div>
              <div className="flex justify-center w-full">
                <p>{props.weather}</p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col gap-4 items-center justify-center w-full">
                <p className="flex flex-col items-center text-xs">
                  {dateAndTime[0]}{" "}
                  <span className="text-sm font-semibold">
                    {day}, {dateAndTime[1]}
                  </span>
                </p>
                <p className="font-bold text-2xl">{props.city}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
