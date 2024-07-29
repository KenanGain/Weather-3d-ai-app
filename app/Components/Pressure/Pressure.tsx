"use client";
import { useGlobalContext } from "@/app/Context/globalContext";
import { gauge } from "@/app/utils/Icons";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function Pressure() {
  const { forecast } = useGlobalContext();

  if (!forecast || !forecast?.main || !forecast?.main?.pressure) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { pressure } = forecast?.main;

  const getPressureDescription = (pressure: number) => {
    if (pressure < 1000) return "Very low pressure";

    if (pressure >= 1000 && pressure < 1015)
      return "Low pressure. Expect weather changes.";

    if (pressure >= 1015 && pressure < 1025)
      return "Normal pressure. Expect weather changes.";

    if (pressure >= 1025 && pressure < 1040)
      return "High pressure. Expect weather changes.";

    if (pressure >= 1040) return "Very high pressure. Expect weather changes.";

    return "Unavailable pressure data";
  };

  return (
    <div className="pt-5 pb-3 px-4 h-auto border rounded-lg flex flex-col gap-4 dark:bg-black/50 dark:backdrop-blur-sm shadow-sm dark:shadow-none bg-slate-100 backdrop-blur-sm drop-shadow-2xl">
      <div className="top">
        <p className="flex items-center gap-1 text-md font-medium">
          {gauge} Pressure
        </p>
        <p className="pt-1 text-xl">{pressure} hPa</p>
      </div>

      <p className="text-sm">{getPressureDescription(pressure)}.</p>
    </div>
  );
}

export default Pressure;