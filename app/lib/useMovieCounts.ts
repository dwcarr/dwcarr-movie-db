import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import { FetchGenresResponse } from "./types";

export const useMovieCounts = () => {
  const fetcher = useFetcher<FetchGenresResponse>();
  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") {
      fetcher.load("/genres/1");
    }
  }, [fetcher]);

  const { data } = fetcher;
  let totalMovies = 0;
  const genreCounts = data?.data.reduce((acc, genre) => {
    acc[genre.title] = genre.movies.length;
    totalMovies += genre.movies.length;
    return acc;
  }, {} as Record<string, number>);

  return { genreCounts, totalMovies };
};
