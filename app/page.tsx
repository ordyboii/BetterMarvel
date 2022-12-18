import { getMovies } from "@server/movies";
import MovieCard from "./movie-card";

export const dynamic = "force-dynamic";

export default async function RootPage() {
  const movies = await getMovies();

  return (
    <main className='grid place-content-center gap-4 px-4 pt-6 pb-16'>
      <section className='flex flex-col items-center gap-8 md:flex-row'>
        <MovieCard left movie={movies.movieOne} movies={movies} />
        <p className='font-display text-2xl font-semibold'>or</p>
        <MovieCard movie={movies.movieTwo} movies={movies} />
      </section>
    </main>
  );
}
