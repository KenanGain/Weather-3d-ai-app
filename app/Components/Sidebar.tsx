"use client";
import {
  thermo, droplets, gauge, people, calender,
  thermometer, clearSky, wind, sun, eye, sunset
} from "@/app/utils/Icons";
import React, { useState } from "react";
import Temperature from "./Temperature/Temperature";
import { useGlobalContext } from "../Context/globalContext";
import AirPollution from "./AirPollution/AirPollution";
import Sunset from "./Sunset/Sunset";
import Wind from "./Wind/Wind";
import UvIndex from "./UvIndex/UvIndex";
import FeelsLike from "./FeelsLike/FeelsLike";
import FiveDayForecast from "./FiveDayForecast/FiveDayForecast";
import Humidity from "./Humidity/Humidity";
import Visibility from "./Visibility/Visibility";
import Population from "./Population/Population";
import Pressure from "./Pressure/Pressure";

const Sidebar = () => {
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const handleMouseEnter = (component: string) => {
    if (!activeComponent) {
      setHoveredComponent(component);
    }
  };

  const handleMouseLeave = () => {
    setHoveredComponent(null);
  };

  const handleClick = (component: string) => {
    setActiveComponent((prevComponent) => (prevComponent === component ? null : component));
  };

  return (
    <div className="flex flex-col items-center xl:justify-center gap-y-4 fixed h-max bottom-0 mt-auto xl:left-[2%] z-50 top-0 w-screen xl:w-16 xl:max-w-md xl:h-screen">
      <div className="flex w-full xl:flex-col items-center justify-between xl:justify-center gap-y-10 xl:px-0 md:px-40 xl:px=0 h-[80px] xl:h-max py-8
        px-4 border dark:bg-black/50 dark:backdrop-blur-sm shadow-sm text-3xl xl:rounded-full bg-slate-100 backdrop-blur-sm drop-shadow-2xl">
        
        {/* Weather */}
        <div
          onMouseEnter={() => handleMouseEnter("Weather")}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick("Weather")}
          className="sidebar-icon relative group"
        >
          {clearSky}
          {(hoveredComponent === "Weather" || activeComponent === "Weather") && (
            <div className="pl-3 group-hover:block absolute top-full xl:left-full xl:top-0 xl:ml-2 mt-2 xl:mt-0 w-64">
              <Temperature />
            </div>
          )}
        </div>

        {/* AirPollution */}
        <div
          onMouseEnter={() => handleMouseEnter("AirPollution")}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick("AirPollution")}
          className="sidebar-icon relative group"
        >
          {thermo}
          {(hoveredComponent === "AirPollution" || activeComponent === "AirPollution") && (
            <div className="pl-3 group-hover:block absolute top-full xl:left-full xl:top-0 xl:ml-2 mt-2 xl:mt-0 w-64">
              <AirPollution />
            </div>
          )}
        </div>

        {/* Sunset */}
        <div
          onMouseEnter={() => handleMouseEnter("Sunset")}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick("Sunset")}
          className="sidebar-icon relative group"
        >
          {sunset}
          {(hoveredComponent === "Sunset" || activeComponent === "Sunset") && (
            <div className="pl-3 group-hover:block absolute top-full xl:left-full xl:top-0 xl:ml-2 mt-2 xl:mt-0 w-64">
              <Sunset />
            </div>
          )}
        </div>

        {/* Wind */}
        <div
          onMouseEnter={() => handleMouseEnter("Wind")}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick("Wind")}
          className="sidebar-icon relative group"
        >
          {wind}
          {(hoveredComponent === "Wind" || activeComponent === "Wind") && (
            <div className="pl-3 group-hover:block absolute top-full xl:left-full xl:top-0 xl:ml-2 mt-2 xl:mt-0 w-64">
              <Wind />
            </div>
          )}
        </div>

        {/* FeelsLike */}
        <div
          onMouseEnter={() => handleMouseEnter("FeelsLike")}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick("FeelsLike")}
          className="sidebar-icon relative group"
        >
          {thermometer}
          {(hoveredComponent === "FeelsLike" || activeComponent === "FeelsLike") && (
            <div className="pl-3 group-hover:block absolute top-full xl:left-full xl:top-0 xl:ml-2 mt-2 xl:mt-0 w-64">
              <FeelsLike />
            </div>
          )}
        </div>

        {/* FiveDayForecast */}
        <div
          onMouseEnter={() => handleMouseEnter("FiveDayForecast")}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick("FiveDayForecast")}
          className="sidebar-icon relative group"
        >
          {calender}
          {(hoveredComponent === "FiveDayForecast" || activeComponent === "FiveDayForecast") && (
            <div className="pl-3 group-hover:block absolute top-full xl:left-full xl:top-0 xl:ml-2 mt-2 xl:mt-0 w-64">
              <FiveDayForecast />
            </div>
          )}
        </div>

        {/* Humidity */}
        <div
          onMouseEnter={() => handleMouseEnter("Humidity")}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick("Humidity")}
          className="sidebar-icon relative group"
        >
          {droplets}
          {(hoveredComponent === "Humidity" || activeComponent === "Humidity") && (
            <div className="pl-3 group-hover:block absolute top-full xl:left-full xl:top-0 xl:ml-2 mt-2 xl:mt-0 w-64">
              <Humidity />
            </div>
          )}
        </div>

        {/* Uv Index */}
        <div
          onMouseEnter={() => handleMouseEnter("Uv Index")}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick("Uv Index")}
          className="sidebar-icon relative group"
        >
          {sun}
          {(hoveredComponent === "Uv Index" || activeComponent === "Uv Index") && (
            <div className="pl-3 group-hover:block absolute top-full xl:left-full xl:top-0 xl:ml-2 mt-2 xl:mt-0 w-64">
              <UvIndex />
            </div>
          )}
        </div>

        {/* Visibility */}
        <div
          onMouseEnter={() => handleMouseEnter("Visibility")}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick("Visibility")}
          className="sidebar-icon relative group"
        >
          {eye}
          {(hoveredComponent === "Visibility" || activeComponent === "Visibility") && (
            <div className="pl-3 group-hover:block absolute top-full xl:left-full xl:top-0 xl:ml-2 mt-2 xl:mt-0 w-64">
              <Visibility />
            </div>
          )}
        </div>

        {/* Population */}
        <div
          onMouseEnter={() => handleMouseEnter("Population")}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick("Population")}
          className="sidebar-icon relative group"
        >
          {people}
          {(hoveredComponent === "Population" || activeComponent === "Population") && (
            <div className="pl-3 group-hover:block absolute top-full xl:left-full xl:top-0 xl:ml-2 mt-2 xl:mt-0 w-64">
              <Population />
            </div>
          )}
        </div>

        {/* Pressure */}
        <div
          onMouseEnter={() => handleMouseEnter("Pressure")}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick("Pressure")}
          className="sidebar-icon relative group"
        >
          {gauge}
          {(hoveredComponent === "Pressure" || activeComponent === "Pressure") && (
            <div className="pl-3 group-hover:block absolute top-full xl:left-full xl:top-0 xl:ml-2 mt-2 xl:mt-0 w-64">
              <Pressure />
            </div>
          )}
        </div>

        
      </div>
    </div>
  );
};

export default Sidebar;
