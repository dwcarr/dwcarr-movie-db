import { fetchMoviesByGenre } from "~/lib/movies";
import {
  ClientLoaderFunctionArgs,
  redirect,
  useLoaderData,
} from "@remix-run/react";

export const clientLoader = async ({
  request,
  params,
}: ClientLoaderFunctionArgs) => {
  const { page } = params as { page: string | undefined };
  if (!page) {
    return redirect("1");
  }
  const token = localStorage.getItem("movieAuthToken") as string;
  if (!token) {
    throw new Error("No token found");
  }
  const genres = await fetchMoviesByGenre(token, { page, limit: 100 });
  return genres;
};

export default function Genres() {
  const data = useLoaderData<typeof clientLoader>();
  console.log("data", data);
  return <div>genres</div>;
}
