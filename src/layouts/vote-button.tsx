import { createSignal } from "solid-js";
import type { getMovies } from "../server/movies";

type Props = {
  movies: Awaited<ReturnType<typeof getMovies>>;
  movie: Awaited<ReturnType<typeof getMovies>>["movieOne"];
};

export default function VoteButton({ movies, movie }: Props) {
  const [voting, setVoting] = createSignal(false);

  const vote = async (selected: string) => {
    if (!movies) return;
    setVoting(true);

    if (selected === movies.movieOne?.id) {
      await fetch("/vote", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          voteForId: movies.movieOne?.id,
          voteAgainstId: movies.movieTwo?.id
        })
      });
    }

    if (selected !== movies.movieOne?.id) {
      await fetch("/vote", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          voteForId: movies.movieTwo?.id,
          voteAgainstId: movies.movieOne?.id
        })
      });
    }

    setVoting(false);
    window.location.reload();
  };

  if (!movie) return null;

  return (
    <button
      class='px-4 py-2 bg-red-600 font-semibold text-white rounded-xl max-w-fit hover:opacity-80 disabled:opacity-60'
      onClick={() => vote(movie.id)}
      disabled={voting()}
    >
      {voting() ? "Voting..." : "Better"}
    </button>
  );
}
