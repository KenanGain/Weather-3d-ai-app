"use client";
import { useGlobalContext } from "@/app/Context/globalContext";
import { wind } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import React from "react";

function Wind() {
  const { forecast } = useGlobalContext();

  const windSpeed = forecast?.wind?.speed;
  const windDir = forecast?.wind?.deg;

  if (!windSpeed || !windDir) {
    return <Skeleton className="h-full w-full" />;
  }

  return (
    <div
      className="pt-6 pb-5 px-4 h-auto border rounded-lg flex 
    flex-col gap-3 dark:bg-black/50 dark:backdrop-blur-sm  shadow-sm dark:shadow-none bg-slate-100 backdrop-blur-sm drop-shadow-2xl"
    >
        <div className="flex items-center gap-2  ">
        {wind}
      <p className="text-md font-medium">Wind speed</p>
      </div>
      <div className="compass relative flex items-center justify-center">
        <div className="image relative">
          <Image
            src="/compass_body.svg"
            alt="compass"
            width={110}
            height={110}
          />
          <Image
            src="/compass_arrow.svg"
            alt="compass"
            className="absolute top-0 left-[50%] transition-all duration-500 ease-in-out dark:invert"
            style={{
              transform: `rotate(${windDir}deg) translateX(-50%)`,
              height: "100%",
            }}
            width={11}
            height={11}
          />
        </div>
        <p
          className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-xs
            dark:text-white font-medium"
        >
          {Math.round(windSpeed)} m/s
        </p>
      </div>
    </div>
  );
}

export default Wind;