import { api } from '../instance';

export async function getProfile () {
  try {
    const response = await api.get('/profile');
    return response;
  } catch (error) {
    console.error(error);
  }
}