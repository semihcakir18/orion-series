import React, { useEffect, useState } from "react";
import {
  fetchRecentMovies,
  fetchMovieDetails,
  fetchIMDbRating,
  fetchRecentSeries,
  fetchSerieDetails,
} from "../Service";
import MovieCard from "./MovieCard";
import Trailer from "./Trailer";
import "./MovieList.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

interface MovieListProps {
  type: "movie" | "serie";
}

const MovieList: React.FC<MovieListProps> = ({ type }) => {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [trailerOpen, setTrailerOpen] = useState(false);

  const handleCardClick = (id: number) => {
    setSelectedMovieId(id);
    setTrailerOpen(true);
  };

  const handleTrailerClose = () => {
    setTrailerOpen(false);
    setSelectedMovieId(null);
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  useEffect(() => {
    const loadItems = async () => {
      const itemList =
        type === "movie"
          ? await fetchRecentMovies(page)
          : await fetchRecentSeries(page);

      const detailedItems = await Promise.all(
        itemList.map(async (item: any) => {
          const details =
            type === "movie"
              ? await fetchMovieDetails(item.id)
              : await fetchSerieDetails(item.id);
          const imdbRating = await fetchIMDbRating(item.title);

          return {
            ...details,
            imdbRating: imdbRating,
          };
        })
      );
      setItems(detailedItems);
    };

    loadItems();
  }, [page]);

  const title =
    type === "movie"
      ? "Son Zamanlardaki Popüler Filmler"
      : "Son Zamanlardaki Popüler Diziler";

  return (
    <>
      <div className="main">
        <h1>{title}</h1>
        <div className="card-list">
          {items.map((item) => (
            <MovieCard
              key={item.id}
              id={item.id}
              title={item.title || item.name}
              description={item.overview || "null"}
              imageUrl={`${BASE_IMAGE_URL}${item.poster_path}`}
              rating={item.imdbRating}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
        <Stack>
          <Pagination
            count={5}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            color="secondary"
          />
        </Stack>
        <Trailer 
          movieId={selectedMovieId}
          open={trailerOpen}
          onClose={handleTrailerClose}
        />
      </div>
    </>
  );
};
export default MovieList;
