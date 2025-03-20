import { useState } from 'react';
import toast from 'react-hot-toast';
import MediaUpload from '../../components/data/Properties/MediaUpload';
import {
  useCompleteListing,
  useUploadPropertyPhotos,
  useUploadPropertyVideos,
} from '../../services/query/properties';
import { useListingPayment } from '../../services/query/payments';

const PropertyUploads = () => {
  const errorToast = (message) => toast.error(message, { duration: 3000 });
  const successToast = (message) => toast.success(message, { duration: 3000 });

  const propertyDetails = JSON.parse(sessionStorage.getItem('propertyDetails'));

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  console.log(videos);

  const { mutate: mutatePhotosUpload, isLoading } = useUploadPropertyPhotos({
    onSuccess: (res) => {
      successToast(res?.message);
    },
    onError: (res) => {
      errorToast(
        res?.response?.data?.message || res?.message || 'An Error Occurred'
      );
    },
  });

  const { mutate: mutateCompleteListing, isLoading: isListing } =
    useCompleteListing({
      onSuccess: (res) => {
        successToast(res?.message);
        mutatePayment({
          amount: Number(propertyDetails?.data?.pricePerYear?.$numberDecimal),
          propertyId: propertyDetails?.data?._id,
        });
      },
      onError: (res) => {
        errorToast(
          res?.response?.data?.message || res?.message || 'An Error Occurred'
        );
      },
    });

  const { mutate, isLoading: isUploading } = useUploadPropertyVideos({
    onSuccess: (res) => {
      successToast(res?.message);
    },
    onError: (res) => {
      errorToast(
        res?.response?.data?.message || res?.message || 'An Error Occurred'
      );
    },
  });

  const { mutate: mutatePayment, isLoading: isInitializing } =
    useListingPayment({
      onSuccess: (res) => {
        successToast(res?.message);

        const authUrl = res?.data?.data?.authorization_url;
        localStorage.setItem('paymentType', 'house-listing');
        if (authUrl?.startsWith('http://') || authUrl?.startsWith('https://')) {
          window.location.replace(authUrl); // Redirects user immediately
        } else {
          errorToast('Invalid authorization URL received.');
        }
      },
      onError: (res) => {
        errorToast(
          res?.response?.data?.message || res?.message || 'An Error Occurred'
        );
      },
    });

  return (
    <div
      style={{
        fontFamily: 'sansation',
      }}
      className=" max-w-[666px] bg-white rounded-lg mt-[30px] mx-auto py-10 px-8 md:px-14 border border-[#F5F5F5]"
    >
      <h2 className="text-center text-lg md:text-xl text-black">
        Media Upload
      </h2>
      <MediaUpload
        images={images}
        setImages={setImages}
        videos={videos}
        setVideos={setVideos}
        mutatePhotosUpload={mutatePhotosUpload}
        mutate={mutate}
        propertyId={propertyDetails?.data?._id}
        isLoading={isLoading}
        isUploading={isUploading}
      />
      <button
        className={`primary-btn mt-7 w-full ${
          !images.length || !videos.length || isUploading || isLoading
            ? '!bg-gray-300 !border-0 hover:text-white cursor-not-allowed'
            : 'bg-primary'
        }`}
        disabled={!images.length || !videos.length || isUploading || isLoading}
        onClick={() =>
          mutateCompleteListing({
            id: propertyDetails?.data?._id,
          })
        }
      >
        {isListing || isInitializing ? (
          <span className="loading loading-dots loading-xs"></span>
        ) : (
          'Next'
        )}
      </button>
    </div>
  );
};
export default PropertyUploads;
