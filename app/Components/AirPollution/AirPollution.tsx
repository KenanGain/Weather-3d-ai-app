"use client";
import { useGlobalContext } from "@/app/Context/globalContext";
import { thermo, wind } from "@/app/utils/Icons";
import { airQulaityIndexText } from "@/app/utils/misc";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function AirPollution() {
  const { airQuality } = useGlobalContext();

  // check if airQuality is available, check if necessary properties are available
  if (
    !airQuality ||
    !airQuality.list ||
    !airQuality.list[0] ||
    !airQuality.list[0].main
  ) {
    return (
        <div className="p-4 pl-5 border rounded-lg flex flex-col justify-between drop-shadow-2xl dark:bg-dark-grey shadow-sm h-full dark:shadow-none gap-2 backdrop-blur-sm"><Skeleton className="w-full h-[20px] rounded-full bg-slate-100 backdrop-blur-sm" />
        <Skeleton className="w-full h-[20px] rounded-full " />
    </div>
    );
  }

  const airQualityIndex = airQuality.list[0].main.aqi * 10;

  const filteredIndex = airQulaityIndexText.find((item) => {
    return item.rating === airQualityIndex;
  });

  return (
    <div
      className="air-pollution pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 drop-shadow-2xl dark:bg-black/50 dark:backdrop-blur-sm shadow-sm col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2 bg-slate-100 backdrop-blur-sm"
    >
      <h2 className="flex items-center gap-2 text-xl">
        {thermo}Air Pollution
      </h2>
      <Progress value={airQualityIndex} max={100} className="progress" />
      <p className="text-sm">Air quality is {filteredIndex?.description}. </p>
    </div>
  );
}

export default AirPollution;