import React, { useEffect, useState } from "react";
import { fetchMovieVideos, fetchSerieVideos } from "../Service";
import Banner from "../assets/banner.png";

interface TrailerProps {
  movieID: number | null;
}

const Trailer: React.FC<TrailerProps> = ({ movieID }) => {
  const [videoKey, setVideoKey] = useState<string | null>(null);

  useEffect(() => {
    const loadTrailer = async () => {
      if (movieID) {
        let videos = await fetchMovieVideos(movieID);

        if (!videos || videos.length === 0) {
          videos = await fetchSerieVideos(movieID);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }

        const trailer = videos?.find(
          (video: any) => video.type === "Trailer" && video.site === "YouTube"
        );
        setVideoKey(trailer?.key || null);
      }
    };

    loadTrailer();
  }, [movieID]);

  return (
    <div className="trailer-container">
      {videoKey ? (
        <iframe
          style={{ marginLeft: "8%", marginTop: "10px" }}
          width="100%"
          height="500px"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=0`}
          title="Movie Trailer"
          allowFullScreen
        />
      ) : (
        <img
          src={Banner}
          alt="Default Banner"
          style={{
            width: "50%",
            height: "300px",
            objectFit: "cover",
            zIndex: -1,
          }}
        />
      )}
    </div>
  );
};
export default Trailer;
