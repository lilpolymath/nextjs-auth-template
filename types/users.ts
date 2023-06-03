//  - This file contains all the types used in the application

export type ATCreateUser = {
  email: string;
  password: string;
  name: string;
};

export type ATLogin = {
  email: string;
  password: string;
};

export type ATResetPassword = {
  email: string;
};
