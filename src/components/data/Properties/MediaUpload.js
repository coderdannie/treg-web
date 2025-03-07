import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { IoVideocamOutline, IoImagesOutline } from 'react-icons/io5';
import toast from 'react-hot-toast';

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

  const errorToast = (message) => toast.error(message, { duration: 3000 });

  // Allowed image formats
  const allowedImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];

  // Image Upload Handler with Auto Upload
  const onDropImages = useCallback(
    async (acceptedFiles) => {
      // Filter out invalid file types
      const validFiles = acceptedFiles.filter((file) =>
        allowedImageTypes.includes(file.type)
      );

      // Show error if invalid files are found
      if (validFiles.length !== acceptedFiles.length) {
        errorToast('Invalid file type. Only JPG, JPEG, and PNG are allowed');

        return; // Stop further execution
      }

      // Check if adding valid files will exceed the limit
      if (images.length + validFiles.length > 20) {
        errorToast('Cannot upload more than 20 images.');
        return; // Stop further execution
      }

      // Add only valid files to the state
      setImages((prev) => [...prev, ...validFiles]);

      // Prepare FormData for valid files
      const formData = new FormData();
      validFiles.forEach((file) => formData.append('files', file));
      formData.append('propertyId', propertyId);

      try {
        // Upload valid files
        await mutatePhotosUpload(formData);
      } catch (error) {
        toast.error('Image upload failed. Please try again.');
        // Rollback the state if the upload fails
        setImages((prev) => prev.filter((file) => !validFiles.includes(file)));
      }
    },
    [images, mutatePhotosUpload, propertyId, setImages]
  );

  // Video Upload Handler with Auto Upload
  const onDropVideos = useCallback(
    async (acceptedFiles) => {
      // Check if adding files will exceed the limit
      if (videos.length + acceptedFiles.length > 20) {
        toast.error('Cannot upload more than 20 videos.');
        return; // Stop further execution
      }

      const formData = new FormData();
      acceptedFiles.forEach((file) => formData.append('files', file));
      formData.append('propertyId', propertyId);

      try {
        // Upload immediately
        await mutate(formData);

        // Only update videos state if upload is successful
        setVideos((prev) => [...prev, ...acceptedFiles]);
      } catch (error) {
        toast.error('Video upload failed. Please try again.');
        // Rollback the state if the upload fails
        setVideos((prev) =>
          prev.filter((file) => !acceptedFiles.includes(file))
        );
      }
    },
    [videos, mutate, propertyId, setVideos]
  );

  // Document Upload (if needed)
  const onDropDocuments = useCallback((acceptedFiles) => {
    setDocuments((prev) => [...prev, ...acceptedFiles]);
  }, []);

  // Dropzone configuration
  const { getRootProps: getImageProps, getInputProps: getImageInput } =
    useDropzone({
      onDrop: onDropImages,
      accept: 'image/jpg, image/jpeg, image/png', // Explicitly specify allowed types
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
        <p className="text-sm text-gray-500">
          Up to 20 images (JPG, JPEG, PNG only)
        </p>
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
