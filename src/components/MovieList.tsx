import React, { useEffect, useState } from "react";
import { fetchMovies, fetchMovieDetails, fetchIMDbRating } from "../Service";
import MovieCard from "./MovieCard";
import "./MovieList.css";

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
            imdbRating: imdbRating,
          };
        })
      );
      setMovies(detailedMovies);
    };

    loadMovies();
  }, []);

  return (
    <div className="title-cards">
      <h1>Son 1 Yıldaki Filmler</h1>
      <div className="card-list">
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
