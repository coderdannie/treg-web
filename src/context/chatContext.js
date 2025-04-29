import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useGetSingleChat, useGetSingleCharts } from '../services/query/chat';
import { io } from 'socket.io-client';

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
  const [message, setMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState({});

  const user = JSON.parse(sessionStorage.getItem('user'));
  const token = user?.accessToken;

  const socketRef = useRef(null);

  const receiverId = currentChat?.participants?._id;

  const { data: singleChat, isLoading: isChartLoading } = useGetSingleCharts(
    currentChat?.participants?._id,
    {
      enabled: !!currentChat?.participants?._id,
      refetchOnWindowFocus: true,
    }
  );

  useEffect(() => {
    if (!singleChat?.data || !currentChat?.participants?._id) return;

    const chatId = currentChat?.participants?._id;
    const newMessages = singleChat?.data;
    const prevMessages = prevMessagesRef.current[chatId] || [];

    // Compare just the message IDs instead of full deep equality
    const newMessageIds = newMessages.map((m) => m.id).join(',');
    const prevMessageIds = prevMessages.map((m) => m.id).join(',');

    if (newMessageIds !== prevMessageIds) {
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
    const userId =
      message.senderId || message.userId || message.from || uuidv4();
    if (!userId) {
      console.error('Missing user ID in message:', message);
      return;
    }

    console.log('message', message);

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

  useEffect(() => {
    if (!token) return;

    socketRef.current = io('https://treg.onrender.com', {
      auth: { token: token },
      transports: ['websocket'],
      reconnectionAttempts: 5,
    });

    // Connection event handlers
    socketRef.current.on('connect', () => {
      console.log('Connected with ID:', socketRef.current.id);

      // Initialize the user connection
      socketRef.current.emit('initialize', { userId: user.id }, (response) => {
        console.log('Initialize response:', response);
        // Update current user's online status
        setOnlineUsers((prev) => ({
          ...prev,
          [user.id]: true,
        }));
      });
    });

    // New message event
    socketRef.current.on('newMessage', (newMessage) => {
      console.log('New message received:', newMessage);
      addIncomingMessage(newMessage);
    });

    // User status change event
    socketRef.current.on('userStatusChange', ({ userId, isOnline }) => {
      console.log(`User ${userId} is now ${isOnline ? 'online' : 'offline'}`);
      setOnlineUsers((prev) => ({
        ...prev,
        [userId]: isOnline,
      }));

      // Update chat list with online status
      setChatList((prev) =>
        prev.map((chat) => {
          if (chat.participants?._id === userId) {
            return { ...chat, isOnline };
          }
          return chat;
        })
      );

      // Update current chat if it's the active user
      if (currentChat?.participants?._id === userId) {
        setCurrentChat((prev) => ({ ...prev, isOnline }));
      }
    });

    socketRef.current.on('disconnect', (reason) => {
      console.log('Disconnected. Reason:', reason);
      // Mark current user as offline
      setOnlineUsers((prev) => ({
        ...prev,
        [user.id]: false,
      }));
    });

    socketRef.current.on('connect_error', (err) => {
      console.error('Connection error:', err.message);
    });

    return () => {
      if (socketRef.current) {
        // Mark current user as offline when disconnecting
        setOnlineUsers((prev) => ({
          ...prev,
          [user.id]: false,
        }));
        socketRef.current.disconnect();
      }
    };
  }, [token, user?.id, addIncomingMessage]);

  const threadId = '';

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (message.trim() && socketRef.current) {
      const messageData = {
        receiverId,
        threadId,
        content: message,
      };

      console.log('Sending message:', messageData);
      socketRef.current.emit('sendMessage', messageData);

      // Optimistic update
      sendMessage(message);
      setMessage('');
    }
  };

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
        message,
        setMessage,
        handleSendMessage,
        onlineUsers,
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
