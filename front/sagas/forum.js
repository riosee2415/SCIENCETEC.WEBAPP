import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FORUM_LIST_REQUEST,
  FORUM_LIST_SUCCESS,
  FORUM_LIST_FAILURE,
  //
  FORUM_ADMIN_LIST_REQUEST,
  FORUM_ADMIN_LIST_SUCCESS,
  FORUM_ADMIN_LIST_FAILURE,
  //
  FORUM_DETAIL_REQUEST,
  FORUM_DETAIL_SUCCESS,
  FORUM_DETAIL_FAILURE,
  //
  FORUM_CREATE_REQUEST,
  FORUM_CREATE_SUCCESS,
  FORUM_CREATE_FAILURE,
  //
  FORUM_UPDATE_REQUEST,
  FORUM_UPDATE_SUCCESS,
  FORUM_UPDATE_FAILURE,
  //
  FORUM_DELETE_REQUEST,
  FORUM_DELETE_SUCCESS,
  FORUM_DELETE_FAILURE,
  //
  FORUM_HISTORY_LIST_REQUEST,
  FORUM_HISTORY_LIST_SUCCESS,
  FORUM_HISTORY_LIST_FAILURE,
} from "../reducers/forum";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function forumListAPI(data) {
  return await axios.post(`/api/forum/list`, data);
}

function* forumList(action) {
  try {
    const result = yield call(forumListAPI, action.data);

    yield put({
      type: FORUM_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FORUM_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function forumAdminListAPI(data) {
  return await axios.post(`/api/forum/admin/list`, data);
}

function* forumAdminList(action) {
  try {
    const result = yield call(forumAdminListAPI, action.data);

    yield put({
      type: FORUM_ADMIN_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FORUM_ADMIN_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function forumDetailAPI(data) {
  return await axios.post(`/api/forum/detail`, data);
}

function* forumDetail(action) {
  try {
    const result = yield call(forumDetailAPI, action.data);

    yield put({
      type: FORUM_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FORUM_DETAIL_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function forumCreateAPI(data) {
  return await axios.post(`/api/forum/create`, data);
}

function* forumCreate(action) {
  try {
    const result = yield call(forumCreateAPI, action.data);

    yield put({
      type: FORUM_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FORUM_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function forumUpdateAPI(data) {
  return await axios.post(`/api/forum/update`, data);
}

function* forumUpdate(action) {
  try {
    const result = yield call(forumUpdateAPI, action.data);

    yield put({
      type: FORUM_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FORUM_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function forumDeleteAPI(data) {
  return await axios.post(`/api/forum/delete`, data);
}

function* forumDelete(action) {
  try {
    const result = yield call(forumDeleteAPI, action.data);

    yield put({
      type: FORUM_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FORUM_DELETE_FAILURE,
      error: err.response.data,
    });
  }
}

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function forumHistoryListAPI(data) {
  return await axios.post(`/api/forum/history/list`, data);
}

function* forumHistoryList(action) {
  try {
    const result = yield call(forumHistoryListAPI, action.data);

    yield put({
      type: FORUM_HISTORY_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FORUM_HISTORY_LIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchForumList() {
  yield takeLatest(FORUM_LIST_REQUEST, forumList);
}
function* watchForumAdminList() {
  yield takeLatest(FORUM_ADMIN_LIST_REQUEST, forumAdminList);
}
function* watchForumDetail() {
  yield takeLatest(FORUM_DETAIL_REQUEST, forumDetail);
}
function* watchForumCreate() {
  yield takeLatest(FORUM_CREATE_REQUEST, forumCreate);
}
function* watchForumUpdate() {
  yield takeLatest(FORUM_UPDATE_REQUEST, forumUpdate);
}
function* watchForumDelete() {
  yield takeLatest(FORUM_DELETE_REQUEST, forumDelete);
}
function* watchForumHistoryList() {
  yield takeLatest(FORUM_HISTORY_LIST_REQUEST, forumHistoryList);
}

//////////////////////////////////////////////////////////////
export default function* forumSaga() {
  yield all([
    fork(watchForumList),
    fork(watchForumAdminList),
    fork(watchForumDetail),
    fork(watchForumCreate),
    fork(watchForumUpdate),
    fork(watchForumDelete),
    fork(watchForumHistoryList),

    //
  ]);
}
