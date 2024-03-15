import { api } from '../instance';

export const register = async (data) => {
  try {
    const response = await api.post('/registration', data);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data.message;
  }
};
