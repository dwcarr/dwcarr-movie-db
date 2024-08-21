import { fetchMovies } from "~/lib/movies";
import {
  ClientLoaderFunctionArgs,
  Link,
  redirect,
  useLoaderData,
  useParams,
} from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

  if (!page) {
    return redirect("1");
  }

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
  const { page, genre } = useParams() as { page: string; genre?: string };
  const pageNumber = parseInt(page);

  const nextPageLink = `/movies/${pageNumber + 1}${genre ? `/${genre}` : ""}`;
  const previousPageLink =
    pageNumber > 1
      ? `/movies/${pageNumber - 1}${genre ? `/${genre}` : ""}`
      : null;
  console.log("movies", movies);
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} prefetch="intent">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-48 object-cover"
                />
              </CardContent>
              <CardFooter className="p-4">
                <h3 className="text-lg font-semibold">{movie.title}</h3>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
      <div className="flex justify-between items-center mt-8">
        <Link to={"/movies/1"} prefetch="intent">
          <Button variant="outline" disabled={page === "1"}>
            First
          </Button>
        </Link>
        <Link to={previousPageLink || ""} prefetch="intent">
          <Button variant="outline" disabled={page === "1"}>
            Previous
          </Button>
        </Link>
        <span>
          Page {page} of {totalPages}
        </span>
        <Link to={nextPageLink} prefetch="intent">
          <Button variant="outline" disabled={parseInt(page) === totalPages}>
            Next
          </Button>
        </Link>
        <Button variant="outline" disabled={parseInt(page) === totalPages}>
          Last
        </Button>
      </div>
    </div>
  );
}
