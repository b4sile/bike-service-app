import { Request } from '../models/Request';
import { axiosInstance } from './axiosInstance';

export const requestService = {
  getUserRequests: (userId: number) =>
    axiosInstance
      .get<Array<Request>>('/requests', { params: { userId } })
      .then(({ data }) => data),
};
