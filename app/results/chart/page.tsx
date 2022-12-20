import { getAllMovies } from "@server/movies";
import Link from "next/link";
import ResultsChart from "./chart";

export default async function ResultsChartPage() {
  const movies = await getAllMovies();

  return (
    <section className='max-w-5xl mx-auto p-4 space-y-4'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl'>All Results - Graph</h2>
        <Link
          href='/results'
          className='block underline hover:opacity-60 focus:opacity-60'
        >
          See list
        </Link>
      </div>
      <ResultsChart movies={movies} />
    </section>
  );
}
