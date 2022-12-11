import { getAllMovies } from "@server/movies";
import Image from "next/image";

export default async function ResultsPage() {
  const allMovies = await getAllMovies();

  const getCountPercent = (
    movie: Awaited<ReturnType<typeof getAllMovies>>[0]
  ) => {
    const { votesFor, votesAgainst } = movie._count;
    return (votesFor / (votesFor + votesAgainst)) * 100;
  };

  return (
    <main className='max-w-2xl mx-auto p-4 space-y-4'>
      <h1 className='text-3xl font-medium bg-red-600 max-w-fit px-4 py-2 text-white'>
        Results
      </h1>
      <section>
        <ul className='space-y-4'>
          {allMovies.map(movie => (
            <li className='bg-white shadow-md pr-4 flex gap-4 sm:justify-between items-center last:border-b'>
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
    </main>
  );
}
