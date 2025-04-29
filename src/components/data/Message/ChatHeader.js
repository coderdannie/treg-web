import React from 'react';
import { FaUserCircle, FaArrowLeft } from 'react-icons/fa';
import { useChat } from '../../../context/chatContext';

export const ChatHeader = ({ onBackClick }) => {
  const { currentChat, onlineUsers } = useChat();

  if (!currentChat) return null;

  // Get the online status from the context
  const userId = currentChat?.participants?._id;
  const isOnline = onlineUsers[userId];
  const statusText = isOnline ? 'Online' : 'Offline';
  const statusColor = isOnline ? 'bg-green-500' : 'bg-gray-400';

  return (
    <div className="bg-white border-b p-4 flex items-center w-full">
      {onBackClick && (
        <button
          onClick={onBackClick}
          className="mr-3 text-gray-600 hover:text-gray-800"
          aria-label="Back to chat list"
        >
          <FaArrowLeft />
        </button>
      )}

      <div className="flex items-center">
        {/* User avatar with online status indicator */}
        <div className="relative">
          {currentChat?.participants?.avatar ? (
            <img
              src={currentChat?.participants?.avatar}
              alt={currentChat?.participants?.firstName}
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
          ) : (
            <FaUserCircle className="w-10 h-10 text-gray-400 mr-3" />
          )}
          {/* Online status dot */}
          <div
            className={`absolute bottom-0 right-3 w-3 h-3 ${statusColor} rounded-full border-2 border-white`}
          ></div>
        </div>

        <div>
          <div className="font-semibold">
            {currentChat?.participants?.lastName}{' '}
            {currentChat?.participants?.firstName}
          </div>
          <div className="flex items-center">
            <span
              className={`text-sm ${
                isOnline ? 'text-green-600' : 'text-gray-500'
              }`}
            >
              {statusText}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
