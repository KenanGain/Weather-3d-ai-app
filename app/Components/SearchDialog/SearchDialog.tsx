// 'use client';
// import { commandIcon, searchIcon } from '@/app/utils/Icons';
// import { Button } from '@/components/ui/button';
// import { Command, CommandInput } from '@/components/ui/command';
// import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
// import { Search, SearchIcon } from 'lucide-react';

// import React, { ChangeEvent, useState } from 'react'
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
// import usePlacesAutocomplete, {
//     getGeocode,
//     getLatLng
// } from "use-places-autocomplete"

// function SearchDialog() {
//     const [inputValue, setInputValue] = useState<string>('');
  
//     const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
//       const value = event.target.value;
//       setInputValue(value);
//       onSearch(value); // Call onSearch as the input value changes
//     };
  
//     const onSearch = (searchTerm: string) => {
//       // API call or search logic here
//       console.log('search', searchTerm);
//     };

//     // const PlacesAutocomplete = ({ setSelected })
  
//     return (
//       <div className='search-btn'>
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button
//             variant="outline"
//             className="border inline-flex items-center justify-center text-sm font-medium hover:dark:bg-[#131313] hover:bg-slate-100  ease-in-out duration-200 rounded-xl"
//           >
//             <p className="text-sm text-muted-foreground">Search Here...</p>
//             <div className="command py-[2px] pl-[5px] pr-[7px] rounded-sm ml-[10rem] flex items-center gap-2">
//               {searchIcon}
//             </div>
//             </Button>
//           </DialogTrigger>
//           <DialogContent className='p-0'>
//             <Command className='rounded-lg border shadow-md'>
//                 <div className='flex items-center border-b px-3'>
//               <input
//                 id="pacViewPlace"
//                 value={inputValue}
//                 onChange={handleInput}
//                 placeholder="Type a command or search..."
//                 className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
//                 aria-label="Search input"
//               />
//               </div>
//               <ul className="px-3 pb-2">
//                 <li>
//                   <p className='p-2 text-sm text-muted-foreground'>
//                     Suggestions
//                   </p>
//                 </li>
//               </ul>
//             </Command>
//           </DialogContent>
//         </Dialog>
//       </div>
//     );
//   }
  
//   export default SearchDialog;
"use client";
import {
  useGlobalContext,
  useGlobalContextUpdate,
} from "@/app/Context/globalContext";
import { commandIcon, searchIcon } from "@/app/utils/Icons";
import { Button } from "@/components/ui/button";
import { Command, CommandInput } from "@/components/ui/command";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";

function SearchDialog() {
  const { geoCodedList, inputValue, handleInput } = useGlobalContext();
  const { setActiveCityCoords } = useGlobalContextUpdate();

  const [hoveredIndex, setHoveredIndex] = React.useState<number>(0);

  const getClickedCoords = (lat: number, lon: number) => {
    setActiveCityCoords([lat, lon]);
  };
  return (
    <div className="search-btn">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border rounded-full inline-flex items-center justify-center text-sm font-medium dark:bg-black/50 dark:backdrop-blur-sm shadow-sm hover:dark:bg-[#131313] hover:bg-slate-100  ease-in-out duration-200 bg-slate-100 backdrop-blur-sm drop-shadow-2xl"
          >
            <p className="text-sm text-muted-foreground">Search Here...</p>
            <div className="command dark:backdrop-blur-sm shadow-sm py-[5px] pl-[5px] pr-[7px] rounded-full ml-[10rem] flex items-center gap-2">
              {searchIcon}
            </div>
          </Button>
        </DialogTrigger>

        <DialogContent className="p-0 shadow-sm">
          <Command className="rounded-lg border shadow-md">
          <div className='flex items-center border-b px-3 dark:bg-black/50 dark:backdrop-blur-sm shadow-sm'>
            <input
              value={inputValue}
              onChangeCapture={handleInput}
              placeholder="Type a command or search..."
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
            </div>
            <ul className="px-3 pb-2">
              <p className="p-2 text-sm text-muted-foreground">Suggestions</p>

              {geoCodedList?.length === 0 ||
                (!geoCodedList && <p>No Results</p>)}

              {geoCodedList &&
                geoCodedList.map(
                  (
                    item: {
                      name: string;
                      country: string;
                      state: string;
                      lat: number;
                      lon: number;
                    },
                    index: number
                  ) => {
                    const { country, state, name } = item;
                    return (
                      <li
                        key={index}
                        onMouseEnter={() => setHoveredIndex(index)}
                        className={`py-3 px-2 text-sm  rounded-sm cursor-default
                        ${hoveredIndex === index ? "bg-accent" : ""}
                      `}
                        onClick={() => {
                          getClickedCoords(item.lat, item.lon);
                        }}
                      >
                        <p className=" text">
                          {name}, {state && state + ","} {country}
                        </p>
                      </li>
                    );
                  }
                )}
            </ul>
          </Command>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SearchDialog;