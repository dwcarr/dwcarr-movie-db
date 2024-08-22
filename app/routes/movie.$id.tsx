import { fetchMovie } from "~/lib/movies";
import {
  ClientLoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { FetchMovieResponse } from "~/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
  const navigate = useNavigate();
  const movie = useLoaderData<typeof clientLoader>();
  const duration = movie.duration;
  const durationString = duration
    ? duration.replace(/PT(?:(\d+)H)?(?:(\d+)M)?/, (_, hours, minutes) => {
        let result = "";
        if (hours) {
          result += `${hours} hour${hours !== "1" ? "s" : ""} `;
        }
        if (minutes) {
          result += `${minutes} minute${minutes !== "1" ? "s" : ""}`;
        }
        return result.trim();
      })
    : null;
  const publishedDate = movie.datePublished;
  const formattedDate = publishedDate
    ? new Date(publishedDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;
  return (
    <div className="container mx-auto py-8">
      <Card className="overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <CardContent className="p-0">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-auto"
              />
            </CardContent>
          </div>

          <div className="md:w-2/3 p-6">
            <Button variant="outline" onClick={() => navigate(-1)}>
              Back
            </Button>

            <CardHeader>
              <CardTitle className="text-3xl font-bold">
                {movie.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {movie.datePublished && (
                  <div>
                    <h2 className="text-lg font-semibold">Release Date</h2>
                    <p>{formattedDate}</p>
                  </div>
                )}
                {duration && (
                  <div>
                    <h2 className="text-lg font-semibold">Runtime</h2>
                    <p>{durationString}</p>
                  </div>
                )}
                {movie.rating && (
                  <div>
                    <h2 className="text-lg font-semibold">Rating</h2>
                    <p>{movie.rating}</p>
                  </div>
                )}
                {movie.genres && (
                  <div>
                    <h2 className="text-lg font-semibold">Genres</h2>
                    <p>{movie.genres.map((genre) => genre.title).join(", ")}</p>
                  </div>
                )}
              </div>
              {movie.summary && (
                <>
                  <h2 className="text-2xl font-bold mb-2">Overview</h2>
                  <p className="mb-6">{movie.summary}</p>
                </>
              )}
              {movie.mainActors && (
                <>
                  <h2 className="text-2xl font-bold mb-2">Cast</h2>
                  <ul className="list-disc list-inside mb-6">
                    {movie.mainActors.slice(0, 5).map((actor) => (
                      <li key={actor}>{actor}</li>
                    ))}
                  </ul>
                </>
              )}
              {movie.directors && (
                <>
                  <h2 className="text-2xl font-bold mb-2">Director(s)</h2>
                  <p>{movie.directors.join(", ")}</p>
                </>
              )}
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}
