import MovieList from "./MovieList";
import Trailer from "./Trailer";
import { useState } from "react";
import "./MainComponent.css";
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

// Movie List switch case ile yapılabilir.
// Header yapıp bir kategori dropdownu ile özel sayfa yapılabilir.
// Cartlar biraz daha büyüyebilir 
// Listeler çoğalabilir.
//css leri ayır