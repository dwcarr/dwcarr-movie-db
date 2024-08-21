import { fetchMoviesByGenre } from "~/lib/movies";
import { ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";

export const clientLoader = async ({
  request,
  params,
}: ClientLoaderFunctionArgs) => {
  const { page } = params as { page: string };
  const token = localStorage.getItem("movieAuthToken") as string;
  if (!token) {
    throw new Error("No token found");
  }
  const movies = await fetchMoviesByGenre(token, { page, limit: 100 });
  return movies;
};

export default function Genres() {
  const data = useLoaderData<typeof clientLoader>();
  console.log("data", data);
  return <div>genres</div>;
}
