import React, { useEffect, useMemo, useRef } from 'react';
import { format, isToday, isYesterday } from 'date-fns';
import { useChat } from '../../../context/chatContext';
import { FaCheck } from 'react-icons/fa';

export const ChatMessages = () => {
  const { currentChat, conversations, isChatLoading } = useChat();

  const bottomRef = useRef(null);

  // Get conversations for the current chat
  const currentChatConversations = useMemo(
    () => conversations[currentChat?.participants?._id] || [],
    [conversations, currentChat?.participants?._id]
  );

  console.log('ddf', currentChatConversations);
  // Group messages by date
  function groupMessagesByDate(currentChatConversations) {
    if (
      !Array.isArray(currentChatConversations) ||
      currentChatConversations.length === 0
    ) {
      return {};
    }

    const groups = {};

    currentChatConversations.forEach((message) => {
      // Check for either createdAt or timestamp
      const messageTimestamp = message.createdAt || message.timestamp;
      if (!messageTimestamp) return;

      const messageDate = new Date(messageTimestamp);
      if (isNaN(messageDate.getTime())) return; // Skip invalid dates

      const dateKey = isToday(messageDate)
        ? 'Today'
        : isYesterday(messageDate)
        ? 'Yesterday'
        : format(messageDate, 'MMMM d, yyyy');

      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(message);
    });

    return groups;
  }
  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [currentChatConversations, currentChat]);

  // If no chat is selected, show a placeholder
  if (!currentChat) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a chat to start messaging
      </div>
    );
  }

  // If messages are loading, show a loading indicator
  if (isChatLoading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Loading messages...
      </div>
    );
  }

  // If there are no messages, show a placeholder
  if (!currentChatConversations.length) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        No messages yet. Start the conversation!
      </div>
    );
  }

  return (
    <div className="flex-grow overflow-y-auto p-2 sm:p-4 space-y-2 sm:space-y-4">
      {Object.entries(groupMessagesByDate(currentChatConversations)).map(
        ([date, dayMessages]) => (
          <div key={date}>
            <div className="text-center text-[#FFFFFF] my-2 sm:my-4">
              <span className="bg-[#344054] px-3 py-[.5rem] rounded-[.8rem] text-xs sm:text-sm">
                {date}
              </span>
            </div>
            {dayMessages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col mb-2 sm:mb-4 ${
                  message.sender === currentChat?.participants?._id
                    ? 'items-start'
                    : 'items-end'
                }`}
              >
                <div
                  className={`
                  max-w-[75%] sm:max-w-xs p-2 sm:p-3 rounded-lg relative
                  ${
                    message.sender === currentChat?.participants?._id
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-black'
                  }
                `}
                >
                  {message.content}

                  {message.type === 'sent' && (
                    <div className="absolute bottom-1 right-2">
                      {message.status === 'sent' && !currentChat.isOnline && (
                        <FaCheck className="text-blue-500" size={10} />
                      )}
                      {(message.status === 'delivered' ||
                        (message.status === 'sent' &&
                          currentChat.isOnline)) && (
                        <div className="flex">
                          <FaCheck className="text-gray-400" size={10} />
                          <FaCheck className="text-gray-400 -ml-1" size={10} />
                        </div>
                      )}
                      {message.read && (
                        <div className="flex">
                          <FaCheck className="text-blue-500" size={10} />
                          <FaCheck className="text-blue-500 -ml-1" size={10} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {isToday(
                    new Date(
                      message.updatedAt ||
                        message.timestamp ||
                        message.createdAt
                    )
                  )
                    ? `Today ${format(
                        new Date(
                          message.updatedAt ||
                            message.timestamp ||
                            message.createdAt
                        ),
                        'HH:mm'
                      )}`
                    : format(
                        new Date(
                          message.updatedAt ||
                            message.timestamp ||
                            message.createdAt
                        ),
                        'p'
                      )}
                </span>
              </div>
            ))}
          </div>
        )
      )}{' '}
    </div>
  );
};
