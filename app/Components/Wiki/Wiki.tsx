"use client";
import React from "react";
import { useGlobalContext } from "@/app/Context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";

interface WikiArticle {
  title: string;
  snippet: string;
  pageid: number;
}

interface WikiData {
  wiki: WikiArticle[];
}

function Wiki() {
  const { wiki } = useGlobalContext() as WikiData;

  console.log("Wiki data in component:", wiki); // Debug log

  if (!wiki || wiki.length === 0) {
    console.log("No wiki data available, rendering skeleton"); // Debug log
    return (
      <div className="p-4 border rounded-lg flex flex-col justify-between drop-shadow-2xl dark:bg-dark-grey shadow-sm h-full dark:shadow-none gap-2 backdrop-blur-sm">
        <Skeleton className="w-full h-[20px] rounded-full bg-slate-100 backdrop-blur-sm" />
        <Skeleton className="w-full h-[20px] rounded-full " />
      </div>
    );
  }

  console.log("Rendering wiki data"); // Debug log

  return (
    <div className="wiki pt-6 px-4 border rounded-lg flex flex-col gap-4 drop-shadow-2xl dark:bg-black/50 dark:backdrop-blur-sm shadow-sm bg-slate-100 backdrop-blur-sm h-[500px] w-[300px]">
      <h2 className="text-xl font-bold mb-2">Wikipedia Results</h2>
      <div className="overflow-y-auto flex-grow">
        {wiki.slice(0, 5).map((article: WikiArticle, index: number) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <div key={index} className="wiki-article mb-4 pb-2 border-b last:border-b-0">
            <h3 className="text-lg font-semibold mb-1">{article.title}</h3>
            <p
              className="text-sm dark:text-white text-gray-600 mb-1"
              dangerouslySetInnerHTML={{ __html: article.snippet }}
            ></p>
            <a
              href={`https://en.wikipedia.org/?curid=${article.pageid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-xs hover:underline"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wiki;