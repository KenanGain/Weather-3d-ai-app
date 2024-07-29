"use client";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import ThemeDropdown from './ThemeDropdown/ThemeDropdown';
import { useTheme } from 'next-themes';
import SearchDialog from './SearchDialog/SearchDialog';
import { useGlobalContext } from '../Context/globalContext';

function Navbar() {
   const router = useRouter();
   const { theme } = useTheme();
   const { state } = useGlobalContext();

   console.log(state);
  return (
    <div className='w-full py-4 flex items-center justify-between '>
      
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit drop-shadow-2xl">
        <SearchDialog />
        <div className='btn-group flex items-center gap-2 drop-shadow-2xl'>
        <ThemeDropdown />
        </div>
      </div>
      <div className="right drop-shadow-2xl">
      {theme === 'light' ? (
          <Image 
            src='/MetaworldX-3.png' 
            alt='metaworldx' 
            width={200} 
            height={20}
            style={{ filter: 'brightness(0)' }}
          />
        ) : (
          <Image 
            src='/MetaworldX-3.png' 
            alt='metaworldx' 
            width={200} 
            height={20}
          />
        )}
      </div>
    </div>
  )
}

export default Navbar;