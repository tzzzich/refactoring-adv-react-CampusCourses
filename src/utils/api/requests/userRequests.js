import { api } from '../instance';

export const register = async (data) => {
  try {
    const response = await api.post('/registration', data);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const login = async (data) => {
  try {
    const response = await api.post('/login', data);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export async function getProfile () {
    try {
      const response = await api.get('/profile');
      return response;
    } catch (error) {
      //console.error(error);
    }
  }

  export async function logout () {
    try {
      const response = await api.post('/logout');
    } catch (error) {
      //console.error(error);
    }
  }

export const putProfile = async (data) => {
  try {
    const response = await api.put('/profile', data);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export async function getRoles () {
    try {
      const response = await api.get('/roles');
      return response;
    } catch (error) {
      //console.error(error);
    }
  }

export async function getMyCourses () {
    try {
        const response = await api.get('/courses/my');
        return response;
    } catch (error) {
      //  console.error(error);
    }
}

export const getAllUsers = async () => {
  try {
    const response = await api.get(`/users`);
    return response;
  } catch (error) {
    console.log(error);
  }
};