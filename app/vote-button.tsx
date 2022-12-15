"use client";

import type { Movie, Movies } from "@server/movies";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  movies: Movies;
  movie: Movie;
};

export default function VoteButton({ movie, movies }: Props) {
  const { refresh } = useRouter();
  const [voting, setVoting] = useState(false);

  const vote = async (selected: string) => {
    if (!movies) return;
    setVoting(true);

    if (selected === movies.movieOne?.id) {
      await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          voteForId: movies.movieOne?.id,
          voteAgainstId: movies.movieTwo?.id
        })
      });
    }

    if (selected !== movies.movieOne?.id) {
      await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          voteForId: movies.movieTwo?.id,
          voteAgainstId: movies.movieOne?.id
        })
      });
    }

    setVoting(false);
    // refresh();
    window.location.reload();
  };

  if (!movie) return null;
  return (
    <button
      className='px-4 py-2 bg-red-600 font-semibold text-white rounded-xl max-w-fit hover:opacity-80 disabled:opacity-60'
      onClick={() => vote(movie.id)}
      disabled={voting}
    >
      {voting ? "Voting..." : "Better"}
    </button>
  );
}
