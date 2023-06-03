import axiosInstance from '../lib/axios';
import { ATCreateUser, ATLogin, ATResetPassword } from '../types/users';

export const getUser = async () => {
  try {
    const res = await axiosInstance.get(`/api/profile`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const login = async ({ email, password }: ATLogin) => {
  try {
    const res = await axiosInstance.post(`/api/login`, {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async ({ email, password, name }: ATCreateUser) => {
  try {
    const res = await axiosInstance.post(`/api/sign-up`, {
      email,
      password,
      name,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
