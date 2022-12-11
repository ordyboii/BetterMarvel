import { cache } from "react";
import { prisma } from "./db";

const getRandomMovie: (movieCount: number, first?: number) => number = (
  movieCount,
  first
) => {
  const movieNumber = Math.floor(Math.random() * movieCount);
  if (movieNumber !== first) return movieNumber;

  return getRandomMovie(first, movieCount);
};

export const getMovies = cache(async () => {
  const allMovies = await prisma.movie.findMany();
  const first = getRandomMovie(allMovies.length);
  const second = getRandomMovie(allMovies.length, first);

  return { movieOne: allMovies[first], movieTwo: allMovies[second] };
});

export const getAllMovies = cache(() =>
  prisma.movie.findMany({
    orderBy: {
      votesFor: { _count: "desc" }
    },
    select: {
      id: true,
      title: true,
      image: true,
      _count: {
        select: { votesAgainst: true, votesFor: true }
      }
    }
  })
);

export type Movies = Awaited<ReturnType<typeof getMovies>>;
export type Movie = Awaited<ReturnType<typeof getMovies>>["movieOne"];
export type AllMovies = Awaited<ReturnType<typeof getAllMovies>>;
