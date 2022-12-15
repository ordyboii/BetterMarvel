import { getMovies } from "@server/movies";
import MovieCard from "./movie-card";

// export const dynamic = "force-dynamic";

export default async function RootPage() {
  const movies = await getMovies();

  return (
    <main className='grid place-content-center gap-4 px-4 pt-6 pb-16'>
      <h1 className='text-3xl font-medium bg-red-600 max-w-fit px-4 py-2 text-white'>
        Rate the better Marvel movie!
      </h1>
      <section className='flex flex-col items-center gap-8 md:flex-row'>
        <MovieCard movie={movies.movieOne} movies={movies} />
        <p className='text-2xl font-semibold'>or</p>
        <MovieCard movie={movies.movieTwo} movies={movies} />
      </section>
    </main>
  );
}
