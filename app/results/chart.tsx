"use client";

import type { getAllMovies } from "@server/movies";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

type Props = {
  movies: Awaited<ReturnType<typeof getAllMovies>>;
};

export default function ResultsChart({ movies }: Props) {
  const votesFor = movies.map(movie => ({
    name: movie.title,
    value: movie._count.votesFor
  }));

  const votesAgainst = movies.map(movie => ({
    name: movie.title,
    value: movie._count.votesAgainst
  }));

  return (
    <>
      <h3 className='text-xl'>Votes For</h3>
      <ResponsiveContainer
        className='bg-gray-700 shadow-xl'
        width='100%'
        height={350}
      >
        <PieChart width={300} height={300}>
          <Pie
            data={votesFor}
            dataKey='value'
            nameKey='name'
            cx='50%'
            cy='50%'
            innerRadius={40}
            outerRadius={110}
            fill='#22c55e'
            stroke='rgb(55 65 81 / var(--tw-bg-opacity))'
            strokeWidth={2}
            label
            animationDuration={800}
            animationBegin={500}
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <h3 className='text-xl'>Votes Against</h3>
      <ResponsiveContainer
        className='bg-gray-700 shadow-xl'
        width='100%'
        height={350}
      >
        <PieChart width={300} height={300}>
          <Pie
            data={votesAgainst}
            dataKey='value'
            nameKey='name'
            cx='50%'
            cy='50%'
            innerRadius={40}
            outerRadius={110}
            fill='#dc2626'
            stroke='rgb(55 65 81 / var(--tw-bg-opacity))'
            label
            strokeWidth={2}
            animationDuration={800}
            animationBegin={800}
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}
