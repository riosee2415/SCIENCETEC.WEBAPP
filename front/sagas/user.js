import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  //
  SNS_LOGIN_REQUEST,
  SNS_LOGIN_SUCCESS,
  SNS_LOGIN_FAILURE,
  //
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  //
  LOGIN_ADMIN_REQUEST,
  LOGIN_ADMIN_SUCCESS,
  LOGIN_ADMIN_FAILURE,
  //
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  //
  USERLIST_REQUEST,
  USERLIST_SUCCESS,
  USERLIST_FAILURE,
  //
  USERLIST_UPDATE_REQUEST,
  USERLIST_UPDATE_SUCCESS,
  USERLIST_UPDATE_FAILURE,
  //
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  //
  KAKAO_LOGIN_REQUEST,
  KAKAO_LOGIN_SUCCESS,
  KAKAO_LOGIN_FAILURE,
  //
  USER_HISTORY_REQUEST,
  USER_HISTORY_SUCCESS,
  USER_HISTORY_FAILURE,
  //
  MENURIGHT_UPDATE_REQUEST,
  MENURIGHT_UPDATE_SUCCESS,
  MENURIGHT_UPDATE_FAILURE,
  //
  ADMINUSERLIST_REQUEST,
  ADMINUSERLIST_SUCCESS,
  ADMINUSERLIST_FAILURE,
  //
  ADMINUSERRIGHT_HISTORY_REQUEST,
  ADMINUSERRIGHT_HISTORY_SUCCESS,
  ADMINUSERRIGHT_HISTORY_FAILURE,
  //
  ADMINUSER_EXITTRUE_REQUEST,
  ADMINUSER_EXITTRUE_SUCCESS,
  ADMINUSER_EXITTRUE_FAILURE,
  //
  ADMINUSER_EXITFALSE_REQUEST,
  ADMINUSER_EXITFALSE_SUCCESS,
  ADMINUSER_EXITFALSE_FAILURE,
  //
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAILURE,
  //
  STATUS_LIST_REQUEST,
  STATUS_LIST_SUCCESS,
  STATUS_LIST_FAILURE,
  //
  FIND_ID_REQUEST,
  FIND_ID_SUCCESS,
  FIND_ID_FAILURE,
  //
  FIND_PW_REQUEST,
  FIND_PW_SUCCESS,
  FIND_PW_FAILURE,
  //
  CHECK_CODE_REQUEST,
  CHECK_CODE_SUCCESS,
  CHECK_CODE_FAILURE,
  //
  PW_UPDATE_REQUEST,
  PW_UPDATE_SUCCESS,
  PW_UPDATE_FAILURE,
  //
  USER_MAIN_REQUEST,
  USER_MAIN_SUCCESS,
  USER_MAIN_FAILURE,
  //
  USER_GOOGLE_REQUEST,
  USER_GOOGLE_SUCCESS,
  USER_GOOGLE_FAILURE,
  //
  USER_EXIT_REQUEST,
  USER_EXIT_SUCCESS,
  USER_EXIT_FAILURE,
  //
  USER_INFO_UPDATE_REQUEST,
  USER_INFO_UPDATE_SUCCESS,
  USER_INFO_UPDATE_FAILURE,
} from "../reducers/user";

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function loadMyInfoAPI(data) {
  return await axios.get("/api/user/signin", data);
}

