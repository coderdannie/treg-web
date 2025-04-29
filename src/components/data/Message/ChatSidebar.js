import React, { useEffect, useState } from 'react';
import { useChat } from '../../../context/chatContext';
import { FaPlus, FaSearch, FaCheck, FaUserCircle } from 'react-icons/fa';
import { AddNewChatModal } from '../../modals/AddNewChatModal';
import { FaMessage } from 'react-icons/fa6';
import { useGetAllCharts, useInitiateChat } from '../../../services/query/chat';
import toast from 'react-hot-toast';
import ChatSidebarSkeleton from '../../Loaders/ChatSidebarSkeleton';
import { useParams } from 'react-router-dom';

export const ChatSidebar = ({ onChatSelect }) => {
  const { data, isLoading: isLoadingCharts } = useGetAllCharts();
  const { tenantId } = useParams();

  const errorToast = (message) => toast.error(message, { duration: 3000 });
  const successToast = (message) => toast.success(message, { duration: 3000 });

  const {
    currentChat,
    selectChat,
    conversations,
    onlineUsers,
    chatList,
    addNewChat,
  } = useChat();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChatSelect = (user) => {
    selectChat(user);
    if (onChatSelect) onChatSelect();
  };

  const { mutate, isLoading } = useInitiateChat({
    onSuccess: (res) => {
      successToast(res?.message);
      // Add the new chat to our context
      if (res?.data) {
        addNewChat(res.data);
      }
    },
    onError: (res) => {
      errorToast(
        res?.response?.data?.message || res?.message || 'An Error Occurred'
      );
    },
  });

  const id = sessionStorage.getItem('participantId');

  useEffect(() => {
    if (tenantId) {
      mutate({ participantId: tenantId });
    } else if (id) {
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
    const lastName = item?.participants?.lastName || '';
    return `${firstName} ${lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

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

          <button onClick={() => setIsModalOpen(true)} className="primary-btn">
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
          className="flex items-center gap-1 text-primary hover:text-primary-dark"
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
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
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
          const lastMessage =
            conversations[user?.participants?._id] &&
            conversations[user?.participants?._id].length > 0
              ? conversations[user?.participants?._id][
                  conversations[user?.participants?._id].length - 1
                ]
              : null;

          const isSelected =
            currentChat?.participants?._id === user?.participants?._id;

          const isOnline = onlineUsers[user?.participants?._id];
          const unreadCount =
            conversations[user?.participants?._id]?.filter(
              (msg) => msg.type === 'received' && msg.status === 'unread'
            ).length || 0;

          return (
            <div
              key={user.id}
              onClick={() => handleChatSelect(user)}
              className={`flex items-center rounded-lg p-4 cursor-pointer mb-1 mx-2 transition-colors ${
                isSelected ? 'bg-primary text-white' : 'hover:bg-gray-100 '
              }`}
            >
              <div className="relative flex-shrink-0">
                {user?.participants?.avatar ? (
                  <img
                    src={user?.participants?.avatar}
                    alt={user?.participants?.firstName}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                ) : (
                  <FaUserCircle className="w-10 h-10 text-gray-400 mr-3" />
                )}
                {isOnline ? (
                  <div className="absolute bottom-0 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white "></div>
                ) : (
                  <div className="absolute bottom-0 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white "></div>
                )}
              </div>

              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3
                    className={`font-medium truncate ${
                      isSelected ? 'text-white' : 'text-gray-900 '
                    }`}
                  >
                    {user?.participants?.firstName}{' '}
                    {user?.participants?.lastName}
                  </h3>
                  {lastMessage && (
                    <span
                      className={`text-xs ml-2 whitespace-nowrap ${
                        isSelected ? 'text-white/80' : 'text-gray-500'
                      }`}
                    >
                      {new Date(
                        lastMessage.timestamp || lastMessage.createdAt
                      ).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <p
                    className={`text-sm truncate ${
                      isSelected ? 'text-white/80' : 'text-gray-500'
                    }`}
                  >
                    {lastMessage
                      ? lastMessage.content.length > 24
                        ? lastMessage.content.substring(0, 24) + '...'
                        : lastMessage.content
                      : 'No messages yet'}
                  </p>
                  {unreadCount > 0 && !isSelected && (
                    <span className="ml-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </div>
              </div>

              {lastMessage?.type === 'sent' && (
                <div className="ml-2 flex-shrink-0">
                  {lastMessage.status === 'sent' && !isOnline && (
                    <FaCheck className="text-blue-500" size={14} />
                  )}
                  {(lastMessage.status === 'delivered' ||
                    (lastMessage.status === 'sent' && isOnline)) && (
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
