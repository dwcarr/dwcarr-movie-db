import { FetchMoviesResponse } from "./types";

const baseUrl = "https://0kadddxyh3.execute-api.us-east-1.amazonaws.com";

/**
 * @description A function that makes a request to the movie API.
 * @param {string} path - The path to the API endpoint.
 * @param {string} token - The token to use for the request.
 * @param {Record<string, string | number>} searchParams - The search parameters to use for the request.
 * @returns {Promise<any>} The response from the API.
 */
export const movieApiFunction = async (
  path: string,
  token?: string,
  searchParams?: Record<string, string | number>
) => {
  const url = new URL(`${baseUrl}/${path}`);
  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      url.searchParams.set(key, value.toString());
    });
  }
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  return data;
};

export const fetchToken = async () => {
  return movieApiFunction("auth/token");
};

export const healthCheck = async () => {
  return movieApiFunction("healthcheck");
};

export const fetchMoviesByGenre = async (
  token: string,
  { page, limit }: { page: number | string; limit: number }
) => {
  return movieApiFunction(`genres/movies`, token, { page, limit });
};

export const fetchMovies = async (
  token: string,
  {
    page,
    limit,
    search = "",
    genre = "",
  }: { page: number | string; limit: number; search?: string; genre?: string }
) => {
  return (await movieApiFunction("movies", token, {
    page,
    limit,
    search,
    genre,
  })) as FetchMoviesResponse;
};

export const fetchMovie = async (token: string, id: string) => {
  return movieApiFunction(`movies/${id}`, token);
};

export const fetchMovieTitles = async (
  token: string,
  { page, limit }: { page: number | string; limit: number }
) => {
  return movieApiFunction("movies/titles", token, { page, limit });
};

export const fetchGenreDetails = async (token: string, id: string) => {
  return movieApiFunction(`movies/genres/${id}`, token);
};
