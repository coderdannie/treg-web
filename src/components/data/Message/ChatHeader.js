import React from 'react';
import { FaUserCircle, FaArrowLeft } from 'react-icons/fa';
import { useChat } from '../../../context/chatContext';

export const ChatHeader = ({ onBackClick }) => {
  const { currentChat } = useChat();

  console.log('dkdkd', currentChat);
  if (!currentChat) return null;

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
        {/* User avatar placeholder */}
        {currentChat?.participants?.avatar ? (
          <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex-shrink-0">
            {/* Avatar content */}
            <img
              src={currentChat?.participants?.avatar}
              alt={currentChat?.participants?.firstName}
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        ) : (
          <FaUserCircle className="w-10 h-10 text-gray-400 mr-3" />
        )}

        <div>
          <div className="font-semibold">
            {currentChat?.participants?.lastName}{' '}
            {currentChat?.participants?.firstName}
          </div>
          <div className="flex items-center">
            <div
              className={`w-2 h-2 ${
                currentChat.isOnline ? 'bg-green-500' : 'bg-red-500'
              } rounded-full mr-2`}
            ></div>
            <span className="text-sm text-gray-500">
              {currentChat.isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
