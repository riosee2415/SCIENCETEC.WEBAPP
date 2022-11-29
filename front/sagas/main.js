import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  MAIN_REQUEST,
  MAIN_SUCCESS,
  MAIN_FAILURE,
  //
} from "../reducers/main";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function mainAPI(data) {
  return await axios.post(`/api/main/list/`, data);
}

function* main(action) {
  try {
    const result = yield call(mainAPI, action.data);

    yield put({
      type: MAIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MAIN_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

function* watchMain() {
  yield takeLatest(MAIN_REQUEST, main);
}

//////////////////////////////////////////////////////////////
export default function* mainSaga() {
  yield all([
    fork(watchMain),
    //
  ]);
}
