import { post } from './request';

export const uploadFile = async (data) => {
  try {
    const response = await post(
      '/upload/file',
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
      data
    );
    return response;
  } catch (error) {
    throw new Error(`Post failed: ${error}`);
  }
};
