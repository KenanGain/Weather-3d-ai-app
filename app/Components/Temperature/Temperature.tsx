// "use client";
// import React, { useEffect, useState } from "react";
// import { useGlobalContext } from "@/app/Context/globalContext";
// import {
//   clearSky,
//   cloudy,
//   drizzleIcon,
//   navigation,
//   rain,
//   snow,
// } from "@/app/utils/Icons";
// import { kelvinToCelsius } from "@/app/utils/misc";
// import moment from "moment";

// function Temperature() {
//   const { forecast } = useGlobalContext();

//   const { main, timezone, name, weather } = forecast;

//   if (!forecast || !weather) {
//     return <div>Loading...</div>;
//   }

//   const temp = kelvinToCelsius(main?.temp);
//   const minTemp = kelvinToCelsius(main?.temp_min);
//   const maxTemp = kelvinToCelsius(main?.temp_max);

//   // State
//   const [localTime, setLocalTime] = useState<string>("");
//   const [currentDay, setCurrentDay] = useState<string>("");

//   const { main: weatherMain, description } = weather[0];

//   const getIcon = () => {
//     switch (weatherMain) {
//       case "Drizzle":
//         return drizzleIcon;
//       case "Rain":
//         return rain;
//       case "Snow":
//         return snow;
//       case "Clear":
//         return clearSky;
//       case "Clouds":
//         return cloudy;
//       default:
//         return clearSky;
//     }
//   };

//   // Live time update
//   useEffect(() => {
//     // upadte time every second
//     const interval = setInterval(() => {
//       const localMoment = moment().utcOffset(timezone / 60);
//       // custom format: 24 hour format
//       const formatedTime = localMoment.format("HH:mm:ss");
//       // day of the week
//       const day = localMoment.format("dddd");

//       setLocalTime(formatedTime);
//       setCurrentDay(day);
//     }, 1000);

//     // clear interval
//     return () => clearInterval(interval);
//   }, [timezone]);

//   return (
//     <div
//       className="pt-6 pb-5 px-4 border rounded-lg flex flex-col 
//         justify-between dark:bg-dark-grey shadow-sm dark:shadow-none"
//     >
//       <p className="flex justify-between items-center">
//         <span className="font-medium">{currentDay}</span>
//         <span className="font-medium">{localTime}</span>
//       </p>
//       <p className="pt-2 font-bold flex gap-1">
//         <span>{name}</span>
//         <span>{navigation}</span>
//       </p>
//       <p className="py-10 text-9xl font-bold self-center">{temp}°</p>

//       <div>
//         <div>
//           <span>{getIcon()}</span>
//           <p className="pt-2 capitalize text-lg font-medium">{description}</p>
//         </div>
//         <p className="flex items-center gap-2">
//           <span>Low: {minTemp}°</span>
//           <span>High: {maxTemp}°</span>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Temperature;
"use client";

import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/Context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";
import {
  clearSky,
  cloudy,
  drizzleIcon,
  rain,
  snow,
} from "@/app/utils/Icons";
import { kelvinToCelsius } from "@/app/utils/misc";
import moment from "moment";

function Temperature() {
  const { forecast } = useGlobalContext();

  // State for local time and current day
  const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");

  // Debugging to check the forecast object
  console.log('Forecast:', forecast);

  // Function to get weather icon
  const getIcon = () => {
    if (!forecast || !forecast.weather) {
      return clearSky; // Default icon if forecast is not available
    }
    const { main: weatherMain } = forecast.weather[0];
    switch (weatherMain) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      default:
        return clearSky;
    }
  };

  // Live time update
  useEffect(() => {
    // biome-ignore lint/complexity/useOptionalChain: <explanation>
    if (forecast && forecast.timezone) {
      const interval = setInterval(() => {
        const localMoment = moment().utcOffset(forecast.timezone / 60);
        const formattedTime = localMoment.format("HH:mm:ss");
        const day = localMoment.format("dddd");

        setLocalTime(formattedTime);
        setCurrentDay(day);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [forecast]);

  if (!forecast || !forecast.main || !forecast.weather || !localTime || !currentDay) {
    return (
      <div>
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      </div>
    );
  }

  const { main, timezone, name, weather } = forecast;
  const temp = kelvinToCelsius(main.temp);
  const minTemp = kelvinToCelsius(main.temp_min);
  const maxTemp = kelvinToCelsius(main.temp_max);
  const { description } = weather[0];

  return (
    <div className="p-4 pl-5 border rounded-lg flex flex-col justify-between dark:bg-black/50 dark:backdrop-blur-sm shadow-sm bg-slate-100 backdrop-blur-sm drop-shadow-2xl">
      <div className="flex justify-between items-start">
        <span className="text-2xl">{getIcon()}</span>
        <p className="text-sm">{description}</p>
        <div className="flex flex-col items-end">
          <p className="text-lg font-bold">{name}</p>
          <p className="text-sm">{currentDay}, {localTime}</p>
        </div>
      </div>
      <div className="flex justify-between items-end mt-4">
        <p className="text-3xl font-bold">{temp}°</p>
        <div className="flex flex-col items-end text-xl">
          <p>Low: {minTemp}°</p>
          <p>High: {maxTemp}°</p>
        </div>
      </div>
    </div>
  );
}

export default Temperature;
