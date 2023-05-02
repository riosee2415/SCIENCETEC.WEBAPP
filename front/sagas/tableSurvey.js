import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  TABLE_SURVEY_LIST_REQUEST,
  TABLE_SURVEY_LIST_SUCCESS,
  TABLE_SURVEY_LIST_FAILURE,
  //
  TABLE_SURVEY_CREATE_REQUEST,
  TABLE_SURVEY_CREATE_SUCCESS,
  TABLE_SURVEY_CREATE_FAILURE,
} from "../reducers/tableSurvey";

// ******************************************************************************************************************
// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function tableSurveyListAPI(data) {
  return await axios.post(`/api/tableSurvey/list`, data);
}

function* tableSurveyList(action) {
  try {
    const result = yield call(tableSurveyListAPI, action.data);

    yield put({
      type: TABLE_SURVEY_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: TABLE_SURVEY_LIST_FAILURE,
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
async function tableSurveyCreateAPI(data) {
  return await axios.post(`/api/tableSurvey/create`, data);
}

function* tableSurveyCreate(action) {
  try {
    const result = yield call(tableSurveyCreateAPI, action.data);

    yield put({
      type: TABLE_SURVEY_CREATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: TABLE_SURVEY_CREATE_FAILURE,
      error: err.response.data,
    });
  }
}
// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////
function* watchTableSurveyList() {
  yield takeLatest(TABLE_SURVEY_LIST_REQUEST, tableSurveyList);
}

function* watchTableSurveyCreate() {
  yield takeLatest(TABLE_SURVEY_CREATE_REQUEST, tableSurveyCreate);
}

//////////////////////////////////////////////////////////////
export default function* tableSurveySaga() {
  yield all([
    fork(watchTableSurveyList),
    fork(watchTableSurveyCreate),
    //
  ]);
}
