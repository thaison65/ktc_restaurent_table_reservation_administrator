import { get, put } from './request';

export const getBookings = async () => {
  try {
    const response = await get('booking/all');

    return response.data;
  } catch (error) {
    throw new Error(`Get List failed: ${error}`);
  }
};

export const getBooking = async (id) => {
  try {
    const response = await get(`/booking/booking-detail?id=${id}`);

    return response.data;
  } catch (error) {
    throw new Error(`Get List failed: ${error}`);
  }
};

export const putBookingStatus = async (id, status) => {
  try {
    const response = await put(`/booking/update-status?id=${id}&status=${status}`, {}, undefined);

    return response;
  } catch (error) {
    throw new Error(`Get List failed: ${error}`);
  }
};
