export interface MovieCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  rating: number;
  onCardClick: (id: number) => void;
}
export interface MovieListProps {
  type: "movie" | "serie" | "top-rated";
  movieID: number;
  setMovieID: React.Dispatch<React.SetStateAction<number>>;
}
export interface TrailerProps {
  movieID: number | null;
}
