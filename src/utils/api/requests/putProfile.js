import { api } from '../instance';

export const putProfile = async (data) => {
  try {
    const response = await api.put('/profile', data);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
