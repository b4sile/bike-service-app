import { LatLng } from 'react-native-maps';
import { Request } from '../models/Request';
import { RequestForm } from '../screens/Request';
import { axiosInstance } from './axiosInstance';

export const requestService = {
  getUserRequests: (userId: number) =>
    axiosInstance
      .get<Array<Request>>('/requests', { params: { userId } })
      .then(({ data }) => data),
  createRequest: (data: RequestForm & Partial<LatLng>) =>
    axiosInstance.post<Request>('/requests', data).then(({ data }) => data),
};
