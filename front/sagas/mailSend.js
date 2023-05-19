import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  MAIL_SEND_REQUEST,
  MAIL_SEND_SUCCESS,
  MAIL_SEND_FAILURE,
  //
  MAIL_FILE_UPLOAD_REQUEST,
  MAIL_FILE_UPLOAD_SUCCESS,
  MAIL_FILE_UPLOAD_FAILURE,
} from "../reducers/mailSend";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function mailSendAPI(data) {
  return await axios.post(`/api/send/send`, data);
}

function* mailSend(action) {
  try {
    const result = yield call(mailSendAPI, action.data);

    yield put({
      type: MAIL_SEND_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MAIL_SEND_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function mailFileUploadAPI(data) {
  return await axios.post(`/api/send/file`, data);
}

function* mailFileUpload(action) {
  try {
    const result = yield call(mailFileUploadAPI, action.data);

    yield put({
      type: MAIL_FILE_UPLOAD_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MAIL_FILE_UPLOAD_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

function* watchMailSend() {
  yield takeLatest(MAIL_SEND_REQUEST, mailSend);
}

function* watchMailFileUpload() {
  yield takeLatest(MAIL_FILE_UPLOAD_REQUEST, mailFileUpload);
}

//////////////////////////////////////////////////////////////
export default function* mailSendSaga() {
  yield all([
    fork(watchMailSend),
    fork(watchMailFileUpload),
    //
  ]);
}
