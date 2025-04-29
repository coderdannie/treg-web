import { FaAt } from 'react-icons/fa';
import { useChat } from '../../../context/chatContext';
import { BsSendFill } from 'react-icons/bs';

export const ChatInput = () => {
  const { currentChat, message, setMessage, handleSendMessage } = useChat();

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
