export type MovieListing = {
  id: string;
  title: string;
  posterUrl: string;
  rating: string;
};

export type FetchMoviesResponse = {
  data: MovieListing[];
  totalPages: number;
};

export type FetchGenresResponse = {
  data: {
    id: string;
    title: string;
    movies: { id: string }[];
  }[];
};

export type FetchMovieResponse = {
  bestRating: string;
  worstRating: string;
  writers: string[];
  directors: string[];
  duration: string;
  mainActors: string[];
  id: string;
  title: string;
  posterUrl: string;
  rating: string;
  ratingValue: string;
  datePublished: string;
  genres: {
    id: string;
    title: string;
  }[];
  summary: string;
};

export type FetchGenreDetailsResponse = {
  id: string;
  title: string;
  totalMovies: number;
};
