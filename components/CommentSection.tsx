import React from 'react';
import { Comment as BaseComment } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface Comment extends BaseComment {
  isTemporary?: boolean;
}

interface CommentSectionProps {
  comments: Comment[];
  onEdit: (comment: Comment) => void;
  onDelete: (commentId: string) => void;
  onAdd: () => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, onEdit, onDelete, onAdd }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="lg:w-1/4 bg-white shadow-md p-6 rounded-lg h-[600px] flex flex-col"
    >
      <div className="mb-4 flex justify-between items-center">
        <p className="text-dark font-semibold">Comments</p>
        <button onClick={onAdd} className="text-blue-500 hover:text-blue-600">Add Comment</button>
      </div>
      <div className="space-y-4 overflow-y-auto flex-grow">
        <AnimatePresence>
          {comments.length === 0 ? (
            <motion.p
              key="no-comments"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-500"
            >
              There are no comments to display.
            </motion.p>
          ) : (
            comments.map((comment) => (
              <motion.div
                key={comment.commentId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`bg-gray-100 p-3 rounded-md mb-4 ${comment.isTemporary ? 'opacity-50' : ''}`}
              >
                <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2 inline-block overflow-hidden whitespace-nowrap" style={{ maxWidth: '200px' }}>
                  {comment.selectedTextId}
                </div>
                <p className="text-sm text-gray-600">{comment.content}</p>
                
                <div className="mt-2 flex justify-end space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onEdit(comment)}
                    className="text-xs text-blue-500 hover:text-blue-600"
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => comment.commentId && onDelete(comment.commentId)}
                    className="text-xs text-red-500 hover:text-red-600"
                  >
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CommentSection;