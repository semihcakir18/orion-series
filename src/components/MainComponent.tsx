import MovieList from "./MovieList";
import Trailer from "./Trailer";
import "./MainComponent.css";
import { useState } from "react";

export default function MainComponent() {
  const [movieID, setMovieID] = useState<number>(0);

  return (
    <div>
      <Trailer movieID={movieID} />
      <section>
        <MovieList type="movie" movieID={movieID} setMovieID={setMovieID} />
      </section>
      <section>
        <MovieList type="top-rated" movieID={movieID} setMovieID={setMovieID} />
      </section>
      <section>
        <MovieList type="serie" movieID={movieID} setMovieID={setMovieID} />
      </section>
    </div>
  );
}
