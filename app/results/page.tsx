import { getAllMovies } from "@server/movies";
import ResultsList from "./list";
import Link from "next/link";

export default async function ResultsPage() {
  const movies = await getAllMovies();

  return (
    <section className='max-w-2xl mx-auto p-4 space-y-4'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl'>All Results - List</h2>
        <Link
          href='/results/chart'
          className='block underline hover:opacity-60 focus:opacity-60'
        >
          See graph
        </Link>
      </div>
      <ResultsList movies={movies} />
    </section>
  );
}
