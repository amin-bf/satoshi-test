import * as actionTypes from "./actionTypes";
import { updateObject } from "../../util/helpers";

const initialState = {
  data: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VIEW_SET_DATA:
      return updateObject(state, {
        data: action.data,
      });
    default:
      return state;
  }
};

export default reducer;
