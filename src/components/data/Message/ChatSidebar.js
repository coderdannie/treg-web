import React, { useEffect, useState } from 'react';
import { useChat } from '../../../context/chatContext';
import { FaPlus, FaSearch, FaCheck, FaUserCircle } from 'react-icons/fa';
import { AddNewChatModal } from '../../modals/AddNewChatModal';
import { FaMessage } from 'react-icons/fa6';
import { useGetAllCharts, useInitiateChat } from '../../../services/query/chat';
import toast from 'react-hot-toast';
import ChatSidebarSkeleton from '../../Loaders/ChatSidebarSkeleton';

export const ChatSidebar = ({ onChatSelect }) => {
  const { data, isLoading: isLoadingCharts } = useGetAllCharts();

  const errorToast = (message) => toast.error(message, { duration: 3000 });
  const successToast = (message) => toast.success(message, { duration: 3000 });
  const { currentChat, selectChat, conversations } = useChat();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChatSelect = (user) => {
    selectChat(user);
    if (onChatSelect) onChatSelect();
  };

  const { mutate, isLoading } = useInitiateChat({
    onSuccess: (res) => {
      successToast(res?.message);
    },
    onError: (res) => {
      errorToast(
        res?.response?.data?.message || res?.message || 'An Error Occurred'
      );
    },
  });

  const id = sessionStorage.getItem('participantId');

  useEffect(() => {
    if (id) {
      mutate({ participantId: id });
      sessionStorage.removeItem('participantId');
    }
  }, []);

  // Load the persisted chat from localStorage on mount
  useEffect(() => {
    const savedChat = localStorage.getItem('selectedChat');
    if (savedChat) {
      const parsedChat = JSON.parse(savedChat);
      selectChat(parsedChat);
    }
  }, [selectChat]);

  // Save the selected chat to localStorage whenever it changes
  useEffect(() => {
    if (currentChat) {
      localStorage.setItem('selectedChat', JSON.stringify(currentChat));
    }
  }, [currentChat]);

  const filteredChatUsers = data?.filter((item) => {
    const firstName = item?.participants?.firstName || '';
    return firstName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // console.log('Participants:', data);
  console.log(filteredChatUsers);

  if (isLoadingCharts || isLoading) {
    return <ChatSidebarSkeleton />;
  }

  if (data?.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="text-center space-y-4 px-4">
          <div className="mx-auto flex justify-center mb-4">
            <div>
              <FaMessage className="w-[35px] h-[35px] text-primary" />
            </div>
          </div>

          <div className="text-[#171717] font-semibold text-lg">
            No Messages Yet
          </div>
          <div className="text-sm text-gray-500 max-w-xs mx-auto">
            Start a conversation about properties, schedule viewings, or discuss
            deals with clients and agents
          </div>

          <button onClick={() => setIsModalOpen(true)} className=" primary-btn">
            <span className="mr-2">+</span> Start a conversation
          </button>
        </div>
        <AddNewChatModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Chats</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1"
        >
          <FaPlus />
          <h2>Add New</h2>
        </button>
      </div>

      {!isModalOpen && (
        <div className="p-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search user by First Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none"
            />
          </div>
        </div>
      )}

      <AddNewChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={data}
      />

      <div className="flex-grow overflow-y-auto">
        {filteredChatUsers?.map((user) => {
          // Get the last message for this user
          const lastMessage =
            conversations[user?.participants?._id] &&
            conversations[user?.participants?._id].length > 0
              ? conversations[user?.participants?._id][
                  conversations[user?.participants?._id].length - 1
                ]
              : null;

          const isSelected =
            currentChat?.participants?._id === user?.participants?._id;
          console.log('user', user);

          return (
            <div
              key={user.id}
              onClick={() => handleChatSelect(user)}
              className={`flex items-center rounded-lg p-4 cursor-pointer mb-1 mx-2 ${
                isSelected ? 'bg-primary text-white' : 'hover:bg-gray-100'
              }`}
            >
              {/* {isSelected && (
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#692E9F]"></div>
              )} */}

              {/* User avatar placeholder */}
              {user?.participants?.avatar ? (
                <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex-shrink-0">
                  {/* Avatar content */}
                  <img
                    src={user?.participants?.avatar}
                    alt={user?.participants?.firstName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
              ) : (
                <FaUserCircle className="w-10 h-10 text-gray-400 mr-3" />
              )}

              <div className="flex-grow">
                <div
                  className={`font-medium ${isSelected ? 'text-white' : ''}`}
                >
                  {user?.participants?.lastName}
                  {''} {user?.participants?.firstName}
                </div>
                <div
                  className={`text-sm truncate ${
                    isSelected ? 'text-white/80' : 'text-gray-500'
                  }`}
                >
                  {lastMessage
                    ? lastMessage.content.length > 24
                      ? lastMessage.content.substring(0, 24) + '...'
                      : lastMessage.content
                    : 'No messages yet'}
                </div>
              </div>
              <div className="flex flex-col items-end">
                {lastMessage && (
                  <span
                    className={`text-xs mb-1 ${
                      isSelected ? 'text-white/80' : 'text-gray-500'
                    }`}
                  >
                    {Math.floor(
                      (new Date().getTime() -
                        new Date(
                          lastMessage.timestamp ||
                            lastMessage.createdAt ||
                            new Date()
                        ).getTime()) /
                        60000
                    )}{' '}
                    m Ago
                  </span>
                )}

                {lastMessage && lastMessage.type === 'sent' && (
                  <div className="flex justify-end">
                    {lastMessage.status === 'sent' && !user.isOnline && (
                      <FaCheck className="text-blue-500" size={14} />
                    )}
                    {(lastMessage.status === 'delivered' ||
                      (lastMessage.status === 'sent' && user.isOnline)) && (
                      <div className="flex">
                        <FaCheck className="text-gray-400" size={14} />
                        <FaCheck className="text-gray-400 -ml-1" size={14} />
                      </div>
                    )}
                    {lastMessage.status === 'read' && (
                      <div className="flex">
                        <FaCheck className="text-blue-500" size={14} />
                        <FaCheck className="text-blue-500 -ml-1" size={14} />
                      </div>
                    )}
                  </div>
                )}

                {!isSelected && (
                  <div className="mt-1">
                    {user.isOnline ? (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    ) : (
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <AddNewChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        allChats={data}
      />
    </div>
  );
};
