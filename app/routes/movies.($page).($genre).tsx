import { fetchMovies } from "~/lib/movies";
import {
  ClientLoaderFunctionArgs,
  Link,
  redirect,
  useLoaderData,
  useParams,
  useSearchParams,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMovieCounts } from "~/lib/useMovieCounts";
import { Input } from "@/components/ui/input";
const PAGE_SIZE = 24;

export const clientLoader = async ({
  request,
  params,
}: ClientLoaderFunctionArgs) => {
  const { page, genre } = params as {
    page: string;
    genre?: string;
  };
  const searchParams = new URLSearchParams(request.url.split("?")[1]);
  const search = searchParams.get("search") || undefined;

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
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");
  const { genreCounts, totalMovies } = useMovieCounts();
  const totalCount = search
    ? movies.length
    : genre && genreCounts
    ? genreCounts[genre]
    : totalMovies;
  const pageNumber = parseInt(page);

  const nextPageLink = `/movies/${pageNumber + 1}${genre ? `/${genre}` : ""}`;
  const previousPageLink =
    pageNumber > 1
      ? `/movies/${pageNumber - 1}${genre ? `/${genre}` : ""}`
      : null;
  console.log("movies", movies);
  return (
    <div className="container mx-auto py-8">
      <div className="bg-primary text-primary-foreground py-16 mb-8 text-left">
        <div className="container mx-auto">
          <h1 className="text-7xl font-bold">Movie Time</h1>
        </div>
      </div>
      <div className="flex justify-end mb-4">
        <div className="flex-grow mr-4">
          <Input
            type="text"
            placeholder="Search movies..."
            value={searchParams.get("search") || ""}
            onChange={(e) => {
              const search = e.target.value;
              if (search) {
                setSearchParams({ search });
              } else {
                searchParams.delete("search");
                setSearchParams(searchParams);
              }
            }}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{genre || "All Genres"}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link to={"/movies/1"} prefetch="intent">
              <DropdownMenuItem>All Genres ({totalMovies})</DropdownMenuItem>
            </Link>
            {Object.keys(genreCounts || {}).map((genreTitle) => (
              <Link to={`/movies/1/${genreTitle}`} key={genreTitle}>
                <DropdownMenuItem>
                  {genreTitle + " (" + genreCounts![genreTitle] + ")"}
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="mb-4 text-lg">
        {search
          ? `Your search returned ${totalCount} movies`
          : `Showing ${totalCount} movies${genre ? ` in ${genre}` : ""}`}
      </p>
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
        <Link to={`/movies/${totalPages}`} prefetch="intent">
          <Button variant="outline" disabled={parseInt(page) === totalPages}>
            Last
          </Button>
        </Link>
      </div>
    </div>
  );
}
