

export const createCourse = async (data) => {
    try {
        console.log(data);
      const response = await api.post(`/groups/${id}`, data);
      console.log(response);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  };