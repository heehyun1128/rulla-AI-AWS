import axios from 'axios';

const API_BASE_URL = 'https://le2l431le7.execute-api.us-west-2.amazonaws.com/Stage';

export interface Comment {
  commentId: string;
  content: string;
  transcriptId: string;
  userId: string;
  selectedTextId: string;
  commentImageUrl?: string;
}

export const createComment = async (comment: Omit<Comment, 'commentId'>): Promise<Comment> => {
  const response = await axios.post(`${API_BASE_URL}/createComment`, comment, { withCredentials: true });
  return response.data.comment;
};

export const getComments = async (transcriptId: string): Promise<Comment[]> => {
  const response = await axios.get(`${API_BASE_URL}/getAllComments`);
  return response.data.filter((comment: Comment) => comment.transcriptId === transcriptId);
};

export const updateComment = async (comment: Comment): Promise<Comment> => {
  const response = await axios.put(`${API_BASE_URL}/updateComment`, comment, { withCredentials: true });
  return response.data.comment;
};

export const deleteComment = async (commentId: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/deleteComment`, { data: { commentId }, withCredentials: true });
};