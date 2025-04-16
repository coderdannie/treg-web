import { useEffect, useRef, useState } from 'react';
import { FaAt } from 'react-icons/fa';
import { useChat } from '../../../context/chatContext';
import { BsSendFill } from 'react-icons/bs';
import { io } from 'socket.io-client';

export const ChatInput = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const token = user?.accessToken;
  const { currentChat, sendMessage, addIncomingMessage } = useChat();
  const [message, setMessage] = useState('');
  const socketRef = useRef(null);

  const receiverId = currentChat?.participants?._id;

  useEffect(() => {
    if (!token) {
      console.log('No token available');
      return;
    }

    console.log('Initializing socket with token:', token);

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
      });
    });

    // Move newMessage event listener outside the connect handler
    socketRef.current.on('newMessage', (newMessage) => {
      console.log('New message received:', newMessage);
      // Update your chat state or context with the new message
      // This should trigger a re-render of your chat messages
      addIncomingMessage(newMessage);
    });

    socketRef.current.on('disconnect', (reason) => {
      console.log('Disconnected. Reason:', reason);
    });

    socketRef.current.on('connect_error', (err) => {
      console.error('Connection error:', err.message);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [token, user?.id, addIncomingMessage]);

  // If you need to join a room when the chat changes
  useEffect(() => {
    if (socketRef.current?.connected && currentChat?.participants?._id) {
      console.log('Attempting to join room:', currentChat.participants._id);
      socketRef.current.emit(
        'join',
        {
          roomId: currentChat.participants._id,
        },
        (ack) => {
          console.log('Join room acknowledgment:', ack);
        }
      );
    }
  }, [currentChat?.participants?._id]);

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

  if (!currentChat) return null;

  return (
    <form
      onSubmit={handleSendMessage}
      className="bg-white border-t p-2 sm:p-4 flex items-center w-full"
    >
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Send your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full pr-16 py-2 pl-3 sm:pl-4 focus:outline-none"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center">
          <FaAt className="text-gray-400 mr-2" />
          <button type="submit" className="primary-btn">
            <BsSendFill height={24} width={24} className="" />
          </button>
        </div>
      </div>
    </form>
  );
};
