import { Notification } from '../models/Notification';
import { axiosInstance } from './axiosInstance';

export const notificaitonService = {
  getUserNotifications: (userId: number) =>
    axiosInstance
      .get<Array<Notification>>('/notifications', { params: { userId } })
      .then(({ data }) => data),
};
