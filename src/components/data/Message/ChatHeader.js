import React from 'react';
import { FaUserCircle, FaArrowLeft } from 'react-icons/fa';
import { useChat } from '../../../context/chatContext';

export const ChatHeader = ({ onBackClick }) => {
  const { currentChat } = useChat();

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
        <FaUserCircle className="w-10 h-10 text-gray-400 mr-3" />
        <div>
          <div className="font-semibold">{currentChat.name}</div>
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
