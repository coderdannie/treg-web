import { useState, useRef, useEffect } from 'react'; // Add useEffect
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function PhotoGallery({ data }) {
  const [activePhoto, setActivePhoto] = useState(null); // Initialize as null
  const [zoom, setZoom] = useState(1);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const thumbnailsRef = useRef(null);

  // Update activePhoto when data changes
  useEffect(() => {
    if (data?.photos?.length > 0) {
      setActivePhoto(data.photos[0]); // Set the first photo as active
    }
  }, [data]); // Run this effect whenever `data` changes

  const handleThumbnailClick = (photo) => {
    setActivePhoto(photo);
  };

  const scrollThumbnails = (direction) => {
    if (thumbnailsRef.current) {
      thumbnailsRef.current.scrollBy({
        left: direction * 200,
        behavior: 'smooth',
      });
    }
  };

  // Function to navigate to the previous image
  const handlePrevious = () => {
    if (!data?.photos || !activePhoto) return; // Guard clause
    const currentIndex = data.photos.findIndex(
      (photo) => photo?.propertyId === activePhoto?.propertyId
    );
    const previousIndex =
      (currentIndex - 1 + data.photos.length) % data.photos.length;
    setActivePhoto(data.photos[previousIndex]);
  };

  // Function to navigate to the next image
  const handleNext = () => {
    if (!data?.photos || !activePhoto) return; // Guard clause
    const currentIndex = data.photos.findIndex(
      (photo) => photo?.propertyId === activePhoto?.propertyId
    );
    const nextIndex = (currentIndex + 1) % data.photos.length;
    setActivePhoto(data.photos[nextIndex]);
  };

  // If data is not yet available, show a loading state
  if (!data || !data.photos || !activePhoto) {
    return <div>Loading...</div>; // Or a spinner/placeholder
  }

  return (
    <div className="flex flex-col items-center gap-4 relative w-full px-4 md:px-8">
      {/* Photo Viewer */}
      <div className="relative w-full max-w-4xl h-[300px] md:h-[400px] border rounded-lg overflow-hidden shadow-lg">
        <img
          src={activePhoto?.photoLink}
          alt={activePhoto?.photoLink}
          className="w-full h-full object-cover cursor-pointer"
          style={{
            transform: `scale(${zoom})`,
            transition: 'transform 0.3s ease-in-out',
          }}
          onClick={() => setIsOverlayOpen(true)} // Open overlay on click
        />
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

      {/* Photo Thumbnails */}
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
          {data.photos?.map((photo) => (
            <div
              key={photo?.propertyId}
              className={`relative flex-shrink-0 w-32 h-20 md:w-40 md:h-24 cursor-pointer rounded-md transition-transform duration-200 border-2 ${
                photo?.propertyId === activePhoto?.propertyId
                  ? 'border-blue-500 scale-110'
                  : 'border-transparent hover:scale-105'
              }`}
              onClick={() => handleThumbnailClick(photo)}
            >
              <img
                src={photo?.photoLink}
                alt={photo?.photoLink}
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

      {/* Overlay */}
      {isOverlayOpen && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setIsOverlayOpen(false)} // Close overlay on click outside
        >
          <div className="relative max-w-full max-h-full p-4">
            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent overlay from closing
                handlePrevious();
              }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Image */}
            <img
              src={activePhoto?.photoLink}
              alt={activePhoto?.photoLink}
              className="max-w-full max-h-[90vh] rounded-lg" // Slight border radius
            />

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent overlay from closing
                handleNext();
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white"
            >
              <ChevronRight size={24} />
            </button>

            {/* Close Button */}
            <button
              onClick={() => setIsOverlayOpen(false)}
              className="absolute top-2 right-2 bg-black/50 p-2 rounded-full text-white"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
