"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { HiRefresh } from "react-icons/hi";

export default function Header() {
  const pathname = usePathname();
  const { refresh } = useRouter();
  const [isRefreshing, startTransition] = useTransition();

  const isResults = pathname === "/results" ? true : false;

  return (
    <header
      className='flex flex-col gap-5 text-center justify-between items-center p-4 shadow-md bg-white 
    dark:bg-gray-900 md:flex-row md:gap-0 md:text-left'
    >
      <h1 className='font-display text-3xl font-medium bg-red-600 max-w-fit px-4 py-2 text-white tracking-tighter'>
        {isResults ? "Results" : "Which Marvel movie is better"}
      </h1>

      {!isResults && (
        <button
          onClick={() => startTransition(() => refresh())}
          disabled={isRefreshing}
          className='flex gap-2 items-center px-3 py-2 rounded-lg transition bg-gray-200 dark:bg-gray-800 
          hover:scale-95 disabled:opacity-60'
        >
          <HiRefresh /> {isRefreshing ? "Fetching..." : "New movies"}
        </button>
      )}

      <div className='flex flex-col items-center gap-5 sm:flex-row'>
        <Link
          href={isResults ? "/" : "/results"}
          className={`underline hover:opacity-80`}
        >
          {isResults ? "Vote for movies" : "Results"}
        </Link>
        <p className='text'>All data attributed to</p>
        <a href='https://www.themoviedb.org/' target='_blank' rel='noreferrer'>
          <Image
            src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg'
            alt='IMDB attribution'
            width={60}
            height={50}
          />
        </a>
      </div>
    </header>
  );
}
