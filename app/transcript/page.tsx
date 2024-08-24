'use client'
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Image } from 'lucide-react';
import CommentSection from '@/components/CommentSection';

const TranscriptPage: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [selectedText, setSelectedText] = useState('');
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection && !selection.isCollapsed) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setPopupPosition({
          top: rect.top + window.scrollY - 30,
          left: rect.left + window.scrollX + (rect.width / 2)
        });
        setShowPopup(true);
        const text = selection.toString().trim();
        setSelectedText(text);
        console.log('Selected text:', text);
      } else {
        setShowPopup(false);
        setSelectedText('');
      }
    };

    const transcriptElement = transcriptRef.current;
    if (transcriptElement) {
      transcriptElement.addEventListener('mouseup', handleSelection);
      return () => transcriptElement.removeEventListener('mouseup', handleSelection);
    }
  }, []);

  const handleCommentClick = () => {
    // comment functionality
    console.log('Comment clicked');
  };

  const handleImageClick = () => {
    //image functionality
    console.log('Image clicked');
  };

  const comments = [
    { text: "Great opening question, Sarah! It shows you're interested in understanding the client's needs." },
    { text: "John's pain points are clear. Make sure to address how our software solves each one." },
    { text: "Good job highlighting the integration aspect. Consider providing a specific example of how it works." },
    { text: "The question about real-time collaboration is spot on. It directly addresses their remote work challenges." },
  ];

  return (
    <div className="container mx-auto px-4 py-8 bg-dark">
      <div className="flex flex-col lg:flex-row gap-4">
        <div ref={transcriptRef} className="lg:w-3/4 bg-white shadow-md p-6 rounded-lg relative">
          {showPopup && (
            <div
              className="absolute bg-white shadow-md rounded-md p-2 flex space-x-2"
              style={{ 
                top: `${popupPosition.top - 140}px`, 
                left: `${popupPosition.left - 300}px`,
                transform: 'translateX(-50%)',
              }}
            >
              <button onClick={handleCommentClick} className="p-1 hover:bg-gray-100 rounded">
                <MessageSquare size={20} className="text-dark" />
              </button>
              <button onClick={handleImageClick} className="p-1 hover:bg-gray-100 rounded">
                <Image size={20} className="text-dark" />
              </button>
            </div>
          )}
          <p className="text-dark mb-2">Sales Representative (Sarah):</p>
          <p className="text-dark mb-4">"Hi John, thanks for taking the time to speak with me today. I wanted to discuss how our new software can help streamline your team's project management tasks. Could you share a bit about your current process and any challenges you're facing?"</p>
          <p className="text-dark mb-2">Client (John):</p>
          <p className="text-dark mb-4">"Sure, Sarah. Right now, we're using a mix of different tools, but it's becoming a bit overwhelming. Managing deadlines and team collaboration has been tricky, especially with remote work becoming more common."</p>
          <p className="text-dark mb-2">Sarah:</p>
          <p className="text-dark mb-4">"I completely understand. Our software integrates all your project management needs into one platform, making it easier to track progress and communicate with your team, no matter where they are. How important is it for you to have real-time collaboration features?"</p>
          <p className="text-dark mb-2">Sarah:</p>
          <p className="text-dark mb-4">"I completely understand. Our software integrates all your project management needs into one platform, making it easier to track progress and communicate with your team, no matter where they are. How important is it for you to have real-time collaboration features?"</p>
          <p className="text-dark mb-2">Sales Representative (Sarah):</p>
          <p className="text-dark mb-4">"Hi John, thanks for taking the time to speak with me today. I wanted to discuss how our new software can help streamline your team's project management tasks. Could you share a bit about your current process and any challenges you're facing?"</p>
          <p className="text-dark mb-2">Client (John):</p>
          <p className="text-dark mb-4">"Sure, Sarah. Right now, we're using a mix of different tools, but it's becoming a bit overwhelming. Managing deadlines and team collaboration has been tricky, especially with remote work becoming more common."</p>
        </div>
        <CommentSection comments={comments} />
      </div>
    </div>
  );
};

export default TranscriptPage;