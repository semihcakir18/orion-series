import "./MovieCard.css";
import {MovieCardProps} from "../Interfaces";


const MovieCard: React.FC<MovieCardProps> = ({ id, title, description, imageUrl, rating, onCardClick }) => {
  return (
    <div className="card" onClick={() => onCardClick(id)}>
      <img src={imageUrl} alt={title} />
      <div className="card-content">
        <h2>{title}</h2>
        <br />
        <p>{description}</p>
        <h4>IMDb Rating: {rating}</h4>
      </div>
    </div>
  );
};

export default MovieCard;
