import { api } from '../instance';

export async function getRoles () {
  try {
    const response = await api.get('/roles');
    return response;
  } catch (error) {
    console.error(error);
  }
}