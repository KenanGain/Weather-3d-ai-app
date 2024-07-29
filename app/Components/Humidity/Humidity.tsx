"use client";
import { useGlobalContext } from "@/app/Context/globalContext";
import { droplets } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function Humidity() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.main || !forecast?.main?.humidity) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { humidity } = forecast?.main;

  const getHumidityText = (humidity: number) => {
    if (humidity < 30) return "Dry: May cause skin irritation";
    if (humidity >= 30 && humidity < 50)
      return "Comfortable: Ideal for health and comfort";
    if (humidity >= 50 && humidity < 70)
      return "Moderate: Sticky, may increase allergens";
    if (humidity >= 70) return "High: Uncomfortable, mold growth risk";
    return "Unavailable: Humidity data not available";
  };

  return (
    <div className="pt-5 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-4 dark:bg-black/50 dark:backdrop-blur-sm shadow-sm dark:shadow-none bg-slate-100 backdrop-blur-sm drop-shadow-2xl">
        <p className="flex items-center gap-2 text-md font-medium">
          {droplets} Humidity
        </p>
        <p className="pt-4 text-2xl">{humidity}%</p>
      <p className="text-sm">{getHumidityText(humidity)}.</p>
    </div>
  );
}

export default Humidity;