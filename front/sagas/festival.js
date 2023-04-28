import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FESTIVAL_LIST_REQUEST,
  FESTIVAL_LIST_SUCCESS,
  FESTIVAL_LIST_FAILURE,
  //
  FESTIVAL_ADMIN_LIST_REQUEST,
  FESTIVAL_ADMIN_LIST_SUCCESS,
  FESTIVAL_ADMIN_LIST_FAILURE,
  //
  FESTIVAL_CREATE_REQUEST,
  FESTIVAL_CREATE_SUCCESS,
  FESTIVAL_CREATE_FAILURE,
  //
  FESTIVAL_UPDATE_REQUEST,
  FESTIVAL_UPDATE_SUCCESS,
  FESTIVAL_UPDATE_FAILURE,
  //
  FESTIVAL_ONOFF_REQUEST,
  FESTIVAL_ONOFF_SUCCESS,
  FESTIVAL_ONOFF_FAILURE,
  //
  FESTIVAL_DELETE_REQUEST,
  FESTIVAL_DELETE_SUCCESS,
  FESTIVAL_DELETE_FAILURE,
  //
  FESTIVAL_TICKET_LIST_REQUEST,
  FESTIVAL_TICKET_LIST_SUCCESS,
  FESTIVAL_TICKET_LIST_FAILURE,
  //
  FESTIVAL_TICKET_CREATE_REQUEST,
  FESTIVAL_TICKET_CREATE_SUCCESS,
  FESTIVAL_TICKET_CREATE_FAILURE,
  //
  FESTIVAL_HISTORY_REQUEST,
  FESTIVAL_HISTORY_SUCCESS,
  FESTIVAL_HISTORY_FAILURE,
} from "../reducers/festival";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function festivalListAPI(data) {
  return await axios.post(`/api/festival/list`, data);
}

function* festivalList(action) {
  try {
    const result = yield call(festivalListAPI, action.data);

    yield put({
      type: FESTIVAL_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FESTIVAL_LIST_FAILURE,
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
async function festivalAdminListAPI(data) {
  return await axios.post(`/api/festival/admin/list`, data);
}

function* festivalAdminList(action) {
  try {
    const result = yield call(festivalAdminListAPI, action.data);

    yield put({
      type: FESTIVAL_ADMIN_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FESTIVAL_ADMIN_LIST_FAILURE,
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
async function festivalCreateAPI(data) {
  return await axios.post(`/api/festival/create`, data);
}

function* festivalCreate(action) {
  try {
    const result = yield call(festivalCreateAPI, action.data);

    yield put({
      type: FESTIVAL_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FESTIVAL_CREATE_FAILURE,
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
async function festivalUpdateAPI(data) {
  return await axios.post(`/api/festival/update`, data);
}

function* festivalUpdate(action) {
  try {
    const result = yield call(festivalUpdateAPI, action.data);

    yield put({
      type: FESTIVAL_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FESTIVAL_UPDATE_FAILURE,
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
async function festivalOnOffAPI(data) {
  return await axios.post(`/api/festival/onOff`, data);
}

function* festivalOnOff(action) {
  try {
    const result = yield call(festivalOnOffAPI, action.data);

    yield put({
      type: FESTIVAL_ONOFF_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FESTIVAL_ONOFF_FAILURE,
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
async function festivalDeleteAPI(data) {
  return await axios.post(`/api/festival/delete`, data);
}

function* festivalDelete(action) {
  try {
    const result = yield call(festivalDeleteAPI, action.data);

    yield put({
      type: FESTIVAL_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FESTIVAL_DELETE_FAILURE,
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
async function festivalTicketListAPI(data) {
  return await axios.post(`/api/festival/ticket/list`, data);
}

function* festivalTicketList(action) {
  try {
    const result = yield call(festivalTicketListAPI, action.data);

    yield put({
      type: FESTIVAL_TICKET_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FESTIVAL_TICKET_LIST_FAILURE,
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
async function festivalTicketCreateAPI(data) {
  return await axios.post(`/api/festival/ticket/create`, data);
}

function* festivalTicketCreate(action) {
  try {
    const result = yield call(festivalTicketCreateAPI, action.data);

    yield put({
      type: FESTIVAL_TICKET_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FESTIVAL_TICKET_CREATE_FAILURE,
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
async function festivalHistoryAPI(data) {
  return await axios.post(`/api/festival/history/list`, data);
}

function* festivalHistory(action) {
  try {
    const result = yield call(festivalHistoryAPI, action.data);

    yield put({
      type: FESTIVAL_HISTORY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FESTIVAL_HISTORY_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

function* watchFestivalList() {
  yield takeLatest(FESTIVAL_LIST_REQUEST, festivalList);
}
function* watchFestivalAdminList() {
  yield takeLatest(FESTIVAL_ADMIN_LIST_REQUEST, festivalAdminList);
}
function* watchFestivalCreate() {
  yield takeLatest(FESTIVAL_CREATE_REQUEST, festivalCreate);
}
function* watchFestivalUpdate() {
  yield takeLatest(FESTIVAL_UPDATE_REQUEST, festivalUpdate);
}
function* watchFestivalOnOff() {
  yield takeLatest(FESTIVAL_ONOFF_REQUEST, festivalOnOff);
}
function* watchFestivalDelete() {
  yield takeLatest(FESTIVAL_DELETE_REQUEST, festivalDelete);
}
function* watchFestivalTicketList() {
  yield takeLatest(FESTIVAL_TICKET_LIST_REQUEST, festivalTicketList);
}
function* watchFestivalTicketCreate() {
  yield takeLatest(FESTIVAL_TICKET_CREATE_REQUEST, festivalTicketCreate);
}
function* watchFestivalHistory() {
  yield takeLatest(FESTIVAL_HISTORY_REQUEST, festivalHistory);
}

//////////////////////////////////////////////////////////////
export default function* festivalSaga() {
  yield all([
    fork(watchFestivalList),
    fork(watchFestivalAdminList),
    fork(watchFestivalCreate),
    fork(watchFestivalUpdate),
    fork(watchFestivalOnOff),
    fork(watchFestivalDelete),
    fork(watchFestivalTicketList),
    fork(watchFestivalTicketCreate),
    fork(watchFestivalHistory),
    //
  ]);
}
