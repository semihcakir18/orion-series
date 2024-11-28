import React, { useEffect, useState } from "react";
import { fetchMovies, fetchMovieDetails, fetchIMDbRating } from "./Service";
import MovieCard from "./components/MovieCard";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      const movieList = await fetchMovies();
      const detailedMovies = await Promise.all(
        movieList.map(async (movie: any) => {
          const details = await fetchMovieDetails(movie.id);
          const imdbRating = await fetchIMDbRating(movie.title);
          
          return {
            ...details,
            imdbRating: imdbRating
          };
        })
      );
      setMovies(detailedMovies);
    };

    loadMovies();
  }, []);

  return (
    <div>
      <h1>Son 1 Yıldaki Filmler</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            description={movie.overview || "null"}
            imageUrl={`${BASE_IMAGE_URL}${movie.poster_path}`}
            rating={movie.imdbRating}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;