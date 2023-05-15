import { Service } from '../models/Service';
import { axiosInstance } from './axiosInstance';

export const serviceService = {
  getAll: () =>
    axiosInstance.get<Array<Service>>('/services').then(({ data }) => data),
};
