import { getAllMovies } from "@server/movies";
import Image from "next/image";

export default async function ResultsPage() {
  const allMovies = await getAllMovies();

  const getCountPercent = (
    movie: Awaited<ReturnType<typeof getAllMovies>>[0]
  ) => {
    const { votesFor, votesAgainst } = movie._count;
    if (votesFor + votesAgainst === 0) return 0;

    return (votesFor / (votesFor + votesAgainst)) * 100;
  };

  return (
    <section className='max-w-2xl mx-auto p-4 space-y-5'>
      <h2 className='text-2xl'>Results Over Time</h2>
      <h2 className='text-2xl'>All Results</h2>
      <ul className='space-y-4'>
        {allMovies.map(movie => (
          <li className='shadow-md pr-4 flex gap-4 items-center bg-white sm:justify-between dark:bg-gray-700'>
            <Image
              src={movie.image}
              alt={movie.title}
              width={70}
              height={100}
            />
            <h2 className='sm:text-center'>{movie.title}</h2>
            <p>{getCountPercent(movie).toFixed(2)}%</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
