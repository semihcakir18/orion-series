import MovieList from "./MovieList";
import "./MainComponent.css"; 
export default function MainComponent() {
  return (
    <div>
      <section>
      <MovieList type="movie" />
      </section>

      <section>
      <MovieList type="serie" />
    </section>
      <h1>MainComponent</h1>
    </div>
  );
}
