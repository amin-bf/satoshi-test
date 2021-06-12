import * as actionTypes from "./actionTypes";

export const getData = () => {
  return {
    type: actionTypes.VIEW_GET_DATA,
  };
};

export const setData = (data) => {
  return {
    type: actionTypes.VIEW_SET_DATA,
    data,
  };
};
