import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { FaChevronDown } from "react-icons/fa";

export default function Forecast(props) {
  const [activeIndex, setactiveIndex] = useState(null);

  const totalDaysInWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const dayInWeek = new Date().getDay();
  const forecastForDays = totalDaysInWeek
    .slice(dayInWeek, totalDaysInWeek.length)
    .concat(totalDaysInWeek.slice(0, dayInWeek));

  const handleDropdownIcon = (key) => {
    setactiveIndex(activeIndex === key ? null : key);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="font-bold text-2xl">7 Days Forecast</p>
      <Accordion className="flex flex-col gap-3" allowZeroExpanded>
        {props.data.list.slice(0, 7).map((item, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading onClick={() => handleDropdownIcon(index)}>
              <AccordionItemButton>
                <div className="flex justify-between bg-white h-14 px-5">
                  <div className="flex gap-2 items-center">
                    <img
                      src={`icons/${item.weather[0].icon}.png`}
                      alt={item.weather[0].description}
                      className="h-4/6"
                    />
                    <p className="text-lg font-semibold">
                      {forecastForDays[index]}
                    </p>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <p className="font-semibold">
                        {item.weather[0].description}
                      </p>
                      <p className="text-gray-500">
                        {Math.ceil(item.main.temp_min)} /{" "}
                        {Math.ceil(item.main.temp_max)}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <FaChevronDown
                        className={`transition ease-in-out  ${
                          activeIndex === index ? "transform rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="flex justify-between gap-4 mt-3">
                <div className="w-full text-white bg-[#748CF1] p-3 ">
                  <div className="flex justify-between">
                    <p className="font-semibold">Pressure:</p>
                    <p className="font-semibold">{item.main.pressure} hPa</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold">Clouds:</p>
                    <p className="font-semibold">{item.clouds.all}%</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold">Sea Level:</p>
                    <p className="font-semibold">{item.main.sea_level}m</p>
                  </div>
                </div>
                <div className="w-full text-white bg-[#748CF1] p-3">
                  <div className="flex justify-between">
                    <p className="font-semibold">Humidity:</p>
                    <p className="font-semibold">{item.main.humidity}%</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold">Wind Speed:</p>
                    <p className="font-semibold">{item.clouds.all}m/s</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-semibold">Feels Like:</p>
                    <p className="font-semibold">
                      {Math.ceil(item.main.feels_like)}°C
                    </p>
                  </div>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
