import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoTour from '../../components/data/web/Properties/virtualTabs/VideoTour';
import PhotoGallery from '../../components/data/web/Properties/virtualTabs/PhotoTour';

const VirtualTour = ({ data }) => {
  const [tab, setTab] = useState('Photo Tour');

  return (
    <div>
      <ul className="flex text-[#616161] mb-2 font-medium py-2 gap-4">
        {['Photo Tour', 'Video Tour'].map((item, i) => (
          <li
            key={i}
            className={` pb-1 cursor-pointer ${
              tab === item && 'border-b-4  border-[#616161] '
            }`}
            onClick={() => setTab(item)}
          >
            {item}
          </li>
        ))}
      </ul>
      {tab.includes('Photo') ? (
        <PhotoGallery data={data?.data} />
      ) : (
        <VideoTour data={data?.data} />
      )}
    </div>
  );
};
export default VirtualTour;
