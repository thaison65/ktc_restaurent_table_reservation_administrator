import axiosClient from './axios-client';

const request = axiosClient.create({
  baseURL: `http://localhost:3065/api/`,
});

export const get = async (path, option = {}) => {
  const id = option.id || '';

  try {
    const response = await request.get(`${path}${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const post = async (path, option = {}, data) => {
  const id = option.id || '';

  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  const response = await request.post(`${path}/${id}`, data, { headers });
  return response.data;
};

export const put = async (path, option = {}, data) => {
  try {
    const id = option.id || '';

    const headers = {
      // Thiết lập Content-Type header
      'Content-Type': 'multipart/form-data',
    };

    const response = await request.put(`${path}/${id}`, data, { headers });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const del = async (path, option = {}) => {
  try {
    const id = option.id || '';

    const response = await request.delete(`${path}/${id}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
