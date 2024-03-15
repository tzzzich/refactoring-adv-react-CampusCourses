import { api } from '../instance';

export const login = async (data) => {
  try {
    const response = await api.post('/login', data);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
