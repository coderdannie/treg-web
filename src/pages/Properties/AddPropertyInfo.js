import { useState } from 'react';

import FormStepOne from '../../components/data/Properties/FormStepOne';
import MediaUpload from '../../components/data/Properties/FormStepTwo';

const AddPropertyInfo = () => {
  const [step, setStep] = useState(1);

  const [values, setValues] = useState({
    title: '',
    type: '',
    description: '',
    noOfRooms: '',
    location: '',
    amount: '',
  });
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState({});
  const [customAmenities, setCustomAmenities] = useState('');
  console.log(images);

  return (
    <div
      style={{
        fontFamily: 'sansation',
      }}
      className=" max-w-[666px] bg-white rounded-lg mt-[30px] mx-auto py-10 px-8 md:px-14 border border-[#F5F5F5]"
    >
      <h2 className="text-center text-lg md:text-xl text-black">
        {step === 1 ? 'Property Information Form' : 'Media Upload'}
      </h2>
      {step === 1 ? (
        <FormStepOne
          values={values}
          setValues={setValues}
          customAmenities={customAmenities}
          setCustomAmenities={setCustomAmenities}
          setSelectedAmenities={setSelectedAmenities}
          selectedAmenities={selectedAmenities}
          setStep={setStep}
        />
      ) : (
        <MediaUpload
          images={images}
          setImages={setImages}
          videos={videos}
          setVideos={setVideos}
        />
      )}
    </div>
  );
};
export default AddPropertyInfo;