function* loadMyInfo(action) {
  try {
    const result = yield call(loadMyInfoAPI, action.data);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function signinAPI(data) {
  return await axios.post(`/api/user/signin`, data);
}

function* signin(action) {
  try {
    const result = yield call(signinAPI, action.data);
    yield put({
      type: LOGIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOGIN_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function snsLoginAPI(data) {
  return await axios.post(`/api/user/snsLogin`, data);
}

function* snsLogin(action) {
  try {
    const result = yield call(snsLoginAPI, action.data);
    yield put({
      type: SNS_LOGIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SNS_LOGIN_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function logoutAPI(data) {
  return await axios.get(`/api/user/logout`, data);
}

function* logout(action) {
  try {
    const result = yield call(logoutAPI, action.data);
    yield put({
      type: LOGOUT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOGOUT_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function signinAdminPI(data) {
  return await axios.post(`/api/user/signin/admin`, data);
}

function* signinAdmin(action) {
  try {
    const result = yield call(signinAdminPI, action.data);
    yield put({
      type: LOGIN_ADMIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOGIN_ADMIN_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function signUpAPI(data) {
  return await axios.post(`/api/user/signup`, data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    yield put({
      type: SIGNUP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGNUP_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function userListAPI(data) {
  return await axios.post(`/api/user/list`, data);
}

function* userList(action) {
  try {
    const result = yield call(userListAPI, action.data);
    yield put({
      type: USERLIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USERLIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function userListUpdateAPI(data) {
  return await axios.patch(`/api/user/level/update`, data);
}

function* userListUpdate(action) {
  try {
    const result = yield call(userListUpdateAPI, action.data);
    yield put({
      type: USERLIST_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USERLIST_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function kakaoLoginAPI() {
  return await axios.get(`/api/user/kakaoLogin`);
}

function* kakaoLogin() {
  try {
    const result = yield call(kakaoLoginAPI);

    yield put({
      type: KAKAO_LOGIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: KAKAO_LOGIN_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function userHistoryAPI(data) {
  return await axios.post(`/api/user/history/list`, data);
}

function* userHistory(action) {
  try {
    const result = yield call(userHistoryAPI, action.data);

    yield put({
      type: USER_HISTORY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_HISTORY_FAILURE,
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
async function menuRightUpAPI(data) {
  return await axios.post(`/api/user/update/menuRight`, data);
}

function* menuRightUp(action) {
  try {
    const result = yield call(menuRightUpAPI, action.data);

    yield put({
      type: MENURIGHT_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MENURIGHT_UPDATE_FAILURE,
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
async function adminUserListAPI(data) {
  return await axios.post("/api/user/adminList", data);
}

function* adminUserList(action) {
  try {
    const result = yield call(adminUserListAPI, action.data);
    yield put({
      type: ADMINUSERLIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADMINUSERLIST_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function adminUserRightHistoryAPI(data) {
  return await axios.post(`/api/user/adminUserRight/history/list`, data);
}

function* adminUserRightHistoryList(action) {
  try {
    const result = yield call(adminUserRightHistoryAPI, action.data);

    yield put({
      type: ADMINUSERRIGHT_HISTORY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADMINUSERRIGHT_HISTORY_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function adminUserExitTrueAPI(data) {
  return await axios.post(`/api/user/exit/update/true`, data);
}

function* adminUserExitTrue(action) {
  try {
    const result = yield call(adminUserExitTrueAPI, action.data);

    yield put({
      type: ADMINUSER_EXITTRUE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADMINUSER_EXITTRUE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function adminUserExitFalseAPI(data) {
  return await axios.post(`/api/user/exit/update/false`, data);
}

function* adminUserExitFalse(action) {
  try {
    const result = yield call(adminUserExitFalseAPI, action.data);

    yield put({
      type: ADMINUSER_EXITFALSE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADMINUSER_EXITFALSE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

// SAGA AREA ********************************************************************************************************
// ******************************************************************************************************************
async function userDetailAPI(data) {
  return await axios.post(`/api/user/detail`, data);
}

function* userDetail(action) {
  try {
    const result = yield call(userDetailAPI, action.data);

    yield put({
      type: USER_DETAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_DETAIL_FAILURE,
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
async function statusListAPI(data) {
  return await axios.post(`/api/user/status/list`, data);
}

function* statusList(action) {
  try {
    const result = yield call(statusListAPI, action.data);

    yield put({
      type: STATUS_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: STATUS_LIST_FAILURE,
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
async function findIdAPI(data) {
  return await axios.post(`/api/user/findeUserId`, data);
}

function* findId(action) {
  try {
    const result = yield call(findIdAPI, action.data);

    yield put({
      type: FIND_ID_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FIND_ID_FAILURE,
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
async function findPwAPI(data) {
  return await axios.post(`/api/user/modifypass`, data);
}

function* findPw(action) {
  try {
    const result = yield call(findPwAPI, action.data);

    yield put({
      type: FIND_PW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: FIND_PW_FAILURE,
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
async function checkCodeAPI(data) {
  return await axios.post(`/api/user/checkSecret`, data);
}

function* checkCode(action) {
  try {
    const result = yield call(checkCodeAPI, action.data);

    yield put({
      type: CHECK_CODE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CHECK_CODE_FAILURE,
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
async function pwUpdateAPI(data) {
  return await axios.patch(`/api/user/modifypass/update`, data);
}

function* pwUpdate(action) {
  try {
    const result = yield call(pwUpdateAPI, action.data);

    yield put({
      type: PW_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: PW_UPDATE_FAILURE,
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
async function userMainAPI(data) {
  return await axios.post(`/api/user/admin/main`, data);
}

function* userMain(action) {
  try {
    const result = yield call(userMainAPI, action.data);
    yield put({
      type: USER_MAIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_MAIN_FAILURE,
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
async function userGoogleAPI(data) {
  return await axios.post(`/api/user/checkUser`, data);
}

function* userGoogle(action) {
  try {
    const result = yield call(userGoogleAPI, action.data);
    yield put({
      type: USER_GOOGLE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_GOOGLE_FAILURE,
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
async function userExitAPI(data) {
  return await axios.post(`/api/user/exit`, data);
}

function* userExit(action) {
  try {
    const result = yield call(userExitAPI, action.data);
    yield put({
      type: USER_EXIT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_EXIT_FAILURE,
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
async function userInfoUpdateAPI(data) {
  return await axios.post(`/api/user/update`, data);
}

function* userInfoUpdate(action) {
  try {
    const result = yield call(userInfoUpdateAPI, action.data);
    yield put({
      type: USER_INFO_UPDATE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER_INFO_UPDATE_FAILURE,
      error: err.response.data,
    });
  }
}

// ******************************************************************************************************************
// ******************************************************************************************************************
// ******************************************************************************************************************

//////////////////////////////////////////////////////////////

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchSignin() {
  yield takeLatest(LOGIN_REQUEST, signin);
}

function* watchSnsLogin() {
  yield takeLatest(SNS_LOGIN_REQUEST, snsLogin);
}

function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}

function* watchSigninAdmin() {
  yield takeLatest(LOGIN_ADMIN_REQUEST, signinAdmin);
}

function* watchSignUp() {
  yield takeLatest(SIGNUP_REQUEST, signUp);
}

function* watchUserList() {
  yield takeLatest(USERLIST_REQUEST, userList);
}

function* watchUserListUpdate() {
  yield takeLatest(USERLIST_UPDATE_REQUEST, userListUpdate);
}

function* watchKakaoLogin() {
  yield takeLatest(KAKAO_LOGIN_REQUEST, kakaoLogin);
}

function* watchUserHistory() {
  yield takeLatest(USER_HISTORY_REQUEST, userHistory);
}

function* watchMenuRightUp() {
  yield takeLatest(MENURIGHT_UPDATE_REQUEST, menuRightUp);
}

function* watchAdminUserList() {
  yield takeLatest(ADMINUSERLIST_REQUEST, adminUserList);
}

function* watchAdminUserRightHistoryList() {
  yield takeLatest(ADMINUSERRIGHT_HISTORY_REQUEST, adminUserRightHistoryList);
}

function* watchAdminUserExitTrue() {
  yield takeLatest(ADMINUSER_EXITTRUE_REQUEST, adminUserExitTrue);
}

function* watchAdminUserExitFalse() {
  yield takeLatest(ADMINUSER_EXITFALSE_REQUEST, adminUserExitFalse);
}

function* watchUserDetail() {
  yield takeLatest(USER_DETAIL_REQUEST, userDetail);
}

function* watchStatusList() {
  yield takeLatest(STATUS_LIST_REQUEST, statusList);
}

function* watchFindId() {
  yield takeLatest(FIND_ID_REQUEST, findId);
}

function* watchFindPw() {
  yield takeLatest(FIND_PW_REQUEST, findPw);
}

function* watchCheckCode() {
  yield takeLatest(CHECK_CODE_REQUEST, checkCode);
}

function* watchPwUpdate() {
  yield takeLatest(PW_UPDATE_REQUEST, pwUpdate);
}

function* watchUserMain() {
  yield takeLatest(USER_MAIN_REQUEST, userMain);
}

function* watchUserGoogle() {
  yield takeLatest(USER_GOOGLE_REQUEST, userGoogle);
}

function* watchUserExit() {
  yield takeLatest(USER_EXIT_REQUEST, userExit);
}

function* watchUserInfoUpdate() {
  yield takeLatest(USER_INFO_UPDATE_REQUEST, userInfoUpdate);
}

//////////////////////////////////////////////////////////////
export default function* userSaga() {
  yield all([
    fork(watchLoadMyInfo),
    fork(watchSignin),
    fork(watchSnsLogin),
    fork(watchLogout),
    fork(watchSigninAdmin),
    fork(watchSignUp),
    fork(watchUserList),
    fork(watchUserListUpdate),
    fork(watchKakaoLogin),
    fork(watchUserHistory),
    fork(watchMenuRightUp),
    fork(watchAdminUserList),
    fork(watchAdminUserRightHistoryList),
    fork(watchAdminUserExitTrue),
    fork(watchAdminUserExitFalse),
    fork(watchUserDetail),
    fork(watchStatusList),
    fork(watchFindId),
    fork(watchFindPw),
    fork(watchCheckCode),
    fork(watchPwUpdate),
    fork(watchUserMain),
    fork(watchUserGoogle),
    fork(watchUserExit),
    fork(watchUserInfoUpdate),
    //
  ]);
}
