import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  SHARE_PROJECT_REQUEST,
  SHARE_PROJECT_SUCCESS,
  SHARE_PROJECT_FAILURE,
  //
  // TECH_IMAGE_UPDATE_REQUEST,
  // TECH_IMAGE_UPDATE_SUCCESS,
  // TECH_IMAGE_UPDATE_FAILURE,
  // //
  // COR_IMAGE_UPDATE_REQUEST,
  // COR_IMAGE_UPDATE_SUCCESS,
  // COR_IMAGE_UPDATE_FAILURE,
  // //
  // TECH_UPDATE_REQUEST,
  // TECH_UPDATE_SUCCESS,
  // TECH_UPDATE_FAILURE,
  // //
  // COR_UPDATE_REQUEST,
  // COR_UPDATE_SUCCESS,
  // COR_UPDATE_FAILURE,
} from "../reducers/shareProject";

// ******************************************************************************************************************
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

// function* watchTechImage() {
//   yield takeLatest(TECH_IMAGE_UPDATE_REQUEST, techImage);
// }

// function* watchCorImage() {
//   yield takeLatest(COR_IMAGE_UPDATE_REQUEST, corImage);
// }

// function* watchTechUpdate() {
//   yield takeLatest(TECH_UPDATE_REQUEST, techUpdate);
// }

// function* watchCorUpdate() {
//   yield takeLatest(COR_UPDATE_REQUEST, corUpdate);
// }

//////////////////////////////////////////////////////////////
export default function* shareSaga() {
  yield all([
    fork(watchShareProject),
    // fork(watchTechImage),
    // fork(watchCorImage),
    // fork(watchTechUpdate),
    // fork(watchCorUpdate),
    //
  ]);
}
