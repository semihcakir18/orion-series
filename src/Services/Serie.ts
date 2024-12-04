import axios from "axios";
import { API_KEY, OMDB_API_KEY } from "../ApiKeys";
const BASE_URL = "https://api.themoviedb.org/3";

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
  
  export const fetchSerieVideos = async (serieId: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/tv/${serieId}/videos`, {
        params: {
          api_key: API_KEY,
        },
      });
      return response.data.results;
    } catch (error) {
      console.error(`Fragmanları çekerken hata (ID: ${serieId}):`, error);
    }
  };
  