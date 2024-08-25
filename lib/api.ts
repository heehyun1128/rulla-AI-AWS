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
    const response = await axios.post(`${API_BASE_URL}/createComment`, commentData, {
      headers: {
        'X-API-Key': API_SECRET_KEY,
      },
    });
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
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

export const updateComment = async (commentId: string, updateData: Partial<Comment>): Promise<Comment> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/updateComment/${commentId}`, updateData, {
      headers: {
        'X-API-Key': API_SECRET_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

export const deleteComment = async (commentId: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/deleteComment/${commentId}`, {
      headers: {
        'X-API-Key': API_SECRET_KEY,
      },
    });
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};

export const createSelectedText = async (selectedTextData: Omit<SelectedText, 'selectedTextId'>): Promise<SelectedText> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/createSelectedText`, selectedTextData, {
      headers: {
        'X-API-Key': API_SECRET_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating selected text:', error);
    throw error;
  }
};

export const updateSelectedText = async (selectedTextId: string, updateData: Partial<SelectedText>): Promise<SelectedText> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/updateSelectedText/${selectedTextId}`, updateData, {
      headers: {
        'X-API-Key': API_SECRET_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating selected text:', error);
    throw error;
  }
};

export const deleteSelectedText = async (selectedTextId: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/deleteSelectedText/${selectedTextId}`, {
      headers: {
        'X-API-Key': API_SECRET_KEY,
      },
    });
  } catch (error) {
    console.error('Error deleting selected text:', error);
    throw error;
  }
};