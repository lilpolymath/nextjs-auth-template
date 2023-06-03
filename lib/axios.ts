import axios from 'axios';
import { getAccessToken, getRefreshToken } from 'utils/token';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

function refreshToken() {
  return axiosInstance.post('/users/refresh', {
    refreshToken: getRefreshToken(),
  });
}

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await refreshToken();
          const { accessToken } = rs.data;
          window.localStorage.setItem('accessToken', accessToken);
          axiosInstance.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accessToken}`;

          return axiosInstance(originalConfig);
        } catch (_error: any) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          window.location.href = '/login';
          return Promise.reject(_error);
        }
      }

      if (err.response.status === 403 && err.response.data) {
        window.location.href = '/login';
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
