import { api } from '../instance';

export const getGroups = async () => {
    try {
      const response = await api.get('/groups');
      console.log('getGroups:', response.data);
      return response;
    } catch (error) {
      throw error.message;
    }
  };

  export const editGroup = async (data, id) => {
    try {
      // console.log(data);
      const response = await api.put(`/groups/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.message;
    }
  };

  export const createGroup = async (data) => {
    try {
      const response = await api.post('/groups', data);
      return response.data;
    } catch (error) {
      throw error.message;
    }
  };

  export async function deleteGroup (id) {
    try {
      await api.delete(`/groups/${id}`);
    } catch (error) {
      throw error.message;
    }
  }

  export const getGroupCourses = async (id) => {
    try {
      const response = await api.get(`/groups/${id}`);
      console.log(`getGroupCourses`, response)
      return response;
    } catch (error) {
      console.log(`getGroupCourses`, error.message)
      throw error.message;
    }
  };

