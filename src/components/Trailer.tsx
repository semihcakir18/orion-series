
import React, { useEffect, useState } from 'react';
import { fetchMovieVideos } from "../Service";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

interface TrailerProps {
  movieId: number | null;
  onClose: () => void;
  open: boolean;
}

const Trailer: React.FC<TrailerProps> = ({ movieId, onClose, open }) => {
  const [videoKey, setVideoKey] = useState<string | null>(null);

  useEffect(() => {
    const loadTrailer = async () => {
      if (movieId) {
        const videos = await fetchMovieVideos(movieId);
        const trailer = videos?.find((video: any) => 
          video.type === "Trailer" && video.site === "YouTube"
        );
        setVideoKey(trailer?.key || null);
      }
    };

    loadTrailer();
  }, [movieId]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="movie-trailer"
      aria-describedby="movie-trailer-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '80%',
        bgcolor: 'background.paper',
        boxShadow: 24,
      }}>
        {videoKey ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoKey}`}
            title="Movie Trailer"
            frameBorder="0"
            allowFullScreen
          />
        ) : (
          <div>No trailer available</div>
        )}
      </Box>
    </Modal>
  );
};

export default Trailer;
