"use client";
import { useGlobalContext } from "@/app/Context/globalContext";
import { calender } from "@/app/utils/Icons";
import { kelvinToCelsius, unixToDay } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function FiveDayForecast() {
  const { fiveDayForecast } = useGlobalContext();

  const { city, list } = fiveDayForecast;

  if (!fiveDayForecast || !city || !list) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const processData = (
    dailyData: {
      main: { temp_min: number; temp_max: number };
      dt: number;
    }[]
  ) => {
    let minTemp = Number.MAX_VALUE;
    let maxTemp = Number.MIN_VALUE;

    dailyData.forEach(
      (day: { main: { temp_min: number; temp_max: number }; dt: number }) => {
        if (day.main.temp_min < minTemp) {
          minTemp = day.main.temp_min;
        }
        if (day.main.temp_max > maxTemp) {
          maxTemp = day.main.temp_max;
        }
      }
    );

    return {
      day: unixToDay(dailyData[0].dt),
      minTemp: kelvinToCelsius(minTemp),
      maxTemp: kelvinToCelsius(maxTemp),
    };
  };

  const dailyForecasts = [];

  for (let i = 0; i < 40; i += 8) {
    const dailyData = list.slice(i, i + 5);
    dailyForecasts.push(processData(dailyData));
  }

  return (
    <div
    className="pt-6 pb-5 px-4 flex-1 border rounded-lg flex flex-col
      justify-between dark:bg-black/50 dark:backdrop-blur-sm shadow-sm dark:shadow-none bg-slate-100 backdrop-blur-sm drop-shadow-2xl"
  >
    <div>
      <p className="flex items-center gap-2 text-sm font-medium">
        {calender} 5-Day Forecast for {city.name}
      </p>
  
      <div className="forecast-list pt-3 overflow-x-auto whitespace-nowrap flex">
        {dailyForecasts.map((day, i) => {
          return (
            <div
              key={i}
              className="daily-forecast py-4 px-2 min-w-[200px] flex-shrink-0 flex flex-col justify-evenly border-b-2"
            >
              <p className="text-xl min-w-[3.5rem]">{day.day}</p>
              <p className="text-sm flex justify-between">
                <span>(low)</span>
                <span>(high)</span>
              </p>
  
              <div className="flex-1 flex items-center justify-between gap-4">
                <p className="font-bold">{day.minTemp}°C</p>
                <div className="temperature flex-1 w-full h-2 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                <p className="font-bold">{day.maxTemp}°C</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
  
  );
}

export default FiveDayForecast;