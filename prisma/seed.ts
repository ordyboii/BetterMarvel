import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

// NODE 18 REQUIRED
const fillDb = async () => {
  const res = await axios.get<{
    items: {
      original_title: string;
      overview: string;
      poster_path: string;
      original_name: string;
    }[];
  }>(
    `https://api.themoviedb.org/3/list/12179?api_key=${process.env.TMDB_API_KEY}`
  );

  // Filter out uneeded data
  const movies = res.data.items.map(movie => ({
    title: movie.original_title ? movie.original_title : movie.original_name,
    image: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
    description: movie.overview
  }));

  // Call db
  const results = await prisma.movie.createMany({ data: movies });
  console.log("created?", results);
};

fillDb();
