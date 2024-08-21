import { fetchMovies } from "~/lib/movies";
import { ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";

const PAGE_SIZE = 24;

export const clientLoader = async ({
  request,
  params,
}: ClientLoaderFunctionArgs) => {
  const { page, genre, search } = params as {
    page: string;
    genre?: string;
    search?: string;
  };
  const token = localStorage.getItem("movieAuthToken") as string;
  if (!token) {
    throw new Error("No token found");
  }
  const movies = await fetchMovies(token, {
    page,
    genre,
    search,
    limit: PAGE_SIZE,
  });
  return movies;
};

clientLoader.hydrate = true;

export default function Movies() {
  const { data: movies, totalPages } = useLoaderData<typeof clientLoader>();
  console.log("movies", movies);
  return <div>{movies.length}</div>;
}
