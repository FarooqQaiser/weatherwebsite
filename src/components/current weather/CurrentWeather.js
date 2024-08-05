import React from "react";

export default function CurrentWeather(props) {
  const temp = Math.ceil(props.temperature);
  const feelsLike = Math.ceil(props.feelsLike);

  return (
    <div className="text-white bg-[#333333] px-5 rounded-lg shadow-gray-400 shadow-xl">
      <div className="flex items-center gap-28">
        <div className=" w-full">
          <p className="font-bold text-lg">{props.city}</p>
          <p>{props.weather}</p>
        </div>
        <div className="flex w-full justify-center">
          <img src={`icons/${props.icon}.png`} alt="sunny" />
        </div>
      </div>
      <div className="flex items-center gap-28">
        <div className="w-full">
          <p className="text-7xl font-bold">{temp}°C</p>
        </div>
        <div className="flex flex-col justify-end w-full my-5">
          <p className="border-b-2 border-gray-300 text-gray-300">Details</p>
          <div>
            <div className="grid grid-cols-[3fr_1fr]">
              <p className="">Feels like</p>
              <p className="font-bold">{feelsLike}°C</p>
            </div>
            <div className="grid grid-cols-[3fr_1fr]">
              <p className="">Wind</p>
              <p className="font-bold">{props.wind} m/s</p>
            </div>
            <div className="grid grid-cols-[3fr_1fr]">
              <p className="">Humidity</p>
              <p className="font-bold">{props.humidity}%</p>
            </div>
            <div className="grid grid-cols-[3fr_1fr]">
              <p className="">Pressure</p>
              <p className="font-bold">{props.pressure} hPa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
