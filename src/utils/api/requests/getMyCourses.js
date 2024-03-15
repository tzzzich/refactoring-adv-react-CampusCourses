import { api } from '../instance';

export async function getMyCourses () {
  try {
    const response = await api.get('/courses/my');
    return response;
  } catch (error) {
    console.error(error);
  }
}