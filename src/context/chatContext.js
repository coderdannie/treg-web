import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useGetSingleCharts, useGetSingleChat } from '../services/query/chat';
import isEqual from 'lodash.isequal';

export const ChatContext = createContext({
  conversations: {},
  chatList: [],
  isInitialState: true,
  currentChat: undefined,
  selectChat: () => {},
  addNewChat: () => {},
  sendMessage: () => {},
  setIsInitialState: () => {},
  updateMessageStatus: () => {},
});

export const ChatProvider = ({ children }) => {
  const [users] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [chatList, setChatList] = useState([]);
  const [conversations, setConversations] = useState({});
  const [isInitialState, setIsInitialState] = useState(true);
  const prevMessagesRef = useRef({});
  // const {
  //   data: singleChat,
  //   isLoading: isChartLoading,
  //   refetch,
  // } = useGetSingleCharts(currentChat?.participants?._id);
  const {
    mutate,
    data: singleChat,
    isLoading: isChartLoading,
  } = useGetSingleChat();
  // Update conversations when singleChat data changes
  useEffect(() => {
    if (currentChat?.participants?._id) {
      mutate({
        id: currentChat?.participants?._id,
      });
    }
  }, [singleChat, mutate, currentChat?.participants?._id]);

  useEffect(() => {
    if (!singleChat?.data || !currentChat?.participants?._id) return;

    const chatId = currentChat?.participants?._id;
    const newMessages = singleChat?.data;
    const prevMessages = prevMessagesRef.current[chatId] || [];

    // Only update if messages have changed
    if (!isEqual(prevMessages, newMessages)) {
      prevMessagesRef.current[chatId] = newMessages;
      setConversations((prev) => ({
        ...prev,
        [chatId]: newMessages,
      }));
    }
  }, [singleChat?.data, currentChat?.participants?._id]);

  const selectChat = useCallback((user) => {
    setCurrentChat(user);
    setIsInitialState(false);

    // Mark all received messages as read when selecting a chat
    setConversations((prev) => {
      const userConversation = prev[user.id] || [];
      const updatedConversation = userConversation.map((message) => {
        if (message.type === 'received' && message.status !== 'read') {
          return { ...message, status: 'read' };
        }
        return message;
      });

      return {
        ...prev,
        [user.id]: updatedConversation,
      };
    });
  }, []);

  const addNewChat = useCallback((user) => {
    setChatList((prev) => {
      if (!prev.some((existingUser) => existingUser.id === user.id)) {
        return [...prev, user];
      }
      return prev;
    });

    setConversations((prev) => {
      if (!prev[user.id]) {
        return {
          ...prev,
          [user.id]: [],
        };
      }
      return prev;
    });
  }, []);

  const updateMessageStatus = useCallback((userId, messageId, status) => {
    setConversations((prev) => {
      const userConversation = prev[userId] || [];
      const updatedConversation = userConversation.map((message) => {
        if (message.id === messageId) {
          return { ...message, status };
        }
        return message;
      });

      return {
        ...prev,
        [userId]: updatedConversation,
      };
    });
  }, []);

  const sendMessage = useCallback(
    (content) => {
      if (!currentChat || !content.trim()) return;
      const messageId = uuidv4();
      const newMessage = {
        id: messageId,
        userId: currentChat?.participants?._id,
        content: content.trim(),
        timestamp: new Date(),
        type: 'sent',
        status: 'sent',
      };

      setConversations((prev) => ({
        ...prev,
        [currentChat?.participants?._id]: [
          ...(prev[currentChat?.participants?._id] || []),
          newMessage,
        ],
      }));

      // Simulate message delivery if user is online
      if (currentChat.isOnline) {
        setTimeout(() => {
          updateMessageStatus(
            currentChat?.participants?._id,
            messageId,
            'delivered'
          );

          // Simulate message being read after some time
          setTimeout(() => {
            updateMessageStatus(
              currentChat?.participants?._id,
              messageId,
              'read'
            );
          }, 3000);
        }, 1000);
      }
    },
    [currentChat, updateMessageStatus]
  );

  const addIncomingMessage = useCallback((message) => {
    if (!message) return;

    // Extract user ID from various possible sources
    const userId = message.senderId || message.userId || message.from;
    if (!userId) {
      console.error('Missing user ID in message:', message);
      return;
    }

    // Normalize the message format to match what your UI expects
    const normalizedMessage = {
      id: message.id || uuidv4(),
      userId,
      content: message.content || message.text || message.message,
      type: 'received',
      status: 'unread',
      // Add both timestamp formats for compatibility
      timestamp: message.timestamp || message.createdAt || new Date(),
      createdAt: message.timestamp || message.createdAt || new Date(),
      updatedAt:
        message.updatedAt ||
        message.timestamp ||
        message.createdAt ||
        new Date(),
    };

    setConversations((prev) => ({
      ...prev,
      [userId]: [...(prev[userId] || []), normalizedMessage],
    }));
  }, []);

  return (
    <ChatContext.Provider
      value={{
        // users,
        currentChat,
        conversations,
        chatList,
        isInitialState,
        isChartLoading,
        selectChat,
        addNewChat,
        sendMessage,
        setIsInitialState,
        updateMessageStatus,
        addIncomingMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
