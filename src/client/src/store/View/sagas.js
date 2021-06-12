import axios from "axios";
import { put } from "redux-saga/effects";

import { setData } from "./actions";
import { setLoading } from "../Common/actions";

export function* getDataSaga(action) {
  yield put(setLoading(true));
  try {
    const response = yield axios.get("/api/data/view");
    yield put(setData(response.data));
    // yield put(actions.fetchAll());
  } catch (err) {
    console.log("saga", err.response);
  } finally {
    yield put(setLoading(false));
  }
}
