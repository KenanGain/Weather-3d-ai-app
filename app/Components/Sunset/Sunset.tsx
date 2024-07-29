"use client";
import { useGlobalContext } from "@/app/Context/globalContext";
import { sunset } from "@/app/utils/Icons";
import { unixToTime } from "@/app/utils/misc";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function Sunset() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.sys || !forecast?.sys?.sunset) {
    return ( <div>
    <Skeleton className="h-full w-full" />
    <Skeleton className="h-full w-full" />
    </div>
  )
  }

  const times = forecast?.sys?.sunset;
  const timezone = forecast?.timezone;

  const sunsetTime = unixToTime(times, timezone);
  const sunrise = unixToTime(forecast?.sys?.sunrise, timezone);

  return (
    <div className="pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-black/50 dark:backdrop-blur-sm shadow-sm bg-slate-100 backdrop-blur-sm drop-shadow-2xl">
      <div className="top">
        <h2 className="flex items-center gap-2 text-xl">{sunset}Sunset</h2>
        <p className="pt-4 text-xl">{sunsetTime}</p>
      </div>

      <p className="text-sm">Sunrise: {sunrise}</p>
    </div>
  );
}

export default Sunset;