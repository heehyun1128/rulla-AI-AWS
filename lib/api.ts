import axios from 'axios';

export interface Comment {
  commentId: string;
  content: string;
  transcriptId: string;
  userId: string;
  selectedTextId: string;
  isTemporary?: boolean;
}

export interface SelectedText {
  selectedTextId?: string;
  selectedText: string;
  transcriptId: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_SECRET_KEY = process.env.NEXT_PUBLIC_API_SECRET_KEY;

export const createComment = async (commentData: Comment): Promise<Comment> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/createComment`, commentData);
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

export const getAllComments = async (transcriptId: string): Promise<Comment[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getAllComments`, {
      params: { transcriptId }
    });
    console.log(JSON.parse(response.data.body))
    return JSON.parse(response.data.body)
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

export const updateComment = async ( updateData: Partial<Comment>): Promise<Comment> => {
  try {
    console.log("updateData",updateData)
    const response = await axios.put(`${API_BASE_URL}/updateComment`, JSON.stringify(updateData));
    return response.data;
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

export const deleteComment = async (commentId: string): Promise<void> => {
  try {
    console.log(commentId)
    await axios.delete(`${API_BASE_URL}/deleteComment`,{ params: { commentId }});
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

export const createSelectedText = async (selectedTextData: Omit<SelectedText, 'selectedTextId'>): Promise<SelectedText> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/createSelectedText`, selectedTextData, );
    return response.data;
  } catch (error) {
    console.error('Error creating selected text:', error);
    throw error;
  }
};

export const updateSelectedText = async (selectedTextId: string, updateData: Partial<SelectedText>): Promise<SelectedText> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/updateSelectedText`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating selected text:', error);
    throw error;
  }
};

export const deleteSelectedText = async (selectedTextId: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/deleteSelectedText/${selectedTextId}`);
  } catch (error) {
    console.error('Error deleting selected text:', error);
    throw error;
  }
};