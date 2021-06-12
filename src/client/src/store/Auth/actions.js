import * as actionTypes from "./actionTypes";

export const signup = (data) => {
  return {
    type: actionTypes.AUTH_INITIATE_SIGNUP,
    data,
  };
};

export const authSet = (data) => {
  return {
    type: actionTypes.AUTH_SET,
    data,
  };
};

export const initiateInitialAuthCheck = () => {
  return {
    type: actionTypes.AUTH_INITIATE_INITIAL_CHECK,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT,
  };
};

export const signupSetError = (data) => {
  return {
    type: actionTypes.AUTH_SIGNUP_SET_ERROR,
    data,
  };
};

export const login = (data) => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGIN,
    data,
  };
};

export const loginSetError = (data) => {
  return {
    type: actionTypes.AUTH_LOGIN_SET_ERROR,
    data,
  };
};
