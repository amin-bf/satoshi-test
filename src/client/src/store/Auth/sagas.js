import { put } from "redux-saga/effects";

import axios from "axios";
import { authSet, loginSetError, signupSetError } from "./actions";
import { convert422ErrorToObject } from "../../util/helpers";
import { setLoading } from "../Common/actions";

export function* signupSaga(action) {
  yield put(
    signupSetError({
      name: "",
      age: "",
      score: "",
      password: "",
    })
  );
  yield put(setLoading(true));
  try {
    const response = yield axios.post("/api/auth/register", action.data);
    yield localStorage.setItem("user", JSON.stringify(response.data.user));
    const user = response.data.user;
    const token = response.data.token;
    yield localStorage.setItem("token", JSON.stringify(token));
    yield put(
      authSet({
        user,
        token,
      })
    );
  } catch (err) {
    if (err.response && err.response.status === 422) {
      const errors = convert422ErrorToObject(err.response.data.errors);
      yield put(signupSetError(errors));
    }
  } finally {
    yield put(setLoading(false));
  }
}

export function* initialAuthCheckSaga() {
  const userStorage = yield localStorage.getItem("user")
    ? localStorage.getItem("user")
    : false;
  const tokenStorage = yield localStorage.getItem("token")
    ? localStorage.getItem("token")
    : false;
  const user = yield userStorage !== "undefined"
    ? JSON.parse(userStorage)
    : false;
  const token = yield tokenStorage !== "undefined"
    ? JSON.parse(tokenStorage)
    : false;

  if (!user || !token) {
    if (user) yield localStorage.removeItem("user");
    if (token) yield localStorage.removeItem("token");
    return yield put(authSet({}));
  }

  yield put(
    authSet({
      user,
      token,
    })
  );
}

export function* logoutSaga() {
  try {
    yield put(setLoading(true));

    yield axios.post("/api/auth/logout");

    yield localStorage.removeItem("user");
    yield localStorage.removeItem("token");
    yield put(authSet({}));
  } catch (error) {
  } finally {
    yield put(setLoading(false));
  }
}

export function* loginSaga(action) {
  yield put(
    loginSetError({
      name: "",
      password: "",
    })
  );
  yield put(setLoading(true));
  try {
    const response = yield axios.post("/api/auth/login", action.data);
    yield localStorage.setItem("user", JSON.stringify(response.data.user));
    const user = response.data.user;
    const token = response.data.token;
    yield localStorage.setItem("token", JSON.stringify(token));
    yield put(
      authSet({
        user,
        token,
      })
    );
  } catch (err) {
    // console.log("saga", err.response);
    yield put(authSet({}));
    if (err.response && err.response.status === 422) {
      const errors = convert422ErrorToObject(err.response.data.errors);
      yield put(loginSetError(errors));
    }
  } finally {
    yield put(setLoading(false));
  }
}
