import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../models/User';
import { axiosInstance } from './axiosInstance';
import UserStore from '../store/UserStore';
import { RegisterForm } from '../screens/SignUp';

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
      .then(async ({ data }) => {
        try {
          const { user, token } = data;
          await AsyncStorage.setItem('token', token);
          UserStore.currentUser = user;
        } catch (error) {
          console.log(error);
        }
      }),
  getCurrentUser: () =>
    axiosInstance
      .get<User>('/users/getMe')
      .then(({ data }) => {
        UserStore.currentUser = data;
        return data;
      })
      .catch(async () => {
        await AsyncStorage.removeItem('token');
        UserStore.currentUser = null;
      }),
  updateCurrentUser: (user: User) =>
    axiosInstance.put<User>(`/users/${user.id}`, user).then(({ data }) => {
      UserStore.currentUser = data;
      return data;
    }),
  signUp: (data: RegisterForm) =>
    axiosInstance.post<User>('/users', data).then(({ data }) => {
      return data;
    }),
};
