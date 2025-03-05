import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { IoVideocamOutline, IoImagesOutline } from 'react-icons/io5';

const MediaUpload = ({
  images,
  setImages,
  videos,
  setVideos,
  mutatePhotosUpload,
  propertyId,
  mutate,
  isLoading,
  isUploading,
}) => {
  const [documents, setDocuments] = useState([]);

  // Image Upload Handler with Auto Upload
  const onDropImages = useCallback(
    (acceptedFiles) => {
      if (images.length + acceptedFiles.length > 20) return;

      setImages((prev) => [...prev, ...acceptedFiles]);

      // Prepare FormData
      const formData = new FormData();
      acceptedFiles.forEach((file) => formData.append('files', file));

      // Replace with actual property ID
      formData.append('propertyId', propertyId);

      // Upload immediately
      mutatePhotosUpload(formData);
    },
    [images, mutatePhotosUpload]
  );

  // Video Upload Handler with Auto Upload
  const onDropVideos = useCallback(
    (acceptedFiles) => {
      if (videos.length + acceptedFiles.length > 20) return;

      setVideos((prev) => [...prev, ...acceptedFiles]);

      const formData = new FormData();
      acceptedFiles.forEach((file) => formData.append('files', file));

      formData.append('propertyId', propertyId);

      mutate(formData);
    },
    [videos, mutate]
  );

  // Document Upload (if needed)
  const onDropDocuments = useCallback((acceptedFiles) => {
    setDocuments((prev) => [...prev, ...acceptedFiles]);
  }, []);

  // Dropzone configuration
  const { getRootProps: getImageProps, getInputProps: getImageInput } =
    useDropzone({
      onDrop: onDropImages,
      accept: 'image/*',
      multiple: true,
    });

  const { getRootProps: getVideoProps, getInputProps: getVideoInput } =
    useDropzone({
      onDrop: onDropVideos,
      accept: 'video/*',
      multiple: true,
    });

  return (
    <div className="mx-auto bg-white mt-2">
      {/* Image Upload */}
      <div
        {...getImageProps()}
        className="border-2 border-dashed p-6 text-center rounded-lg cursor-pointer"
      >
        <IoImagesOutline className="text-4xl text-primary mx-auto" />
        <p>
          Drag and drop images or <span className="text-primary">browse</span>
        </p>
        <p className="text-sm text-gray-500">Up to 20 images</p>
        <input {...getImageInput()} />
      </div>

      <div className="text-sm mt-2">
        {isLoading ? (
          <span className="block w-4 h-4 border-2 border-gray-200 border-t-primary rounded-full animate-spin" />
        ) : (
          ` ${images.length} image(s) uploaded`
        )}
      </div>

      {/* Video Upload */}
      <div
        {...getVideoProps()}
        className="border-2 border-dashed p-6 text-center rounded-lg cursor-pointer mt-4"
      >
        <IoVideocamOutline className="text-4xl text-primary mx-auto" />
        <p>
          Drag and drop videos or <span className="text-primary">browse</span>
        </p>
        <p className="text-sm text-gray-500">Up to 20 videos</p>
        <input {...getVideoInput()} />
      </div>
      <div className="text-sm mt-2">
        {isUploading ? (
          <span className="w-4 h-4 block border-2 border-gray-200 border-t-primary rounded-full animate-spin" />
        ) : (
          ` ${videos.length} video(s) uploaded`
        )}
      </div>
    </div>
  );
};

export default MediaUpload;
