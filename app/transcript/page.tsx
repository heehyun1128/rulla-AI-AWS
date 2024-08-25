'use client'
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Image } from 'lucide-react';
import CommentSection from '@/components/CommentSection';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  const handleCommentClick = () => {
    setIsModalOpen(true);
    setEditingCommentId(null);
    setNewComment('');
    console.log("Selected text for comment:", selectedText);
  };

  const [comments, setComments] = useState([
    { id: 1, text: "Great opening question, Sarah! It shows you're interested in understanding the client's needs.", reference: "Hi John, thanks for..." },
    { id: 2, text: "John's pain points are clear. Make sure to address how our software solves each one.", reference: "Sure, Sarah. Right now..." },
    { id: 3, text: "Good job highlighting the integration aspect. Consider providing a specific example of how it works.", reference: "I completely understand..." },
    { id: 4, text: "The question about real-time collaboration is spot on. It directly addresses their remote work challenges.", reference: "Real-time collaboration..." },
  ]);

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      if (editingCommentId !== null) {
        setComments(comments.map(comment => 
          comment.id === editingCommentId ? { ...comment, text: newComment.trim() } : comment
        ));
      } else {
        const newId = Math.max(...comments.map(c => c.id), 0) + 1;
        const reference = selectedText.length > 20 ? selectedText.substring(0, 20) + "..." : selectedText;
        setComments([...comments, { id: newId, text: newComment.trim(), reference }]);
      }
      setNewComment('');
      setIsModalOpen(false);
      setEditingCommentId(null);
      setSelectedText('');
    }
  };

  const handleEditComment = (id: number) => {
    const commentToEdit = comments.find(comment => comment.id === id);
    if (commentToEdit) {
      setNewComment(commentToEdit.text);
      setEditingCommentId(id);
      setIsModalOpen(true);
    }
  };

  const handleDeleteComment = (id: number) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewComment('');
    setEditingCommentId(null);
  };

  const handleImageClick = () => {
    //image functionality
    console.log('Image clicked');
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-dark">
      <div className="flex flex-col lg:flex-row gap-4">
        <div ref={transcriptRef} className="lg:w-3/4 bg-white shadow-md p-6 rounded-lg relative">
          {showPopup && (
            <div
              className="absolute bg-white shadow-md rounded-md p-2 flex space-x-2"
              style={{ 
                top: `${popupPosition.top - 100}px`, 
                left: `${popupPosition.left - 350}px`,
                transform: 'translate(-50%, -100%)',
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
          <p className="text-dark mb-2">John:</p>
          <p className="text-dark mb-4">"Real-time collaboration is crucial for us. With our team spread across different time zones, we need a tool that allows us to work together efficiently, regardless of location."</p>
          <p className="text-dark mb-2">Sarah:</p>
          <p className="text-dark mb-4">"That's great to hear, John. Our software excels in real-time collaboration. It offers features like live document editing, instant messaging, and virtual whiteboards. This means your team can work together as if they were in the same room, even when they're miles apart."</p>
        </div>
        <CommentSection 
          comments={comments} 
          onEdit={handleEditComment} 
          onDelete={handleDeleteComment}
          onAdd={handleCommentClick}
        />
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-dark">{editingCommentId !== null ? 'Edit Comment' : 'Add a Comment'}</DialogTitle>
          </DialogHeader>
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Type your comment here..."
            className="text-dark"
          />
          <DialogFooter>
            <Button onClick={handleCloseModal} variant="outline" className="text-dark">Cancel</Button>
            <Button onClick={handleSubmitComment}>{editingCommentId !== null ? 'Update' : 'Submit'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TranscriptPage;