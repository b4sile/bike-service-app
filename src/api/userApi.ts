import { User } from '../models/User';
import { axiosInstance } from './axiosInstance';

interface SignInParams {
  email: string;
  password: string;
}

interface SignInResponse {
  user: User;
  token: string;
}

export const userService = {
  signIn: (params: SignInParams) =>
    axiosInstance
      .post<SignInResponse>('/login', params)
      .then(({ data }) => data),
};
