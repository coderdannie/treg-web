import React from 'react';

const PropertyDetailsDrawer = ({ isOpen, onClose, propertyDetails }) => {
  if (!isOpen) return null;

  const cutShortDescription = (description, maxLength) => {
    if (!description) return 'N/A';
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  return (
    <div className="drawer drawer-end z-50">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
      />
      <div className="drawer-content">
        {/* Empty drawer content, we'll use the side drawer */}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          className="drawer-overlay"
          onClick={onClose}
        ></label>
        <ul className="menu p-6 w-96 min-h-full bg-white text-base-content shadow-lg">
          {/* Close Icon */}
          <div className="flex justify-end">
            <button
              className="btn btn-sm btn-circle btn-ghost"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          {/* Title */}
          <div>
            <h2 className="text-xl font-semibold text-[#101828]">
              Property Details
            </h2>
            <div className="divider mt-2"></div>
          </div>

          {/* Property Details */}
          <li className="hover:bg-transparent">
            <div className="mb-2">
              <strong>Property Name:</strong>{' '}
              {propertyDetails?.propertyId?.title || 'N/A'}
            </div>
          </li>
          <li className="hover:bg-transparent">
            <div className="mb-2">
              <strong>Address:</strong>{' '}
              {propertyDetails?.propertyId?.location || 'N/A'}
            </div>
          </li>
          <li className="hover:bg-transparent">
            <div className="mb-2">
              <strong>Type:</strong>{' '}
              {propertyDetails?.propertyId?.type || 'N/A'}
            </div>
          </li>
          <li className="hover:bg-transparent">
            <div className="mb-2">
              <strong>Description:</strong>{' '}
              {cutShortDescription(
                propertyDetails?.propertyId?.description,
                100
              )}
            </div>
          </li>
          <li className="hover:bg-transparent">
            <div className="mb-2">
              <strong>Monthly Rent:</strong> ₦
              {propertyDetails?.propertyId?.pricePerYear?.$numberDecimal
                ? Number(
                    propertyDetails.propertyId.pricePerYear.$numberDecimal
                  ).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })
                : '0.00'}
            </div>
          </li>
          <li className="hover:bg-transparent">
            <div className="mb-2">
              <strong>Lease Period:</strong> {'N/A'}
              {/* Add lease period logic here if available */}
            </div>
          </li>
          <li className="hover:bg-transparent">
            <div className="mb-2">
              <strong>Landlord/Agent Name:</strong>{' '}
              {propertyDetails?.agentId
                ? `${propertyDetails.agentId.firstName} ${propertyDetails.agentId.lastName}`
                : 'N/A'}
            </div>
          </li>
          <li className="hover:bg-transparent">
            <div className="mb-2">
              <strong>Property ID:</strong>{' '}
              {propertyDetails?.propertyId?._id || 'N/A'}
            </div>
          </li>
          <li className="hover:bg-transparent">
            <div className="mb-2">
              <strong>Tenant ID:</strong> {propertyDetails?.tenantId || 'N/A'}
            </div>
          </li>
          <li className="hover:bg-transparent">
            <div className="mb-2">
              <strong>Agent ID:</strong>{' '}
              {propertyDetails?.agentId?._id || 'N/A'}
            </div>
          </li>
          <li className="hover:bg-transparent">
            <div className="mb-2">
              <strong>Phone Number:</strong>{' '}
              {propertyDetails?.agentId?.phone || 'N/A'}
            </div>
          </li>
          <li className="hover:bg-transparent">
            <div className="mb-2">
              <strong>Email:</strong> {propertyDetails?.agentId?.email || 'N/A'}
            </div>
          </li>
          <li className="hover:bg-transparent">
            <div className="mb-2">
              <strong>Status:</strong> {propertyDetails?.status || 'N/A'}
            </div>
          </li>
          <li className="hover:bg-transparent">
            <div className="mb-2">
              <strong>Created At:</strong>{' '}
              {new Date(propertyDetails?.createdAt).toLocaleString() || 'N/A'}
            </div>
          </li>
          <li className="hover:bg-transparent">
            <div className="mb-2">
              <strong>Updated At:</strong>{' '}
              {new Date(propertyDetails?.updatedAt).toLocaleString() || 'N/A'}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PropertyDetailsDrawer;
