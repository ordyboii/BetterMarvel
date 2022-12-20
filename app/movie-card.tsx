"use client";
``;
import Image from "next/image";
import type { Movie, Movies } from "@server/movies";
import VoteButton from "./vote-button";
import { motion } from "framer-motion";

type Props = {
  movies: Movies;
  movie: Movie;
  left?: boolean;
};

export default function MovieCard({ movies, movie, left }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.8, x: left ? -30 : 30 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      className='flex flex-col items-center bg-white dark:bg-gray-700 shadow-lg h-full w-full'
    >
      <Image
        src={movie!.image}
        alt={movie!.title}
        width={500}
        height={800}
        className='object-fit w-96'
      />
      <div className='p-6 flex gap-4 flex-col items-center'>
        <h2 className='font-display text-xl text-center max-w-lg'>
          {movie?.title}
        </h2>
        <VoteButton movies={movies} movie={movie} />
      </div>
    </motion.article>
  );
}
