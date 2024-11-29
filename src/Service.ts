import axios from "axios";
const OMDB_API_KEY = "c7df7326";
const API_KEY = "f246fdbd97ae1eb6906fd392248b9ffa";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchRecentMovies = async (page: number) => {
  const today = new Date();
  const lastYear = new Date();
  lastYear.setFullYear(today.getFullYear() - 1);
  const todayStr = today.toISOString().split("T")[0];
  const lastYearStr = lastYear.toISOString().split("T")[0];

  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        sort_by: "popularity.desc",
        "release_date.gte": lastYearStr,
        "release_date.lte": todayStr,
        with_original_language: "en",
        page: page,
      },
    });

    const movies = response.data.results.filter(
      (movie: any) => movie.poster_path !== null
    );

    return movies;
  } catch (error) {
    console.error("Film verilerini çekerken hata oluştu:", error);
  }
};
export const fetchMovieDetails = async (movieId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Film detaylarını çekerken hata (ID: ${movieId}):`, error);
    return null;
  }
};

export const fetchRecentSeries = async (page: number) => {
  const today = new Date();
  const lastYear = new Date();
  lastYear.setFullYear(today.getFullYear() - 1);
  const todayStr = today.toISOString().split("T")[0];
  const lastYearStr = lastYear.toISOString().split("T")[0];

  try {
    const response = await axios.get(`${BASE_URL}/discover/tv`, {
      params: {
        api_key: API_KEY,
        "air_date.gte": lastYearStr,
        "air_date.lte": todayStr,
        include_adult: "false",
        include_null_first_air_dates: "false",
        language: "en-US",
        with_original_language: "en",
        page: page,
        sort_by: "popularity.desc",
      },
    });

    const series = response.data.results.filter(
      (serie: any) => serie.poster_path !== undefined
    );

    return series;
  } catch (error) {
    console.error("Dizi verilerini çekerken hata oluştu:", error);
  }
};
export const fetchSerieDetails = async (serieId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/${serieId}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Dizi detaylarını çekerken hata (ID: ${serieId}):`, error);
    return null;
  }
};

export const fetchMovieVideos = async (movieId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(`Fragmanları çekerken hata (ID: ${movieId}):`, error);
  }
};

export const fetchIMDbRating = async (movieName: string) => {
  try {
    const response = await axios.get(`https://www.omdbapi.com/`, {
      params: {
        apiKey: OMDB_API_KEY,
        t: movieName,
      },
    });
    return response.data.imdbRating;
  } catch (error) {
    console.error("IMDb rating alırken hata", error);
    return null;
  }
};
