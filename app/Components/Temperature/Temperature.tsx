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
import { Skeleton } from "@/components/ui/skeleton"

import {
  clearSky,
  cloudy,
  drizzleIcon,
  navigation,
  rain,
  snow,
} from "@/app/utils/Icons";
import { kelvinToCelsius } from "@/app/utils/misc";
import moment from "moment";

function Temperature() {
  const { forecast } = useGlobalContext();

  // Debugging to check the forecast object
  console.log('Forecast:', forecast);

  if (!forecast || !forecast.main || !forecast.weather) {
    return <div><Skeleton className="w-[100px] h-[20px] rounded-full" />
</div>;
  }

  const { main, timezone, name, weather } = forecast;

  const temp = kelvinToCelsius(main.temp);
  const minTemp = kelvinToCelsius(main.temp_min);
  const maxTemp = kelvinToCelsius(main.temp_max);

  // State
  const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");

  const { main: weatherMain, description } = weather[0];

  const getIcon = () => {
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
    const interval = setInterval(() => {
      const localMoment = moment().utcOffset(timezone / 60);
      const formattedTime = localMoment.format("HH:mm:ss");
      const day = localMoment.format("dddd");

      setLocalTime(formattedTime);
      setCurrentDay(day);
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  if (!localTime || !currentDay) {
    return <div className="p-4 pl-5 border rounded-lg flex flex-col justify-between dark:bg-dark-grey shadow-sm h-full dark:shadow-none gap-2 backdrop-blur-sm"><Skeleton className="w-full h-[20px] rounded-full" />
    <Skeleton className="w-full h-[20px] rounded-full" />
</div>;
  }

  return (
    // <div
    //   className="p-4 border rounded-lg flex flex-col 
    //     justify-between dark:bg-dark-grey shadow-sm dark:shadow-none"
    // >
    // <div className="pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8
    //    dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2">
    //   <p className="flex justify-between items-center">
    //     <span className="font-medium">{currentDay}</span>
    //     <span className="font-medium">{localTime}</span>
    //   </p>
    //   <p className="pt-2 font-bold flex gap-1 items-center">
    //     <span>{name}</span>
    //     <span>{navigation}</span>
    //   </p>
    //   <p className="py-10 text-9xl font-bold self-center">{temp}°</p>

    //   <div>
    //     <div className="flex items-center gap-2">
    //       <span>{getIcon()}</span>
    //       <p className="pt-2 capitalize text-lg font-medium">{description}</p>
    //     </div>
    //     <p className="flex items-center gap-2">
    //       <span>Low: {minTemp}°</span>
    //       <span>High: {maxTemp}°</span>
    //     </p>
    //   </div>
    // </div>
//     <div className="flex w-full flex-col">
//   <p>
//     <span>{currentDay}</span>
//     <span>{localTime}</span>
//   </p>
//   <p>
//     <span>{name}</span>
//     <span>{navigation}</span>
//   </p>
//   <p>{temp}°</p>

//   <div>
//     <div>
//       <span>{getIcon()}</span>
//       <p>{description}</p>
//     </div>
//     <p>
//       <span>Low: {minTemp}°</span>
//       <span>High: {maxTemp}°</span>
//     </p>
//   </div>
// </div>
<div className="p-4 pl-5 border rounded-lg flex flex-col justify-between dark:bg-black/50 dark:backdrop-blur-sm shadow-sm bg-slate-100 backdrop-blur-sm drop-shadow-2xl">
      <div className="flex justify-between items-start">
        <span className="text-2xl">{getIcon()}
        <p className="text-sm">{description}</p>
        </span>
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
