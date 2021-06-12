import * as actionTypes from "./actionTypes";

export const setLoading = (data) => {
  return {
    type: actionTypes.COMMON_SET_LOADING,
    data,
  };
};

export const setDocumentTitle = (data) => {
  return {
    type: actionTypes.COMMON_SET_DOCUMENT_TITLE,
    data,
  };
};
