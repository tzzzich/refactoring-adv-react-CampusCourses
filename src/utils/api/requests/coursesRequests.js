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

  export const gradeStudent = async (data, courseId, studentId) => {
    try {
      console.log(data)
      const response = await api.post(`/courses/${courseId}/marks/${studentId}`, data);
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };

  export const setStudentRequestStatus = async (data, courseId, studentId) => {
    try {
      console.log(data)
      const response = await api.post(`/courses/${courseId}/student-status/${studentId}`, data);
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };

  export const changeCourseStatus = async (data, id) => {
    try {
      console.log(data);
      const response = await api.post(`/courses/${id}/status`, data);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  export const deleteCourse = async (id) => {
    try {
      const response = await api.delete(`/courses/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };

  export const signUpForCourse = async (id) => {
    try {
      const response = await api.post(`/courses/${id}/sign-up`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
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