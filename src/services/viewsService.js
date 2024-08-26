import { get, post, put, del } from './request';

export const getViews = async () => {
  try {
    const response = await get('views/all');

    return response;
  } catch (error) {
    throw new Error(`Get List failed: ${error}`);
  }
};

export const postView = async (data) => {
  try {
    const response = await post('/views/add-views', {}, data);
    return response;
  } catch (error) {
    throw new Error(`Post failed: ${error}`);
  }
};

export const putView = async (id, data) => {
  try {
    const response = await put(`views/detail-`, { id: id }, data);

    return response;
  } catch (error) {
    throw new Error(`Get List failed: ${error}`);
  }
};

export const deleteView = async (id) => {
  try {
    const response = await del('views/delete', { id: id });
    return response;
  } catch (error) {
    throw new Error(`Delete failed: ${error}`);
  }
};
