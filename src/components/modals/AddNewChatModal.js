import React, { useState, useEffect } from 'react';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { useChat } from '../../context/chatContext';
import { useInitiateChat } from '../../services/query/chat';
import toast from 'react-hot-toast';
import { useGetAllAgents } from '../../services/query/agents';

export const AddNewChatModal = ({ isOpen, onClose, allChats }) => {
  const errorToast = (message) => toast.error(message, { duration: 3000 });
  const successToast = (message) => toast.success(message, { duration: 3000 });

  const { data: agents, isLoading: isLoadingAgents } = useGetAllAgents();
  const { users, addNewChat } = useChat();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const filteredChatUsers = agents?.data?.filter((item) => {
    const firstName = item?.firstName || '';
    return firstName.toLowerCase().includes(searchTerm.toLowerCase());
  });
  console.log(filteredChatUsers);
  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredUsers = agents?.data?.filter((item) => {
    const firstName = item?.firstName || '';
    return firstName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const { mutate, isLoading } = useInitiateChat({
    onSuccess: (res) => {
      successToast(res?.message);
      const chatId = allChats?.find(
        (chat) => chat?.participants._id === selectedUser.user_id
      );

      const newChat = {
        ...selectedUser,
        chat_id: res?.data?._id,
        user_id: res?.data[1],
        sender_id: res?.data[0],
        updated_at: res.data.updated_at,
      };
      addNewChat(newChat);
      onClose();
      setSelectedUser(null);
      setSearchTerm('');
    },
    onError: (res) => {
      errorToast(
        res?.response?.data?.message || res?.message || 'An Error Occurred'
      );
    },
  });
  const handleAddChat = () => {
    if (selectedUser) {
      mutate({ participantId: selectedUser?._id });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex ${
        isMobile ? 'items-end' : 'items-center justify-end'
      }`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className={`
          relative bg-white shadow-lg flex flex-col
          ${
            isMobile
              ? 'w-full h-5/6 rounded-t-lg'
              : 'w-80 h-full inset-y-0 right-0 border-l'
          }
        `}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add New Chat</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search user name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="mt-4 max-h-64 overflow-y-auto flex-grow">
            {filteredUsers?.map((user) => (
              <div
                key={user?._id}
                className={`flex items-center p-2 hover:bg-gray-100 cursor-pointer ${
                  selectedUser?.id === user._id ? 'bg-blue-50' : ''
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <img
                  src={user.avatar}
                  alt={user.firstName}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div className="flex-grow">
                  <div className="font-medium">
                    {user.firstName}
                    {user.lastName}
                  </div>
                  <div className="text-sm text-gray-500">{user.department}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 flex justify-between items-center mt-auto">
            <button
              onClick={onClose}
              className="px-8 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
            >
              Close
            </button>
            <button
              onClick={handleAddChat}
              disabled={!selectedUser}
              className={`px-8 py-2 rounded-md ${
                selectedUser
                  ? 'primary-btn'
                  : ' text-gray-500 cursor-not-allowed'
              }`}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
