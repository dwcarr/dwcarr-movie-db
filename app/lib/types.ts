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
