import React, { useEffect, useState } from "react";
import {
  fetchRecentMovies,
  fetchMovieDetails,
  fetchIMDbRating,
  fetchRecentSeries,
  fetchSerieDetails,
  fetchTopRatedMovies,
} from "../Service";
import MovieCard from "./MovieCard";
import "./MovieList.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { MovieListProps } from "../Interfaces";
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const MovieList: React.FC<MovieListProps> = ({ type, movieID, setMovieID }) => {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);

  const handleCardClick = (id: number) => {
    setMovieID(id);
    document.body.style.backgroundColor = "black";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  useEffect(() => {
    const loadItems = async () => {
      let itemList;
      if (type === "top-rated") {
        itemList = await fetchTopRatedMovies(page);
      } else {
        itemList =
          type === "movie"
            ? await fetchRecentMovies(page)
            : await fetchRecentSeries(page);
      }

      const detailedItems = await Promise.all(
        itemList.map(async (item: any) => {
          const details =
            type === "serie"
              ? await fetchSerieDetails(item.id)
              : await fetchMovieDetails(item.id);
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
  }, [page, type]);

  const title =
    type === "top-rated"
      ? "En İyi Filmler"
      : type === "movie"
      ? "Son Zamanlardaki Popüler Filmler"
      : "Popüler Diziler";
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
            sx={{
              "& .MuiPaginationItem-root": {
                color: "rgb(173, 12, 12)",
                "&.Mui-selected": {
                  outlineColor: "lightblue",
                },
                "&:hover": {
                  backgroundColor: "lightblue",
                },
              },
            }}
            count={5}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            color="secondary"
          />
        </Stack>
      </div>
    </>
  );
};
export default MovieList;
