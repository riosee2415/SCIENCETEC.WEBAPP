import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  SURVEY_LIST_REQUEST,
  SURVEY_LIST_SUCCESS,
  SURVEY_LIST_FAILURE,
  //
  SURVEY_QUES_LIST_REQUEST,
  SURVEY_QUES_LIST_SUCCESS,
  SURVEY_QUES_LIST_FAILURE,
  //
  SURVEY_QUES_CREATE_REQUEST,
  SURVEY_QUES_CREATE_SUCCESS,
  SURVEY_QUES_CREATE_FAILURE,
  //
  SURVEY_QUES_UPDATE_REQUEST,
  SURVEY_QUES_UPDATE_SUCCESS,
  SURVEY_QUES_UPDATE_FAILURE,
  //
  SURVEY_QUES_DELETE_REQUEST,
  SURVEY_QUES_DELETE_SUCCESS,
  SURVEY_QUES_DELETE_FAILURE,
  //
  SURVEY_INNER_LIST_REQUEST,
  SURVEY_INNER_LIST_SUCCESS,
  SURVEY_INNER_LIST_FAILURE,
  //
  SURVEY_INNER_CREATE_REQUEST,
  SURVEY_INNER_CREATE_SUCCESS,
  SURVEY_INNER_CREATE_FAILURE,
  //
  SURVEY_INNER_UPDATE_REQUEST,
  SURVEY_INNER_UPDATE_SUCCESS,
  SURVEY_INNER_UPDATE_FAILURE,
  //
  SURVEY_INNER_DELETE_REQUEST,
  SURVEY_INNER_DELETE_SUCCESS,
  SURVEY_INNER_DELETE_FAILURE,
  //
  SURVEY_USER_CREATE_REQUEST,
  SURVEY_USER_CREATE_SUCCESS,
  SURVEY_USER_CREATE_FAILURE,
  //
  SURVEY_HISTORY_LIST_REQUEST,
  SURVEY_HISTORY_LIST_SUCCESS,
  SURVEY_HISTORY_LIST_FAILURE,
} from "../reducers/survey";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function surveyListAPI(data) {
  return await axios.post(`/api/survey/list`, data);
}

