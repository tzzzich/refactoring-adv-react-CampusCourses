import { api } from '../instance';

export const getGroups = async () => {
    try {
      const response = await api.get('/groups');
      console.log(response.data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  export const putGroup = async (data, id) => {
    try {
      console.log(data);
      const response = await api.put(`/groups/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  export const postGroup = async (data) => {
    try {
      const response = await api.post('/groups', data);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  export async function deleteGroup (id) {
    try {
      const response = await api.delete(`/groups/${id}`);
    } catch (error) {
      //console.error(error);
    }
  }

  export const getGroupDetails = async (id) => {
    try {
      const response = await api.get(`/groups/${id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  };