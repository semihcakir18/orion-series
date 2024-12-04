import React, { useEffect, useState } from "react";
import {
  fetchRecentMovies,
  fetchMovieDetails,
  fetchIMDbRating,
  fetchTopRatedMovies,
} from "../Services/Movie";
import { fetchRecentSeries, fetchSerieDetails } from "../Services/Serie";
import MovieCard from "./MovieCard";
import "../Styles/MovieList.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { MovieListProps } from "../Interfaces";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const MovieList = ({ type, setMovieID }: MovieListProps) => {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [apiPage, setApiPage] = useState<number>(1);
  const [shown, setShown] = useState<number>(7);
  const [count, setCount] = useState<number>(12);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1480 && window.innerWidth > 1320) {
        setShown(6);
        setCount(24);
      } else if (window.innerWidth <= 1320 && window.innerWidth > 1160) {
        setShown(5);
        setCount(28);
      } else if (window.innerWidth <= 1160 && window.innerWidth > 1000) {
        setShown(4);
        setCount(36);
      } else if (window.innerWidth <= 1000 && window.innerWidth > 768) {
        setShown(3);
        setCount(48);
      } else if (window.innerWidth <= 768) {
        setShown(2);
        setCount(72);
      } else {
        setShown(7);
        setCount(12);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    document.body.style.backgroundColor = "#a18a6f";
  };

  useEffect(() => {
    const loadItems = async () => {
      let itemList;
      if (type === "top-rated") {
        itemList = await fetchTopRatedMovies(apiPage);
      } else {
        itemList =
          type === "movie"
            ? await fetchRecentMovies(apiPage)
            : await fetchRecentSeries(apiPage);
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
    setApiPage(Math.floor(page / Math.ceil(20 / shown)) + 1);
    console.log(apiPage);
    loadItems();
  }, [page]);

  const title =
    type === "top-rated"
      ? "En İyi Filmler"
      : type === "movie"
      ? "Son Zamanlardaki Popüler Filmler"
      : "Popüler Diziler";
  return (
    <>
      <div className="row">
        <h1>{title}</h1>
        <div className="row_posters">
          {items
            .slice(
              ((page - 1) % Math.ceil(20 / shown)) * shown,
              ((page - 1) % Math.ceil(20 / shown)) * shown + shown
            )
            .map((item) => (
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
        </div>{" "}
      </div>
      <br />
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
          count={count}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          color="secondary"
        />
      </Stack>
    </>
  );
};
export default MovieList;
