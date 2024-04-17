import { api } from '../instance';

export const createCourse = async (data, id) => {
    try {
        console.log(data);
        const response = await api.post(`/groups/${id}`, data);
        console.log(response);
        return response.data;
    } catch (error) {
      console.log(error.message);throw error.response.data.message;
    }
  };

export const getCourse = async (id) => {
    try {
      const response = await api.get(`/courses/${id}/details`);
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };

  export const createCourseNotification = async (id, data) => {
    try {
      console.log(data)
      const response = await api.post(`/courses/${id}/notifications`, data);
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };

  export const addCourseTeacher = async (id, data) => {
    try {
      console.log(data)
      const response = await api.post(`/courses/${id}/teachers`, data);
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };

  export const editCourse = async (data, id) => {
    try {
      console.log(data);
      const response = await api.put(`/courses/${id}`, data);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  export const editRequirementsAndAnnotationsCourse = async (data, id) => {
    try {
      console.log(data);
      const response = await api.put(`/courses/${id}/requirements-and-annotations`, data);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };