import { fetchMovieTitles } from "~/lib/movies";
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
  const movieTitles = await fetchMovieTitles(token, { page, limit: 100 });
  return movieTitles;
};

export default function MovieTitles() {
  const data = useLoaderData<typeof clientLoader>();
  console.log(data);
  return <div>{data.data.length}</div>;
}
