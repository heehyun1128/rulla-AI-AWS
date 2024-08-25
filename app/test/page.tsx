"use client";

import React, { useState, useEffect } from "react";
import { getAllComments, deleteComment, updateComment } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const TestCommentOperations: React.FC = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [editingComment, setEditingComment] = useState<any | null>(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const fetchedComments = await getAllComments("1");
      setComments(fetchedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      setComments(
        comments.filter((comment) => comment.commentId !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEdit = (comment: any) => {
    setEditingComment(comment);
    setEditContent(comment.content);
  };

  const handleUpdate = async () => {
    if (!editingComment) return;
    try {
      const updatedComment = await updateComment( {
        content: editContent,
      });
      setComments(
        comments.map((c) =>
          c.commentId === updatedComment.commentId ? updatedComment : c
        )
      );
      setEditingComment(null);
      setEditContent("");
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 text-gray-900">
      <h1 className="text-2xl font-bold mb-4 text-white">Comment Operations</h1>
      <div className="mt-8 bg-gray-800 p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-2 text-white">Comments:</h2>
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li
              key={comment.commentId}
              className="bg-gray-700 p-4 rounded-md text-white"
            >
              {editingComment?.commentId === comment.commentId ? (
                <div>
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="mb-2 text-gray-900"
                  />
                  <Button onClick={handleUpdate} className="mr-2">
                    Save
                  </Button>
                  <Button onClick={() => setEditingComment(null)}></Button>
                </div>
              ) : (
                <div>
                  <p>
                    <strong>Content:</strong> {comment.content}
                  </p>
                  <p>
                    <strong>User ID:</strong> {comment.userId}
                  </p>
                  <p>
                    <strong>Transcript ID:</strong> {comment.transcriptId}
                  </p>
                  <p>
                    <strong>Selected Text:</strong> {comment.selectedTextId}
                  </p>
                  <div className="mt-2">
                    <Button
                      onClick={() => handleEdit(comment)}
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(comment.commentId)}>
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TestCommentOperations;
