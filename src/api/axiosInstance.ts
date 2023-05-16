import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const inProduction = process.env.NODE_ENV === 'production';

export const apiDomain = inProduction ? 'mywebsite.com' : '10.0.2.2';

const protocol = inProduction ? 'https' : 'http';
const port = 8080;
const baseURL = `${protocol}://${apiDomain}:${port}/api`;

export const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(async function (config) {
  try {
    const token = await AsyncStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token ?? ''}`;
  } catch (e) {
    console.log(e);
  }
  return config;
});
