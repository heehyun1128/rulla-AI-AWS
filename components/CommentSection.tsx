import React from 'react';

interface Comment {
  text: string;
}

interface CommentSectionProps {
  comments: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments }) => {
  return (
    <div className="lg:w-1/4 bg-white shadow-md p-6 rounded-lg">
      <p className="text-dark font-semibold mb-4">Comments</p>
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="bg-gray-100 p-3 rounded-md">
            <p className="text-sm text-gray-600">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;