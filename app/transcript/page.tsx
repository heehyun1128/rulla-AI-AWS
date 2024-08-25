'use client'
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Image } from 'lucide-react';
import CommentSection from '@/components/CommentSection';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { createComment, getAllComments, updateComment, deleteComment, Comment } from '@/lib/api';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const TranscriptPage: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [selectedText, setSelectedText] = useState('');
  const transcriptRef = useRef<HTMLDivElement>(null); 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    fetchComments();
    setTranscript(`Sales Representative (Sarah):

"Hi John, thanks for taking the time to speak with me today. I wanted to discuss how our new software can help streamline your team's project management tasks. Could you share a bit about your current process and any challenges you're facing?"

Client (John):

"Sure, Sarah. Right now, we're using a mix of different tools, but it's becoming a bit overwhelming. Managing deadlines and team collaboration has been tricky, especially with remote work becoming more common."

Sarah:

"I completely understand. Our software integrates all your project management needs into one platform, making it easier to track progress and communicate with your team, no matter where they are. How important is it for you to have real-time collaboration features?"

John:

"Real-time collaboration is crucial for us. With our team spread across different time zones, we need a tool that allows us to work together efficiently, regardless of location."

Sarah:

"That's great to hear, John. Our software excels in real-time collaboration. It offers features like live document editing, instant messaging, and virtual whiteboards. This means your team can work together as if they were in the same room, even when they're miles apart."`)
  }, []);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const fetchedComments = await getAllComments('your-transcript-id');
      console.log('Fetched comments:', fetchedComments);
      setComments(fetchedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleAddComment = () => {
    setIsModalOpen(true);
    setEditingCommentId(null);
    setNewComment('');
    console.log("Selected text for comment:", selectedText);
  };

  const handleSubmitComment = async () => {
    if (newComment.trim()) {
      try {
        setIsLoading(true);
        const commentId = uuidv4();
        const newCommentData: Comment = {
          commentId,
          content: newComment.trim(),
          transcriptId: 'your-transcript-id',
          userId: 'your-user-id',
          selectedTextId: selectedText,
          isTemporary: true,
        };

        // Optimistically add the comment to the UI
        setComments(prevComments => [...prevComments, newCommentData]);

        // Perform API call without updating local state
        if (editingCommentId) {
          await updateComment(editingCommentId, newCommentData);
        } else {
          await createComment(newCommentData);
        }

        setNewComment('');
        setIsModalOpen(false);
        setEditingCommentId(null);
        setSelectedText('');
      } catch (error) {
        console.error('Error submitting comment:', error);
        alert('Failed to submit comment to the server. The local comment will remain until the page is refreshed.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEditComment = (comment: Comment) => {
    setNewComment(comment.content);
    setEditingCommentId(comment.commentId);
    setIsModalOpen(true);
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      setComments(prevComments => prevComments.filter(comment => comment.commentId !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
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

  const summarizeContent=async (content:string)=>{
    console.log(content)
    const res=await axios.post('/api/summary',{text:content})
    console.log(res.data)
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-dark">
        <button onClick={async()=>await summarizeContent(transcript)}>Summarize Transcript & Comments</button>
      <div className="flex flex-col lg:flex-row gap-4">
        <div ref={transcriptRef} className="lg:w-3/4 bg-white shadow-md p-6 rounded-lg relative">
          {showPopup && (
            <div
              className="absolute bg-white shadow-md rounded-md p-2 flex space-x-2"
              style={{ 
                top: `${popupPosition.top - 100}px`, 
                left: `${popupPosition.left}px`,
                transform: 'translate(-50%, -100%)',
              }}
            >
              <button onClick={handleAddComment} className="p-1 hover:bg-gray-100 rounded">
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
          onAdd={handleAddComment} 
          onEdit={handleEditComment} 
          onDelete={handleDeleteComment}
          isLoading={isLoading}
        />
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-dark">{editingCommentId ? 'Edit Comment' : 'Add a Comment'}</DialogTitle>
          </DialogHeader>
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Type your comment here..."
            className="text-dark"
          />
          <DialogFooter>
            <Button onClick={handleCloseModal} variant="outline" className="text-dark">Cancel</Button>
            <Button onClick={handleSubmitComment} disabled={isLoading}>
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin mr-2" />
              ) : null}
              {editingCommentId ? 'Update' : 'Submit'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TranscriptPage;