function* surveyList(action) {
  try {
    const result = yield call(surveyListAPI, action.data);

    yield put({
      type: SURVEY_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SURVEY_LIST_FAILURE,
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
async function surveyQuesListAPI(data) {
  return await axios.post(`/api/survey/question/list`, data);
}

function* surveyQuesList(action) {
  try {
    const result = yield call(surveyQuesListAPI, action.data);

    yield put({
      type: SURVEY_QUES_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SURVEY_QUES_LIST_FAILURE,
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
async function surveyQuesCreateAPI(data) {
  return await axios.post(`/api/survey/question/create`, data);
}

function* surveyQuesCreate(action) {
  try {
    const result = yield call(surveyQuesCreateAPI, action.data);

    yield put({
      type: SURVEY_QUES_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SURVEY_QUES_CREATE_FAILURE,
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
async function surveyQuesUpdateAPI(data) {
  return await axios.post(`/api/survey/question/update`, data);
}

function* surveyQuesUpdate(action) {
  try {
    const result = yield call(surveyQuesUpdateAPI, action.data);

    yield put({
      type: SURVEY_QUES_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SURVEY_QUES_UPDATE_FAILURE,
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
async function surveyQuesDeleteAPI(data) {
  return await axios.post(`/api/survey/question/delete`, data);
}

function* surveyQuesDelete(action) {
  try {
    const result = yield call(surveyQuesDeleteAPI, action.data);

    yield put({
      type: SURVEY_QUES_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SURVEY_QUES_DELETE_FAILURE,
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
async function surveyInnerListAPI(data) {
  return await axios.post(`/api/survey/inner/list`, data);
}

function* surveyInnerList(action) {
  try {
    const result = yield call(surveyInnerListAPI, action.data);

    yield put({
      type: SURVEY_INNER_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SURVEY_INNER_LIST_FAILURE,
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
async function surveyInnerCreateAPI(data) {
  return await axios.post(`/api/survey/inner/create`, data);
}

function* surveyInnerCreate(action) {
  try {
    const result = yield call(surveyInnerCreateAPI, action.data);

    yield put({
      type: SURVEY_INNER_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SURVEY_INNER_CREATE_FAILURE,
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
async function surveyInnerUpdateAPI(data) {
  return await axios.post(`/api/survey/inner/update`, data);
}

function* surveyInnerUpdate(action) {
  try {
    const result = yield call(surveyInnerUpdateAPI, action.data);

    yield put({
      type: SURVEY_INNER_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SURVEY_INNER_UPDATE_FAILURE,
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
async function surveyInnerDeleteAPI(data) {
  return await axios.post(`/api/survey/inner/delete`, data);
}

function* surveyInnerDelete(action) {
  try {
    const result = yield call(surveyInnerDeleteAPI, action.data);

    yield put({
      type: SURVEY_INNER_DELETE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SURVEY_INNER_DELETE_FAILURE,
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
async function surveyUserCreateAPI(data) {
  return await axios.post(`/api/survey/user/create`, data);
}

function* surveyUserCreate(action) {
  try {
    const result = yield call(surveyUserCreateAPI, action.data);

    yield put({
      type: SURVEY_USER_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SURVEY_USER_CREATE_FAILURE,
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
async function surveyHistoryListAPI(data) {
  return await axios.post(`/api/survey/history/list`, data);
}

function* surveyHistoryList(action) {
  try {
    const result = yield call(surveyHistoryListAPI, action.data);

    yield put({
      type: SURVEY_HISTORY_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SURVEY_HISTORY_LIST_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchSurveyList() {
  yield takeLatest(SURVEY_LIST_REQUEST, surveyList);
}
function* watchSurveyQuesList() {
  yield takeLatest(SURVEY_QUES_LIST_REQUEST, surveyQuesList);
}
function* watchSurveyQuesCreate() {
  yield takeLatest(SURVEY_QUES_CREATE_REQUEST, surveyQuesCreate);
}
function* watchSurveyQuesUpdate() {
  yield takeLatest(SURVEY_QUES_UPDATE_REQUEST, surveyQuesUpdate);
}
function* watchSurveyQuesDelete() {
  yield takeLatest(SURVEY_QUES_DELETE_REQUEST, surveyQuesDelete);
}
function* watchSurveyInnerList() {
  yield takeLatest(SURVEY_INNER_LIST_REQUEST, surveyInnerList);
}
function* watchSurveyInnerCreate() {
  yield takeLatest(SURVEY_INNER_CREATE_REQUEST, surveyInnerCreate);
}
function* watchSurveyInnerUpdate() {
  yield takeLatest(SURVEY_INNER_UPDATE_REQUEST, surveyInnerUpdate);
}
function* watchSurveyInnerDelete() {
  yield takeLatest(SURVEY_INNER_DELETE_REQUEST, surveyInnerDelete);
}
function* watchSurveyUserCreate() {
  yield takeLatest(SURVEY_USER_CREATE_REQUEST, surveyUserCreate);
}
function* watchSurveyHistoryList() {
  yield takeLatest(SURVEY_HISTORY_LIST_REQUEST, surveyHistoryList);
}

//////////////////////////////////////////////////////////////
export default function* surveySaga() {
  yield all([
    fork(watchSurveyList),
    fork(watchSurveyQuesList),
    fork(watchSurveyQuesCreate),
    fork(watchSurveyQuesUpdate),
    fork(watchSurveyQuesDelete),
    fork(watchSurveyInnerList),
    fork(watchSurveyInnerCreate),
    fork(watchSurveyInnerUpdate),
    fork(watchSurveyInnerDelete),
    fork(watchSurveyUserCreate),
    fork(watchSurveyHistoryList),

    //
  ]);
}
