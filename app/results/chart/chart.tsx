"use client";

import type { AllMovies } from "@server/movies";
import { useMeasure } from "react-use";
import { arc, pie, scaleBand, scaleOrdinal, schemeSet2, schemeSet3 } from "d3";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type ChartInnerProps = {
  votes: { name: string; value: number }[];
  width: number;
  height: number;
};

const ChartInner = ({ votes, width, height }: ChartInnerProps) => {
  const [dark, setDark] = useState(false);

  const margin = { top: 20, right: 20, bottom: 20, left: 20 };

  useEffect(() => {
    const media = "(prefers-color-scheme: dark)";
    const listener = window
      .matchMedia(media)
      .addEventListener("change", event => {
        if (event.matches) {
          setDark(true);
        } else {
          setDark(false);
        }
      });

    return () =>
      window.matchMedia(media).removeEventListener("change", listener!);
  }, []);

  const pieGen = pie().value((d: any) => d.value);
  const arcGen = arc().innerRadius(60).outerRadius(200);
  const colourGen = scaleOrdinal(dark ? schemeSet3 : schemeSet2);

  const yDomain = votes.map(vote => vote.name);
  const yScale = scaleBand()
    .domain(yDomain)
    .range([margin.top, height - margin.bottom])
    .padding(1);

  const votesForArcs = pieGen(votes as any).map(vote => {
    const arc = arcGen.startAngle(vote.startAngle).endAngle(vote.endAngle);
    const slicePercent =
      ((vote.endAngle - vote.startAngle) / (2 * Math.PI)) * 100;

    return { path: arc(vote as any) as string, slicePercent };
  });

  return (
    <svg
      className='shadow-md bg-white dark:bg-gray-700'
      viewBox={`0 0 ${width} ${height}`}
    >
      <g transform={`translate(${width - 250}, ${height - (height - 250)})`}>
        {votesForArcs.map(arc => (
          <motion.path
            key={arc.path}
            initial={{ pathLength: 0, opacity: 0, scale: 0 }}
            animate={{ pathLength: 1, opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, type: "spring" }}
            d={arc.path}
            fill={colourGen(arc.path)}
            className='text-white dark:text-gray-700'
            stroke='currentColor'
            strokeWidth={2}
          />
        ))}
      </g>

      {votes.map((vote, idx) => (
        <g
          transform={`translate(${margin.left}, ${yScale(vote.name)})`}
          fill={colourGen(vote.name)}
        >
          <motion.rect
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            width={8}
            height={8}
            x={margin.left}
            y={-8}
          />
          <motion.text
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: margin.left + 20, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {votesForArcs[idx]?.slicePercent.toFixed(2)}%
          </motion.text>
          <motion.text
            initial={{ x: margin.left, opacity: 0 }}
            animate={{ x: margin.left + 80, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {vote.name}
          </motion.text>
        </g>
      ))}
    </svg>
  );
};

type ResultChartProps = {
  movies: AllMovies;
};

export default function ResultsChart({ movies }: ResultChartProps) {
  const [ref, { width, height }] = useMeasure();

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
      <h3 className='text-lg'>Votes For</h3>
      <div className='relative w-full h-[2000px]' ref={ref as any}>
        {width > 0 && (
          <ChartInner votes={votesFor} width={width} height={height} />
        )}
      </div>

      <h3 className='text-lg'>Votes Against</h3>
      <div className='relative w-full h-[2000px]' ref={ref as any}>
        {width > 0 && (
          <ChartInner votes={votesAgainst} width={width} height={height} />
        )}
      </div>
    </>
  );
}
