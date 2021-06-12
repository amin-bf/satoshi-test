import * as actionTypes from "./actionTypes";
import Auth from "../../util/Auth";
import { updateObject } from "../../util/helpers";

const initialState = {
  signupErrors: {
    name: "",
    age: "",
    score: "",
    password: "",
  },
  loginErrors: {
    name: "",
  },
  auth: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SET:
      return updateObject(state, {
        auth: new Auth(
          action.data.user,
          action.data.token,
          action.data.refresh_token
        ),
      });
    case actionTypes.AUTH_SIGNUP_SET_ERROR:
      return updateObject(state, {
        signupErrors: updateObject(state.signupErrors, action.data),
      });
    case actionTypes.AUTH_LOGIN_SET_ERROR:
      return updateObject(state, {
        loginErrors: updateObject(state.loginErrors, action.data),
      });
    default:
      return state;
  }
};

export default reducer;
