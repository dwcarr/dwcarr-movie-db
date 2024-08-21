import { fetchMovies } from "~/lib/movies";
import { ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";

export const clientLoader = async ({ request }: ClientLoaderFunctionArgs) => {
  const token = localStorage.getItem("movieAuthToken") as string;
  if (!token) {
    throw new Error("No token found");
  }
  const movies = await fetchMovies(token, { page: 1, limit: 10 });
  return movies;
};

clientLoader.hydrate = true;

export default function Movies() {
  const { data: movies, totalPages } = useLoaderData<typeof clientLoader>();
  console.log("movies", movies);
  return <div>{movies.length}</div>;
}
