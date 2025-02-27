import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaFileAlt } from 'react-icons/fa';

import { IoVideocamOutline } from 'react-icons/io5';
import { IoImagesOutline } from 'react-icons/io5';

const MediaUpload = ({ images, setImages, videos, setVideos }) => {
  const [documents, setDocuments] = useState([]);

  // Image Upload Handler
  const onDropImages = useCallback(
    (acceptedFiles) => {
      if (images.length + acceptedFiles.length > 20) return;
      setImages((prev) => [...prev, ...acceptedFiles]);
    },
    [images]
  );

  // Video Upload Handler
  const onDropVideos = useCallback(
    (acceptedFiles) => {
      if (videos.length + acceptedFiles.length > 20) return;
      setVideos((prev) => [...prev, ...acceptedFiles]);
    },
    [videos]
  );

  // Document Upload Handler
  const onDropDocuments = useCallback((acceptedFiles) => {
    setDocuments((prev) => [...prev, ...acceptedFiles]);
  }, []);

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

  const { getRootProps: getDocProps, getInputProps: getDocInput } = useDropzone(
    {
      onDrop: onDropDocuments,
      accept: '.pdf,.doc,.docx',
      multiple: false,
    }
  );

  return (
    <div className=" mx-auto bg-white mt-2 ">
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
      <p className="text-sm mt-2">{images.length} image(s) uploaded</p>

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
      <p className="text-sm mt-2">{videos.length} video(s) uploaded</p>

      {/* Document Upload
      <div
        {...getDocProps()}
        className="border-2 border-dashed p-6 text-center rounded-lg cursor-pointer mt-4"
      >
        <FaFileAlt className="text-4xl text-blue-500 mx-auto" />
        <p>Drag and drop a PDF or Word document</p>
        <input {...getDocInput()} />
      </div>
      <p className="text-sm mt-2">{documents.length} document(s) uploaded</p> */}

      {/* Next Button */}
      <button className=" primary-btn w-full mt-6">Next</button>
    </div>
  );
};

export default MediaUpload;
