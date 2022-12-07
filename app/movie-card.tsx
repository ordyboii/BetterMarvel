import Image from "next/image";
import type { Movie, Movies } from "@server/movies";
import VoteButton from "./vote-button";

type Props = {
  movies: Movies;
  movie: Movie;
};

export default function MovieCard({ movies, movie }: Props) {
  return (
    <article className='flex items-center bg-white shadow-lg h-full w-full sm:max-w-sm sm:flex-col'>
      <Image
        src={movie!.image}
        alt={movie!.title}
        width={500}
        height={800}
        className='object-fit w-36 sm:w-96'
      />
      <div className='p-6 flex gap-4 flex-col items-center'>
        <h2 className='text-xl text-center max-w-lg'>{movie?.title}</h2>
        <VoteButton movies={movies} movie={movie} />
      </div>
    </article>
  );
}
