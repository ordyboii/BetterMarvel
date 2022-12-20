"use client";

import type { AllMovies } from "@server/movies";
import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  movies: AllMovies;
};

export default function ResultsList({ movies }: Props) {
  const getCountPercent = (movie: AllMovies[0]) => {
    const { votesFor, votesAgainst } = movie._count;
    if (votesFor + votesAgainst === 0) {
      return 0;
    }

    return (votesFor / (votesFor + votesAgainst)) * 100;
  };

  return (
    <motion.ul className='space-y-4'>
      {movies.map((movie, idx) => (
        <motion.li
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: idx * 0.1 }}
          key={movie.id}
          className='shadow-md pr-4 flex gap-4 items-center bg-white sm:justify-between dark:bg-gray-700'
        >
          <Image src={movie.image} alt={movie.title} width={70} height={100} />
          <h2 className='sm:text-center'>{movie.title}</h2>
          <p>{getCountPercent(movie).toFixed(2)}%</p>
        </motion.li>
      ))}
    </motion.ul>
  );
}
