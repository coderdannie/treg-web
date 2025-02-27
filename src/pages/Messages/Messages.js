import { useState } from 'react';
import {
  FaPaperPlane,
  FaMicrophone,
  FaPaperclip,
  FaComments,
  FaCircle,
  FaPhone,
  FaArrowLeft,
} from 'react-icons/fa';

// Mock data
const chatContacts = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/40',
    lastMessage: "Hey! What's up?",
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/41',
    lastMessage: 'See you soon!',
  },
];

const messagesData = {
  1: [
    { id: 1, sender: 'user', text: 'Hello! How are you?' },
    { id: 2, sender: 'other', text: "I'm good! How about you?" },
  ],
  2: [
    { id: 1, sender: 'user', text: 'Hey Jane, long time!' },
    { id: 2, sender: 'other', text: "Yes! It's been a while!" },
  ],
};

const ChatApp = () => {
  const [activeUser, setActiveUser] = useState(null); // No active user by default
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Handle switching between users
  const handleUserClick = (user) => {
    setActiveUser(user);
    setMessages(messagesData[user.id]);
  };

  // Send message logic
  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message = {
      id: messages.length + 1,
      sender: 'user',
      text: newMessage,
    };
    setMessages([...messages, message]);
    setNewMessage('');
  };

  // Back to chat list
  const handleBack = () => {
    setActiveUser(null);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar (Visible Only on Desktop) */}
      <div className="hidden md:block w-64 bg-white border-r p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold text-[#292C31]">Chats</h2>
        <div className="mt-4 space-y-3">
          {chatContacts.map((user) => (
            <div
              key={user.id}
              className="flex items-center p-2 rounded cursor-pointer hover:bg-gray-200"
              onClick={() => handleUserClick(user)}
            >
              <img
                src={user.avatar}
                className="w-10 h-10 rounded-full"
                alt="avatar"
              />
              <div className="ml-3">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Chat Header */}
        <div className="bg-white border-b p-4 flex items-center">
          {/* Back Button (Mobile Only) */}
          {activeUser && (
            <button className="p-2 mr-2 md:hidden" onClick={handleBack}>
              <FaArrowLeft size={20} />
            </button>
          )}
          {/* User Info */}
          {activeUser ? (
            <>
              <img
                src={activeUser.avatar}
                className="w-10 h-10 rounded-full"
                alt="avatar"
              />
              <p className="ml-3 font-semibold text-lg">{activeUser.name}</p>
            </>
          ) : (
            <p className="font-semibold text-lg">Chats</p>
          )}
        </div>

        {/* Messages Area or Chat List */}
        <div className="flex-1 p-4 overflow-y-auto">
          {activeUser ? (
            // Messages for the active user
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                } mb-3`}
              >
                <div
                  className={`rounded-lg p-3 max-w-xs ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          ) : (
            // Chat List (Default View on Mobile)
            <div className="space-y-3">
              {chatContacts.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center p-2 rounded cursor-pointer hover:bg-gray-200"
                  onClick={() => handleUserClick(user)}
                >
                  <img
                    src={user.avatar}
                    className="w-10 h-10 rounded-full"
                    alt="avatar"
                  />
                  <div className="ml-3">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input Box (Visible Only in Chat Window) */}
        {activeUser && (
          <form
            onSubmit={sendMessage}
            className="p-4 border-t bg-white flex items-center"
          >
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <FaPaperclip size={18} />
            </button>
            <input
              type="text"
              className="flex-1 p-2 border rounded-lg mx-2 outline-none"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <FaMicrophone size={18} />
            </button>
            <button
              type="submit"
              className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              <FaPaperPlane size={18} />
            </button>
          </form>
        )}
      </div>

      {/* Bottom Navigation Bar (Mobile Only) */}
      {!activeUser && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-2 flex justify-around md:hidden">
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <FaComments size={24} />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <FaCircle size={24} />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <FaPhone size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatApp;
