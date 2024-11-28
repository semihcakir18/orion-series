import "./MovieCard.css";
interface MovieCardProps {
  key: number;
  title: string;
  description: string;
  imageUrl: string;
  rating?: number;
}

const MovieCard = ({
  title,
  description,
  imageUrl,
  rating,
}: MovieCardProps) => {
  return (

        <div className="card">
          <img src={imageUrl} alt={title} />
          <div className="card-content">
            <h2>{title}</h2>
            <br />
            <p>{description}</p>
            {rating && <h4>IMDb Rating: {rating}</h4>}
          </div>
        </div>

  );
};

export default MovieCard;
