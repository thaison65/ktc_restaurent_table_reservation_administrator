import axiosClient from './axios-client';

const request = axiosClient.create({
  baseURL: `https://f99a-2001-ee0-50cb-91f0-d141-783d-cacf-963e.ngrok-free.app`,
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

  let headers = {
    // Thiết lập Content-Type header
  };

  if (option.headers) {
    headers = {
      'Content-Type': 'multipart/form-data',
    };
  }

  const response = await request.post(`${path}${id}`, data, { headers });
  console.log(response.status);

  return response.data;
};

export const put = async (path, option = {}, data) => {
  try {
    const id = option.id || '';

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

    const response = await request.patch(`${path}/${id}`);
    console.log(response.status);

    return response;
  } catch (error) {
    throw new Error(error);
  }
};
