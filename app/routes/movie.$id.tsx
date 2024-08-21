import { fetchMovie } from "~/lib/movies";
import { ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";
import { FetchMovieResponse } from "~/lib/types";

export const clientLoader = async ({
  request,
  params,
}: ClientLoaderFunctionArgs) => {
  const { id } = params as { id: string };
  const token = localStorage.getItem("movieAuthToken") as string;
  if (!token) {
    throw new Error("No token found");
  }
  const movie = (await fetchMovie(token, id)) as FetchMovieResponse;
  return movie;
};

export default function Movie() {
  const data = useLoaderData<typeof clientLoader>();
  console.log(data);
  return <div>{data.title}</div>;
}
