import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

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
    <Card
      sx={{
        width: 245,
        height: 700,
        display: "flex",
        flexDirection: "column",
        margin: "10px",
        position: "relative",
      }}
    >
      <CardMedia
        sx={{
          width: "100%",
          height: "50%",
        }}
        image={imageUrl}
        title={title}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          overflow: "hidden",
          pb: rating ? "40px" : "inherit",
        }}
      >
        <Typography gutterBottom variant="h5" component="div" noWrap>
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 10,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </Typography>
        {rating && (
          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              left: 16,
              right: 16,
            }}
          >
            <Typography variant="body1" color="primary">
              Rating: {rating}/10
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MovieCard;
