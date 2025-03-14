import { useState, useRef, useEffect } from 'react';
import { MediaPlayer } from '@vidstack/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const videos = [
  {
    id: 1,
    title: 'Sample Video 1',
    videoLink: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: '/assets/h3.jpeg',
  },
  {
    id: 2,
    title: 'Sample Video 2',
    videoLink: 'https://www.w3schools.com/html/movie.mp4',
    thumbnail: '/assets/h3.jpeg',
  },
  {
    id: 3,
    title: 'Sample Video 3',
    videoLink: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnail: '/assets/h3.jpeg',
  },
];

export default function VideoTour({ data }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const [zoom, setZoom] = useState(1);
  const playerRef = useRef(null);
  const thumbnailsRef = useRef(null);

  const handleThumbnailClick = (video) => {
    setActiveVideo(video);
  };

  // Update activePhoto when data changes
  useEffect(() => {
    if (data?.photos?.length > 0) {
      setActiveVideo(data.videos[0]); // Set the first photo as active
    }
  }, [data]); // Run this effect whenever `data` changes

  const scrollThumbnails = (direction) => {
    if (thumbnailsRef.current) {
      thumbnailsRef.current.scrollBy({
        left: direction * 200,
        behavior: 'smooth',
      });
    }
  };
  if (!data || !data.videos || !activeVideo) {
    return <div>Loading...</div>; // Or a spinner/placeholder
  }

  return (
    <div className="flex flex-col items-center gap-4 relative w-full px-4 md:px-8">
      {/* Video Player */}
      <div className="relative w-full max-w-4xl h-[400px] border rounded-lg overflow-hidden shadow-lg">
        <MediaPlayer ref={playerRef} controls className="w-full h-full">
          <video
            src={activeVideo.videoLink}
            controls
            className="w-full h-full object-cover"
            style={{
              transform: `scale(${zoom})`,
              transition: 'transform 0.3s ease-in-out',
            }}
          />
        </MediaPlayer>
      </div>

      {/* Zoom Control */}
      <div className="absolute top-14 left-0 flex flex-col items-center bg-black/60 p-2 rounded-lg">
        <span className="text-white text-sm">Zoom</span>
        <input
          type="range"
          min="1"
          max="2"
          step="0.1"
          value={zoom}
          onChange={(e) => setZoom(e.target.value)}
          className="w-1 h-32 appearance-none bg-transparent"
          style={{
            writingMode: 'vertical-lr',
            WebkitAppearance: 'slider-vertical',
          }}
        />
      </div>

      {/* Video Thumbnails */}
      <div className="relative w-full max-w-4xl overflow-hidden mt-4">
        <button
          onClick={() => scrollThumbnails(-1)}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white z-10"
        >
          <ChevronLeft size={24} />
        </button>
        <div
          ref={thumbnailsRef}
          className="flex overflow-x-auto gap-6 p-2 scrollbar-hide scroll-smooth"
        >
          {data?.videos?.map((video) => (
            <div
              key={video?.propertyId}
              className={`relative flex-shrink-0 w-40 h-24 cursor-pointer rounded-md transition-transform duration-200 border-2 ${
                video?.propertyId === activeVideo.propertyId
                  ? 'border-blue-500 scale-110'
                  : 'border-transparent hover:scale-105'
              }`}
              onClick={() => handleThumbnailClick(video)}
            >
              <video
                src={video?.thumbnailUrl}
                alt="property video"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => scrollThumbnails(1)}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white z-10"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
