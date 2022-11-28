import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// NODE 18 REQUIRED
const fillDb = async () => {
  const res = (await (
    await fetch(
      `https://api.themoviedb.org/3/list/12179?api_key=${process.env.TMDB_API_KEY}`
    )
  ).json()) as {
    items: {
      original_title: string;
      overview: string;
      poster_path: string;
      original_name: string;
    }[];
  };

  // Filter out uneeded data
  const movies = res.items.map(movie => ({
    title: movie.original_title ? movie.original_title : movie.original_name,
    image: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
    description: movie.overview
  }));

  // Call db
  const results = await prisma.movie.createMany({ data: movies });
  console.log("created?", results);
};

fillDb();
