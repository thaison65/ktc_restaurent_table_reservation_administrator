import axiosClient from './axios-client';

const request = axiosClient.create({
  baseURL: `https://3806-58-187-122-34.ngrok-free.app`,
});

export const get = async (path, option = {}) => {
  const id = option.id || '';

  try {
    const response = await request.get(`${path}${id}`);
    console.log(response.status);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const post = async (path, option = {}, data) => {
  const id = option.id || '';

  const response = await request.post(`${path}${id}`, data);
  console.log(response.status);

  return response.data;
};

export const put = async (path, option = {}, data) => {
  try {
    const id = option.id || '';

    console.log(id, 'data:', data);

    const response = await request.put(`${path}${id}`, data);
    console.log(response.status);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const del = async (path, option = {}) => {
  try {
    const id = option.id || '';

    const response = await request.delete(`${path}/${id}`);
    console.log(response.status);

    return response;
  } catch (error) {
    throw new Error(error);
  }
};
