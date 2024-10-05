import axios, { AxiosResponse } from 'axios';

import { BASE_URL } from '@/constants';

const axiosInstance = axios.create({
  baseURL: BASE_URL
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
