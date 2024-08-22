import { fetchGenreDetails } from "~/lib/movies";
import { ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";

export const clientLoader = async ({
  request,
  params,
}: ClientLoaderFunctionArgs) => {
  const { id } = params as { id: string };
  const token = localStorage.getItem("movieAuthToken") as string;
  if (!token) {
    throw new Error("No token found");
  }
  const genreDetails = await fetchGenreDetails(token, id);
  return genreDetails;
};

export default function GenreDetails() {
  const data = useLoaderData<typeof clientLoader>();
  return <div>{data.name}</div>;
}
