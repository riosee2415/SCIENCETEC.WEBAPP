import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  SHARE_PROJECT_REQUEST,
  SHARE_PROJECT_SUCCESS,
  SHARE_PROJECT_FAILURE,
  //
  SHAREPROJECT_IMAGE1_REQUEST,
  SHAREPROJECT_IMAGE1_SUCCESS,
  SHAREPROJECT_IMAGE1_FAILURE,
  //
  SHAREPROJECT_IMAGE2_REQUEST,
  SHAREPROJECT_IMAGE2_SUCCESS,
  SHAREPROJECT_IMAGE2_FAILURE,
  //
  SHAREPROJECT_UPDATE_REQUEST,
  SHAREPROJECT_UPDATE_SUCCESS,
  SHAREPROJECT_UPDATE_FAILURE,
  //
  SHAREPROJECT_HISTORY_REQUEST,
  SHAREPROJECT_HISTORY_SUCCESS,
  SHAREPROJECT_HISTORY_FAILURE,
  //
  SHAREPROJECT_CREATE_REQUEST,
  SHAREPROJECT_CREATE_SUCCESS,
  SHAREPROJECT_CREATE_FAILURE,
  //
  SHAREPROJECT_DELETE_REQUEST,
  SHAREPROJECT_DELETE_SUCCESS,
  SHAREPROJECT_DELETE_FAILURE,
  //
  UNDER_LIST_REQUEST,
  UNDER_LIST_SUCCESS,
  UNDER_LIST_FAILURE,
  //
  UNDER_CREATE_REQUEST,
  UNDER_CREATE_SUCCESS,
  UNDER_CREATE_FAILURE,
  //
  UNDER_UPDATE_REQUEST,
  UNDER_UPDATE_SUCCESS,
  UNDER_UPDATE_FAILURE,
  //
  UNDER_DELETE_REQUEST,
  UNDER_DELETE_SUCCESS,
  UNDER_DELETE_FAILURE,
} from "../reducers/shareProject";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function shareProjectAPI(data) {
  return await axios.post(`/api/share/list`, data);
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

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function image1API(data) {
  return await axios.post(`/api/share/image`, data);
}

function* image1(action) {
  try {
    const result = yield call(image1API, action.data);

    yield put({
      type: SHAREPROJECT_IMAGE1_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SHAREPROJECT_IMAGE1_FAILURE,
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
async function image2API(data) {
  return await axios.post(`/api/share/image`, data);
}

function* image2(action) {
  try {
    const result = yield call(image2API, action.data);

    yield put({
      type: SHAREPROJECT_IMAGE2_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SHAREPROJECT_IMAGE2_FAILURE,
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
async function shareUpdateAPI(data) {
  return await axios.post(`/api/share/update`, data);
}

function* shareUpdate(action) {
  try {
    const result = yield call(shareUpdateAPI, action.data);

    yield put({
      type: SHAREPROJECT_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SHAREPROJECT_UPDATE_FAILURE,
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
async function shareHistoryListAPI(data) {
  return await axios.post(`/api/share/history/list`, data);
}

function* shareHistoryList(action) {
  try {
    const result = yield call(shareHistoryListAPI, action.data);

    yield put({
      type: SHAREPROJECT_HISTORY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SHAREPROJECT_HISTORY_FAILURE,
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
async function shareCreateAPI(data) {
  return await axios.post(`/api/share/create`, data);
}

function* shareCreate(action) {
  try {
    const result = yield call(shareCreateAPI, action.data);

    yield put({
      type: SHAREPROJECT_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SHAREPROJECT_CREATE_FAILURE,
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
async function shareDeleteAPI(data) {
  return await axios.post(`/api/share/delete`, data);
}

function* shareDelete(action) {
  try {
    const result = yield call(shareDeleteAPI, action.data);

    yield put({
      type: SHAREPROJECT_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SHAREPROJECT_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function underListAPI(data) {
  return await axios.post(`/api/share/under/list`, data);
}

function* underList(action) {
  try {
    const result = yield call(underListAPI, action.data);

    yield put({
      type: UNDER_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNDER_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function underCreateAPI(data) {
  return await axios.post(`/api/share/under/create`, data);
}

function* underCreate(action) {
  try {
    const result = yield call(underCreateAPI, action.data);

    yield put({
      type: UNDER_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNDER_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function underUpdateAPI(data) {
  return await axios.post(`/api/share/under/update`, data);
}

function* underUpdate(action) {
  try {
    const result = yield call(underUpdateAPI, action.data);

    yield put({
      type: UNDER_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNDER_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function underDeleteAPI(data) {
  return await axios.post(`/api/share/under/delete`, data);
}

function* underDelete(action) {
  try {
    const result = yield call(underDeleteAPI, action.data);

    yield put({
      type: UNDER_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNDER_DELETE_FAILURE,
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

function* watchImage1() {
  yield takeLatest(SHAREPROJECT_IMAGE1_REQUEST, image1);
}

function* watchImage2() {
  yield takeLatest(SHAREPROJECT_IMAGE2_REQUEST, image2);
}

function* watchShareUpdate() {
  yield takeLatest(SHAREPROJECT_UPDATE_REQUEST, shareUpdate);
}

function* watchShareHistoryList() {
  yield takeLatest(SHAREPROJECT_HISTORY_REQUEST, shareHistoryList);
}

function* watchShareCreate() {
  yield takeLatest(SHAREPROJECT_CREATE_REQUEST, shareCreate);
}

function* watchShareDelete() {
  yield takeLatest(SHAREPROJECT_DELETE_REQUEST, shareDelete);
}
//
function* watchUnderList() {
  yield takeLatest(UNDER_LIST_REQUEST, underList);
}
function* watchUnderCreate() {
  yield takeLatest(UNDER_CREATE_REQUEST, underCreate);
}
function* watchUnderUpdate() {
  yield takeLatest(UNDER_UPDATE_REQUEST, underUpdate);
}
function* watchUnderDelete() {
  yield takeLatest(UNDER_DELETE_REQUEST, underDelete);
}

//////////////////////////////////////////////////////////////
export default function* shareSaga() {
  yield all([
    fork(watchShareProject),
    fork(watchImage1),
    fork(watchImage2),
    fork(watchShareUpdate),
    fork(watchShareHistoryList),
    fork(watchShareCreate),
    fork(watchShareDelete),
    //
    fork(watchUnderList),
    fork(watchUnderCreate),
    fork(watchUnderUpdate),
    fork(watchUnderDelete),
    //
  ]);
}
