import { get, post, put, del } from './request';

export const getCategories = async () => {
  try {
    const response = await get('category/all');

    return response;
  } catch (error) {
    throw new Error(`Get List failed: ${error}`);
  }
};

export const getCategory = async (id) => {
  try {
    const response = await get('category/detail-', { id: id });

    return response;
  } catch (error) {
    throw new Error(`Get List failed: ${error}`);
  }
};

export const postCategory = async (data) => {
  try {
    const response = await post('/category/add-category', {}, data);
    return response;
  } catch (error) {
    throw new Error(`Post failed: ${error}`);
  }
};

export const putCategory = async (id, data) => {
  try {
    console.log(id, data);

    const response = await put(`/category/detail-`, { id: id }, data);

    return response;
  } catch (error) {
    throw new Error(`Get List failed: ${error}`);
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await del('/category/delete', { id: id });
    return response;
  } catch (error) {
    throw new Error(`Delete failed: ${error}`);
  }
};
