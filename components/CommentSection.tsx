import React from 'react';

interface Comment {
  id: number;
  text: string;
  reference: string;
}

interface CommentSectionProps {
  comments: Comment[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onAdd: () => void; // Added this line
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, onEdit, onDelete }) => {
  return (
    <div className="lg:w-1/4 bg-white shadow-md p-6 rounded-lg">
      <div className="mb-4">
        <p className="text-dark font-semibold">Comments</p>
      </div>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-100 p-3 rounded-md">
            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2 inline-block">
              {comment.reference}
            </div>
            <p className="text-sm text-gray-600">{comment.text}</p>
            <div className="mt-2 flex justify-end space-x-2">
              <button onClick={() => onEdit(comment.id)} className="text-xs text-blue-500 hover:text-blue-600">Edit</button>
              <button onClick={() => onDelete(comment.id)} className="text-xs text-red-500 hover:text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;