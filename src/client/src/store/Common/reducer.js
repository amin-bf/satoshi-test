import * as actionTypes from "./actionTypes";
import { updateObject } from "../../util/helpers";

const initialState = {
  loading: false,
  documentTitle: "Satoshi",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.COMMON_SET_LOADING:
      return updateObject(state, { loading: action.data });
    case actionTypes.COMMON_SET_DOCUMENT_TITLE:
      return updateObject(state, { documentTitle: action.data });
    default:
      return state;
  }
};

export default reducer;
