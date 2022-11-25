import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  SHARE_PROJECT_REQUEST,
  SHARE_PROJECT_SUCCESS,
  SHARE_PROJECT_FAILURE,
  //
} from "../reducers/shareProject";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function shareProjectAPI(data) {
  return await axios.get(`/api/share/list`);
}

function* shareProject(action) {
  try {
    const result = yield call(shareProjectAPI, action.data);

    yield put({
      type: SHARE_PROJECT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SHARE_PROJECT_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchShareProject() {
  yield takeLatest(SHARE_PROJECT_REQUEST, shareProject);
}

//////////////////////////////////////////////////////////////
export default function* shareSaga() {
  yield all([
    fork(watchShareProject),
    //
  ]);
}
