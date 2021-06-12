import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "./actionTypes";
import * as sagas from "./sagas";

export function* watchView() {
  yield takeEvery(actionTypes.VIEW_GET_DATA, sagas.getDataSaga);
}
