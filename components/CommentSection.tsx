import React from 'react';
import { Comment } from '@/lib/api';
import { Button } from "@/components/ui/button";

interface CommentSectionProps {
  comments: Comment[];
  onEdit: (comment: Comment) => void;
  onDelete: (commentId: string) => void;
  onAdd: () => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, onEdit, onDelete, onAdd }) => {
  return (
    <div className="lg:w-1/4 bg-white shadow-md p-6 rounded-lg">
      <div className="mb-4 flex justify-between items-center">
        <p className="text-dark font-semibold">Comments</p>
        <Button onClick={onAdd} variant="outline" size="sm">Add Comment</Button>
      </div>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.commentId} className="bg-gray-100 p-3 rounded-md">
            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2 inline-block">
              {comment.selectedTextId}
            </div>
            <p className="text-sm text-gray-600">{comment.content}</p>
            <div className="mt-2 flex justify-end space-x-2">
              <button onClick={() => onEdit(comment)} className="text-xs text-blue-500 hover:text-blue-600">Edit</button>
              <button onClick={() => onDelete(comment.commentId)} className="text-xs text-red-500 hover:text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;