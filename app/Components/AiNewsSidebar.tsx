
"use client";
import { newspaper, aiIcon, bookIcon } from "@/app/utils/Icons";
import React, { useState } from "react";
import News from "./News/News";
import AIContent from "./AIContent/AIContent"; // Component for AI content
import Wiki from "./Wiki/Wiki"; // Component for Wiki content

const AiNewsSidebar = () => {
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isWikiOpen, setIsWikiOpen] = useState(false); // State for Wiki

  const toggleNews = () => {
    setIsNewsOpen(!isNewsOpen);
    if (isAIOpen) setIsAIOpen(false);
    if (isWikiOpen) setIsWikiOpen(false);
  };

  const toggleAI = () => {
    setIsAIOpen(!isAIOpen);
    if (isNewsOpen) setIsNewsOpen(false);
    if (isWikiOpen) setIsWikiOpen(false);
  };

  const toggleWiki = () => {
    setIsWikiOpen(!isWikiOpen);
    if (isNewsOpen) setIsNewsOpen(false);
    if (isAIOpen) setIsAIOpen(false);
  };

  return (
    <div className="fixed top-1/2 right-0 -translate-y-1/2 flex flex-col items-center z-50 space-y-4">
      <div className={`transition-all duration-300 ease-in-out ${isNewsOpen ? 'mr-[300px]' : 'mr-0'}`}>
        <div
          onClick={toggleNews}
          className="sidebar-icon relative group cursor-pointer p-2 rounded-l-full border dark:bg-black/50 dark:backdrop-blur-sm shadow-sm bg-slate-100 backdrop-blur-sm drop-shadow-2xl text-3xl text-black dark:text-white"
        >
          {newspaper}
        </div>
      </div>
      <div className={`transition-all duration-300 ease-in-out ${isAIOpen ? 'mr-[300px]' : 'mr-0'}`}>
        <div
          onClick={toggleAI}
          className="sidebar-icon relative group cursor-pointer p-2 rounded-l-full border dark:bg-black/50 dark:backdrop-blur-sm shadow-sm bg-slate-100 backdrop-blur-sm drop-shadow-2xl text-3xl text-black dark:text-white"
        >
          {aiIcon}
        </div>
      </div>
      <div className={`transition-all duration-300 ease-in-out ${isWikiOpen ? 'mr-[300px]' : 'mr-0'}`}>
        <div
          onClick={toggleWiki}
          className="sidebar-icon relative group cursor-pointer p-2 rounded-l-full border dark:bg-black/50 dark:backdrop-blur-sm shadow-sm bg-slate-100 backdrop-blur-sm drop-shadow-2xl text-3xl text-black dark:text-white"
        >
          {bookIcon}
        </div>
      </div>
      <div className={`fixed top-1/2 -translate-y-1/2 right-0 transition-all duration-300 ease-in-out ${isNewsOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <News />
      </div>
      <div className={`fixed top-1/2 -translate-y-1/2 right-0 transition-all duration-300 ease-in-out ${isAIOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <AIContent />
      </div>
      <div className={`fixed top-1/2 -translate-y-1/2 right-0 transition-all duration-300 ease-in-out ${isWikiOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <Wiki /> {/* Component for Wikipedia content */}
      </div>
    </div>
  );
};

export default AiNewsSidebar;
