import React, { useState } from 'react';

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

const SecondLayer = ({ data }) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const maxDates = 3;
  const availableDates = [
    'Thursday - Nov 4',
    'Friday - Nov 5',
    'Saturday - Nov 6',
    'Sunday - Nov 7',
  ];
  const { data: properties } = useGetAllPublicProperties();

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
          <h4 className="text-lg  sm:text-xl md:text-2xl font-medium  text-[#363636] ">
            {data?.title}
          </h4>
          <p className=" md:text-lg text-[#616161]">{data?.location}</p>
          <p className="text-[#6A6A6A] pt-4 text-sm md:text-base">
            {/* Welcome to your potential new home. This lovely, single-story home
            showcases an open floor plan with luxury vinyl plank flooring and a
            great room that features volume ceilings. Enjoy the convenience of a
            dedicated laundry room with direct garage access. The modern kitchen
            boasts an island, 36-in. upper cabinets, Silestone countertops in
            Blanco Maple, a Moen chrome faucet, a Kohler stainless steel sink
            and Whirlpool stainless steel appliances. Relax in the primary
            suite, which features a tray ceiling, walk-in closet and connecting
            bath that offers a dual-sink vanity, linen closet and walk-in shower
            with tile surround. Enjoy the outdoors on the covered back patio.
            See sales counselor for approximate timing required for move-in
            ready homes. */}
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
                className="h-64 w-full rounded-md"
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
            <div className="mt-4">
              <h2 className="text-lg font-semibold  text-[#101828]">
                Request a tour
              </h2>
              <p className="text-sm">
                Start by selecting a date, you can select up to 3 dates
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {availableDates.map((date) => (
                  <button
                    key={date}
                    className={`btn ${
                      selectedDates.includes(date)
                        ? 'btn-primary'
                        : 'bg-[#E7F2FF] text-primary'
                    }`}
                    onClick={() => handleDateSelection(date)}
                  >
                    <FaCalendarAlt className="mr-2" /> {date}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className=" min-991:w-[40%] w-full ">
          <Form />
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
    </div>
  );
};
export default SecondLayer;
