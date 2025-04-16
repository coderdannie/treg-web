'use client';
import React, { useState, useEffect } from 'react';
import { ChatSidebar } from '../../components/data/Message/ChatSidebar';
import { ChatHeader } from '../../components/data/Message/ChatHeader';
import { ChatMessages } from '../../components/data/Message/ChatMessages';
import { ChatInput } from '../../components/data/Message/ChartInput';
import { ChatProvider } from '../../context/chatContext';

export default function MessagePage() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      const mobileView = window.innerWidth < 768;
      setIsMobile(mobileView);
      // On mobile, start with chat view (sidebar hidden)
      if (mobileView) {
        setShowSidebar(true);
      } else {
        setShowSidebar(true); // Always show sidebar on desktop
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Function to toggle between sidebar and chat on mobile
  const toggleView = () => {
    if (isMobile) {
      setShowSidebar(!showSidebar);
    }
  };

  return (
    <ChatProvider>
      {/* Use negative margins to counteract parent padding and make component full-width */}
      <div className="relative mx-0  -mb-8 pt-2 h-[85vh] flex overflow-hidden">
        {/* Chat sidebar - fixed width on desktop, full width on mobile when visible */}
        <div
          className={`
            ${
              isMobile
                ? showSidebar
                  ? 'w-full absolute inset-0 z-30'
                  : 'hidden'
                : 'w-80 flex-shrink-0'
            } 
            h-full border-r bg-white overflow-hidden
          `}
        >
          <ChatSidebar onChatSelect={toggleView} />
        </div>

        {/* Main chat area - flexible width on desktop, full width on mobile when visible */}
        <div
          className={`
            ${isMobile ? (showSidebar ? 'hidden' : 'w-full') : 'flex-grow'} 
            flex flex-col h-full overflow-hidden
          `}
        >
          {/* Fixed chat header with back button on mobile */}
          <div className="flex-shrink-0 bg-white border-b">
            <ChatHeader onBackClick={isMobile ? toggleView : undefined} />
          </div>

          {/* Scrollable messages area - takes remaining height */}
          <div className="flex-grow overflow-y-auto bg-gray-50">
            <ChatMessages />
          </div>

          {/* Fixed chat input at bottom */}
          <div className="flex-shrink-0 bg-white border-t">
            <ChatInput />
          </div>
        </div>
      </div>
    </ChatProvider>
  );
}
