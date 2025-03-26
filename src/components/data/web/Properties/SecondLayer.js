import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaCalendarAlt } from 'react-icons/fa';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';
import {
  FaWifi,
  FaParking,
  FaShieldAlt,
  FaSwimmingPool,
  FaSnowflake,
  FaCouch,
} from 'react-icons/fa';
import { MdOtherHouses } from 'react-icons/md';
import Form from './Form';
import { Link } from 'react-router-dom';
import PropertyCard from '../../../common/PropertyCard';
import { useGetAllPublicProperties } from '../../../../services/query/properties';
import EscrowModal from '../../../modals/EscrowModal';
import AuthModal from '../../../modals/AuthModal';

const SecondLayer = ({ data }) => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [selectedDates, setSelectedDates] = useState([]);
  const [availableWeeks, setAvailableWeeks] = useState([]);
  useEffect(() => {
    if (data) {
      setAvailableWeeks(
        JSON.parse(data?.agentId?.supportingDocument?.daysAvailable)
      );
    }
  }, []);

  console.log(data?.agentId?.daysAvailable);
  const maxDates = 3;

  const [isShow, setIsShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { data: properties } = useGetAllPublicProperties();

  const isLandlordOrAgent = useMemo(() => {
    return (
      user &&
      (user?.data?.userType === 'Landlord' || user?.data?.userType === 'Agent')
    );
  }, [user]);

  // Disable scrolling when modal is open
  useEffect(() => {
    if (isShow) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isShow]);

  const handleDateSelection = (date) => {
    if (selectedDates.includes(date)) {
      setSelectedDates(selectedDates.filter((d) => d !== date));
    } else if (selectedDates.length < maxDates) {
      setSelectedDates([...selectedDates, date]);
    }
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case 'Wi-Fi':
        return <FaWifi className="w-5 h-5 text-gray-600" />;
      case 'Parking Space':
        return <FaParking className="w-5 h-5 text-gray-600" />;
      case 'Security':
        return <FaShieldAlt className="w-5 h-5 text-gray-600" />;
      case 'Swimming Pool':
        return <FaSwimmingPool className="w-5 h-5 text-gray-600" />;
      case 'Air Conditioning':
        return <FaSnowflake className="w-5 h-5 text-gray-600" />;
      case 'Fully Furnished':
        return <FaCouch className="w-5 h-5 text-gray-600" />;
      default:
        return <MdOtherHouses className="w-5 h-5 text-gray-600" />; // Generic icon for custom amenities
    }
  };

  return (
    <div className="my-[44px]">
      <div className="flex flex-col min-991:flex-row gap-8">
        <div className="text-[#616161] min-991:w-[60%] ">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="text-lg capitalize  sm:text-xl md:text-2xl font-medium  text-[#363636] ">
              {data?.title}
            </h4>
            <div>
              <p className="text-xl md:text-2xl font-semibold text-[#101828]">
                ₦
                {data
                  ? Number(data?.rentPrice?.$numberDecimal).toLocaleString(
                      undefined,
                      {
                        minimumFractionDigits: 2,
                      }
                    )
                  : '0.00'}
              </p>
              <span className="text-center text-sm block">
                {data?.rentalPeriod}
              </span>
            </div>
          </div>

          <p className=" font-medium text-sm md:text-base capitalize text-[#616161] mt-2 sm:mt-0">
            Location: <span className="md:text-lg">{data?.location}</span>
          </p>
          <p className="text-[#6A6A6A] pt-4 text-sm md:text-base">
            {data?.description}
          </p>
          <div className="py-6">
            {/* Property Facilities Section */}
            <div className="mb-4">
              <h4 className="text-lg font-medium text-[#101828]">Facilities</h4>
              <ul className="flex flex-wrap gap-2">
                {data?.amenities?.map((facility, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 rounded-md"
                  >
                    {getAmenityIcon(facility)} {facility}
                  </li>
                ))}
              </ul>
            </div>

            {/* Map Section */}
            <div className="mb-4">
              <h4 className="text-lg font-medium text-[#101828]">Location</h4>
              <MapContainer
                center={[43.65107, -79.347015]}
                zoom={13}
                className="h-64 w-full rounded-md !z-0"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />
                <Marker
                  position={[43.65107, -79.347015]}
                  icon={
                    new Icon({
                      iconUrl: markerIconPng,
                      iconSize: [25, 41],
                      iconAnchor: [12, 41],
                    })
                  }
                >
                  <Popup>Property Location</Popup>
                </Marker>
              </MapContainer>
            </div>

            {/* Request a Tour Section */}
          </div>
        </div>
        <div className=" min-991:w-[40%] w-full mt-7 ">
          <Form
            workingHours={data?.agentId?.supportingDocument?.workingHours}
          />
          {!isLandlordOrAgent && (
            <div className="border border-[#C8C8C8] mt-7 rounded-xl py-6 px-5">
              <p>Ready to secure this property?</p>
              <button
                className="primary-btn mt-4 w-full"
                onClick={() => {
                  if (user) {
                    setIsShow(true);
                  } else {
                    setIsOpen(true);
                  }
                }}
              >
                Proceed to Payment
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="flex flex-wrap  pt-[50px] items-center justify-between">
          <h3 className="text-lg  sm:text-xl md:text-2xl font-semibold text-[#18181B] ">
            Similar rent homes you may like
          </h3>
          <Link
            to="/properties/all"
            className="text-primary font-medium hover:underline"
          >
            See All
          </Link>
        </div>

        <div className="mx-auto pt-5 ">
          <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {properties?.data?.slice(0, 4).map((property) => (
              <PropertyCard property={property} />
            ))}
          </div>
        </div>
      </div>
      <EscrowModal
        isOpen={isShow}
        onClose={() => setIsShow(false)}
        data={data}
      />
      <AuthModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};
export default SecondLayer;
