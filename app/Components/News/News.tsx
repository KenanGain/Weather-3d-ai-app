"use client";
import React from "react";
import { useGlobalContext } from "@/app/Context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";

interface NewsArticle {
  title: string;
  description: string;
  link: string;
}

interface NewsData {
  news: {
    results: NewsArticle[];
  };
}

function News() {
  const { news } = useGlobalContext() as NewsData;

  if (!news || !news.results || news.results.length === 0) {
    return (
      <div className="p-4 border rounded-lg flex flex-col justify-between drop-shadow-2xl dark:bg-dark-grey shadow-sm h-full dark:shadow-none gap-2 backdrop-blur-sm">
        <Skeleton className="w-full h-[20px] rounded-full bg-slate-100 backdrop-blur-sm" />
        <Skeleton className="w-full h-[20px] rounded-full " />
      </div>
    );
  }

  return (
    <div className="news pt-6 px-4 border rounded-lg flex flex-col gap-4 drop-shadow-2xl dark:bg-black/50 dark:backdrop-blur-sm shadow-sm bg-slate-100 backdrop-blur-sm h-[500px] w-[300px]">
      <h2 className="text-xl font-bold mb-2">Top News</h2>
      <div className="overflow-y-auto flex-grow">
        {news.results.slice(0, 5).map((article: NewsArticle, index: number) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<div key={index} className="news-article mb-4 pb-2 border-b last:border-b-0">
            <h3 className="text-lg font-semibold mb-1">{article.title}</h3>
            <p className="text-sm dark:text-white text-gray-600 mb-1">{article.description}</p>
            <a
              href={article.link}
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

export default News;