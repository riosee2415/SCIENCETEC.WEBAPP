import produce from "../util/produce";

export const initailState = {
  quesList: [], // 프론트 질문
  innerList: [], // 프론트 답변

  surveyQuesList: [], // 관리자 질문
  surveyInnerList: null, // 관리자 답변
  surveyHistoryList: [],
  surveyFilePath: null, // 파일
  surveyUserList: [], // 관리자
  surveyUserDetail: null,
  //
  st_surveyListLoading: false, // survey 가져오기
  st_surveyListDone: false,
  st_surveyListError: null,
  //
  st_surveyQuesListLoading: false, // surveyQues 가져오기
  st_surveyQuesListDone: false,
  st_surveyQuesListError: null,
  //
  st_surveyQuesCreateLoading: false, // surveyQues 생성하기
  st_surveyQuesCreateDone: false,
  st_surveyQuesCreateError: null,
  //
  st_surveyQuesUpdateLoading: false, // surveyQues 수정하기
  st_surveyQuesUpdateDone: false,
  st_surveyQuesUpdateError: null,
  //
  st_surveyQuesDeleteLoading: false, // surveyQues 삭제하기
  st_surveyQuesDeleteDone: false,
  st_surveyQuesDeleteError: null,
  //
  st_surveyInnerListLoading: false, // surveyInner 가져오기
  st_surveyInnerListDone: false,
  st_surveyInnerListError: null,
  //
  st_surveyInnerCreateLoading: false, // surveyInner 생성하기
  st_surveyInnerCreateDone: false,
  st_surveyInnerCreateError: null,
  //
  st_surveyInnerUpdateLoading: false, // surveyInner 수정하기
  st_surveyInnerUpdateDone: false,
  st_surveyInnerUpdateError: null,
  //
  st_surveyInnerDeleteLoading: false, // surveyInner 삭제하기
  st_surveyInnerDeleteDone: false,
  st_surveyInnerDeleteError: null,
  //
  st_surveyUserListLoading: false,
  st_surveyUserListDone: false,
  st_surveyUserListError: null,
  //
  st_surveyUserDetailLoading: false,
  st_surveyUserDetailDone: false,
  st_surveyUserDetailError: null,
  //
  st_surveyUserCreateLoading: false, // 회원에게 넘기기
  st_surveyUserCreateDone: false,
  st_surveyUserCreateError: null,
  //
  st_surveyUserUpdateLoading: false, // 확인처린
  st_surveyUserUpdateDone: false,
  st_surveyUserUpdateError: null,
  //
  st_surveyHistoryListLoading: false, // survey 이력
  st_surveyHistoryListDone: false,
  st_surveyHistoryListError: null,
  //
  st_surveyFileUploadLoading: false, // 파일 업로드
  st_surveyFileUploadDone: false,
  st_surveyFileUploadError: null,
};

export const SURVEY_LIST_REQUEST = "SURVEY_LIST_REQUEST";
export const SURVEY_LIST_SUCCESS = "SURVEY_LIST_SUCCESS";
export const SURVEY_LIST_FAILURE = "SURVEY_LIST_FAILURE";

export const SURVEY_QUES_LIST_REQUEST = "SURVEY_QUES_LIST_REQUEST";
export const SURVEY_QUES_LIST_SUCCESS = "SURVEY_QUES_LIST_SUCCESS";
export const SURVEY_QUES_LIST_FAILURE = "SURVEY_QUES_LIST_FAILURE";

export const SURVEY_QUES_CREATE_REQUEST = "SURVEY_QUES_CREATE_REQUEST";
export const SURVEY_QUES_CREATE_SUCCESS = "SURVEY_QUES_CREATE_SUCCESS";
export const SURVEY_QUES_CREATE_FAILURE = "SURVEY_QUES_CREATE_FAILURE";

export const SURVEY_QUES_UPDATE_REQUEST = "SURVEY_QUES_UPDATE_REQUEST";
export const SURVEY_QUES_UPDATE_SUCCESS = "SURVEY_QUES_UPDATE_SUCCESS";
export const SURVEY_QUES_UPDATE_FAILURE = "SURVEY_QUES_UPDATE_FAILURE";

export const SURVEY_QUES_DELETE_REQUEST = "SURVEY_QUES_DELETE_REQUEST";
export const SURVEY_QUES_DELETE_SUCCESS = "SURVEY_QUES_DELETE_SUCCESS";
export const SURVEY_QUES_DELETE_FAILURE = "SURVEY_QUES_DELETE_FAILURE";

export const SURVEY_INNER_LIST_REQUEST = "SURVEY_INNER_LIST_REQUEST";
export const SURVEY_INNER_LIST_SUCCESS = "SURVEY_INNER_LIST_SUCCESS";
export const SURVEY_INNER_LIST_FAILURE = "SURVEY_INNER_LIST_FAILURE";

export const SURVEY_INNER_CREATE_REQUEST = "SURVEY_INNER_CREATE_REQUEST";
export const SURVEY_INNER_CREATE_SUCCESS = "SURVEY_INNER_CREATE_SUCCESS";
export const SURVEY_INNER_CREATE_FAILURE = "SURVEY_INNER_CREATE_FAILURE";

export const SURVEY_INNER_UPDATE_REQUEST = "SURVEY_INNER_UPDATE_REQUEST";
export const SURVEY_INNER_UPDATE_SUCCESS = "SURVEY_INNER_UPDATE_SUCCESS";
export const SURVEY_INNER_UPDATE_FAILURE = "SURVEY_INNER_UPDATE_FAILURE";

export const SURVEY_INNER_DELETE_REQUEST = "SURVEY_INNER_DELETE_REQUEST";
export const SURVEY_INNER_DELETE_SUCCESS = "SURVEY_INNER_DELETE_SUCCESS";
export const SURVEY_INNER_DELETE_FAILURE = "SURVEY_INNER_DELETE_FAILURE";

export const SURVEY_USER_LIST_REQUEST = "SURVEY_USER_LIST_REQUEST";
export const SURVEY_USER_LIST_SUCCESS = "SURVEY_USER_LIST_SUCCESS";
export const SURVEY_USER_LIST_FAILURE = "SURVEY_USER_LIST_FAILURE";

export const SURVEY_USER_DETAIL_REQUEST = "SURVEY_USER_DETAIL_REQUEST";
export const SURVEY_USER_DETAIL_SUCCESS = "SURVEY_USER_DETAIL_SUCCESS";
export const SURVEY_USER_DETAIL_FAILURE = "SURVEY_USER_DETAIL_FAILURE";

export const SURVEY_USER_CREATE_REQUEST = "SURVEY_USER_CREATE_REQUEST";
export const SURVEY_USER_CREATE_SUCCESS = "SURVEY_USER_CREATE_SUCCESS";
export const SURVEY_USER_CREATE_FAILURE = "SURVEY_USER_CREATE_FAILURE";

export const SURVEY_USER_UPDATE_REQUEST = "SURVEY_USER_UPDATE_REQUEST";
export const SURVEY_USER_UPDATE_SUCCESS = "SURVEY_USER_UPDATE_SUCCESS";
export const SURVEY_USER_UPDATE_FAILURE = "SURVEY_USER_UPDATE_FAILURE";

export const SURVEY_HISTORY_LIST_REQUEST = "SURVEY_HISTORY_LIST_REQUEST";
export const SURVEY_HISTORY_LIST_SUCCESS = "SURVEY_HISTORY_LIST_SUCCESS";
export const SURVEY_HISTORY_LIST_FAILURE = "SURVEY_HISTORY_LIST_FAILURE";

export const FILE_UPLOAD_REQUEST = "FILE_UPLOAD_REQUEST";
export const FILE_UPLOAD_SUCCESS = "FILE_UPLOAD_SUCCESS";
export const FILE_UPLOAD_FAILURE = "FILE_UPLOAD_FAILURE";

export const INNER_RESET = "INNER_RESET";

export const FILE_RESET = "FILE_RESET";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SURVEY_LIST_REQUEST: {
        draft.st_surveyListLoading = true;
        draft.st_surveyListDone = false;
        draft.st_surveyListError = null;
        break;
      }
      case SURVEY_LIST_SUCCESS: {
        draft.st_surveyListLoading = false;
        draft.st_surveyListDone = true;
        draft.st_surveyListError = null;
        draft.quesList = action.data.question;
        draft.innerList = action.data.innerQuestion;
        break;
      }
      case SURVEY_LIST_FAILURE: {
        draft.st_surveyListLoading = false;
        draft.st_surveyListDone = false;
        draft.st_surveyListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case SURVEY_QUES_LIST_REQUEST: {
        draft.st_surveyQuesListLoading = true;
        draft.st_surveyQuesListDone = false;
        draft.st_surveyQuesListError = null;
        break;
      }
      case SURVEY_QUES_LIST_SUCCESS: {
        draft.st_surveyQuesListLoading = false;
        draft.st_surveyQuesListDone = true;
        draft.st_surveyQuesListError = null;
        draft.surveyQuesList = action.data;
        break;
      }
      case SURVEY_QUES_LIST_FAILURE: {
        draft.st_surveyQuesListLoading = false;
        draft.st_surveyQuesListDone = false;
        draft.st_surveyQuesListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case SURVEY_QUES_CREATE_REQUEST: {
        draft.st_surveyQuesCreateLoading = true;
        draft.st_surveyQuesCreateDone = false;
        draft.st_surveyQuesCreateError = null;
        break;
      }
      case SURVEY_QUES_CREATE_SUCCESS: {
        draft.st_surveyQuesCreateLoading = false;
        draft.st_surveyQuesCreateDone = true;
        draft.st_surveyQuesCreateError = null;
        break;
      }
      case SURVEY_QUES_CREATE_FAILURE: {
        draft.st_surveyQuesCreateLoading = false;
        draft.st_surveyQuesCreateDone = false;
        draft.st_surveyQuesCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case SURVEY_QUES_UPDATE_REQUEST: {
        draft.st_surveyQuesUpdateLoading = true;
        draft.st_surveyQuesUpdateDone = false;
        draft.st_surveyQuesUpdateError = null;
        break;
      }
      case SURVEY_QUES_UPDATE_SUCCESS: {
        draft.st_surveyQuesUpdateLoading = false;
        draft.st_surveyQuesUpdateDone = true;
        draft.st_surveyQuesUpdateError = null;
        break;
      }
      case SURVEY_QUES_UPDATE_FAILURE: {
        draft.st_surveyQuesUpdateLoading = false;
        draft.st_surveyQuesUpdateDone = false;
        draft.st_surveyQuesUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case SURVEY_QUES_DELETE_REQUEST: {
        draft.st_surveyQuesDeleteLoading = true;
        draft.st_surveyQuesDeleteDone = false;
        draft.st_surveyQuesDeleteError = null;
        break;
      }
      case SURVEY_QUES_DELETE_SUCCESS: {
        draft.st_surveyQuesDeleteLoading = false;
        draft.st_surveyQuesDeleteDone = true;
        draft.st_surveyQuesDeleteError = null;
        break;
      }
      case SURVEY_QUES_DELETE_FAILURE: {
        draft.st_surveyQuesDeleteLoading = false;
        draft.st_surveyQuesDeleteDone = false;
        draft.st_surveyQuesDeleteError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case SURVEY_INNER_LIST_REQUEST: {
        draft.st_surveyInnerListLoading = true;
        draft.st_surveyInnerListDone = false;
        draft.st_surveyInnerListError = null;
        break;
      }
      case SURVEY_INNER_LIST_SUCCESS: {
        draft.st_surveyInnerListLoading = false;
        draft.st_surveyInnerListDone = true;
        draft.st_surveyInnerListError = null;
        draft.surveyInnerList = action.data;
        break;
      }
      case SURVEY_INNER_LIST_FAILURE: {
        draft.st_surveyInnerListLoading = false;
        draft.st_surveyInnerListDone = false;
        draft.st_surveyInnerListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case SURVEY_INNER_CREATE_REQUEST: {
        draft.st_surveyInnerCreateLoading = true;
        draft.st_surveyInnerCreateDone = false;
        draft.st_surveyInnerCreateError = null;
        break;
      }
      case SURVEY_INNER_CREATE_SUCCESS: {
        draft.st_surveyInnerCreateLoading = false;
        draft.st_surveyInnerCreateDone = true;
        draft.st_surveyInnerCreateError = null;
        break;
      }
      case SURVEY_INNER_CREATE_FAILURE: {
        draft.st_surveyInnerCreateLoading = false;
        draft.st_surveyInnerCreateDone = false;
        draft.st_surveyInnerCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case SURVEY_INNER_UPDATE_REQUEST: {
        draft.st_surveyInnerUpdateLoading = true;
        draft.st_surveyInnerUpdateDone = false;
        draft.st_surveyInnerUpdateError = null;
        break;
      }
      case SURVEY_INNER_UPDATE_SUCCESS: {
        draft.st_surveyInnerUpdateLoading = false;
        draft.st_surveyInnerUpdateDone = true;
        draft.st_surveyInnerUpdateError = null;
        break;
      }
      case SURVEY_INNER_UPDATE_FAILURE: {
        draft.st_surveyInnerUpdateLoading = false;
        draft.st_surveyInnerUpdateDone = false;
        draft.st_surveyInnerUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case SURVEY_INNER_DELETE_REQUEST: {
        draft.st_surveyInnerDeleteLoading = true;
        draft.st_surveyInnerDeleteDone = false;
        draft.st_surveyInnerDeleteError = null;
        break;
      }
      case SURVEY_INNER_DELETE_SUCCESS: {
        draft.st_surveyInnerDeleteLoading = false;
        draft.st_surveyInnerDeleteDone = true;
        draft.st_surveyInnerDeleteError = null;
        break;
      }
      case SURVEY_INNER_DELETE_FAILURE: {
        draft.st_surveyInnerDeleteLoading = false;
        draft.st_surveyInnerDeleteDone = false;
        draft.st_surveyInnerDeleteError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case SURVEY_USER_LIST_REQUEST: {
        draft.st_surveyUserListLoading = true;
        draft.st_surveyUserListDone = false;
        draft.st_surveyUserListError = null;
        break;
      }
      case SURVEY_USER_LIST_SUCCESS: {
        draft.st_surveyUserListLoading = false;
        draft.st_surveyUserListDone = true;
        draft.st_surveyUserListError = null;
        draft.surveyUserList = action.data;
        break;
      }
      case SURVEY_USER_LIST_FAILURE: {
        draft.st_surveyUserListLoading = false;
        draft.st_surveyUserListDone = false;
        draft.st_surveyUserListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case SURVEY_USER_DETAIL_REQUEST: {
        draft.st_surveyUserDetailLoading = true;
        draft.st_surveyUserDetailDone = false;
        draft.st_surveyUserDetailError = null;
        break;
      }
      case SURVEY_USER_DETAIL_SUCCESS: {
        draft.st_surveyUserDetailLoading = false;
        draft.st_surveyUserDetailDone = true;
        draft.st_surveyUserDetailError = null;
        draft.surveyUserDetail = action.data;
        break;
      }
      case SURVEY_USER_DETAIL_FAILURE: {
        draft.st_surveyUserDetailLoading = false;
        draft.st_surveyUserDetailDone = false;
        draft.st_surveyUserDetailError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case SURVEY_USER_CREATE_REQUEST: {
        draft.st_surveyUserCreateLoading = true;
        draft.st_surveyUserCreateDone = false;
        draft.st_surveyUserCreateError = null;
        break;
      }
      case SURVEY_USER_CREATE_SUCCESS: {
        draft.st_surveyUserCreateLoading = false;
        draft.st_surveyUserCreateDone = true;
        draft.st_surveyUserCreateError = null;
        break;
      }
      case SURVEY_USER_CREATE_FAILURE: {
        draft.st_surveyUserCreateLoading = false;
        draft.st_surveyUserCreateDone = false;
        draft.st_surveyUserCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case SURVEY_USER_UPDATE_REQUEST: {
        draft.st_surveyUserUpdateLoading = true;
        draft.st_surveyUserUpdateDone = false;
        draft.st_surveyUserUpdateError = null;
        break;
      }
      case SURVEY_USER_UPDATE_SUCCESS: {
        draft.st_surveyUserUpdateLoading = false;
        draft.st_surveyUserUpdateDone = true;
        draft.st_surveyUserUpdateError = null;
        break;
      }
      case SURVEY_USER_UPDATE_FAILURE: {
        draft.st_surveyUserUpdateLoading = false;
        draft.st_surveyUserUpdateDone = false;
        draft.st_surveyUserUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case SURVEY_HISTORY_LIST_REQUEST: {
        draft.st_surveyHistoryListLoading = true;
        draft.st_surveyHistoryListDone = false;
        draft.st_surveyHistoryListError = null;
        break;
      }
      case SURVEY_HISTORY_LIST_SUCCESS: {
        draft.st_surveyHistoryListLoading = false;
        draft.st_surveyHistoryListDone = true;
        draft.st_surveyHistoryListError = null;
        draft.surveyHistoryList = action.data;
        break;
      }
      case SURVEY_HISTORY_LIST_FAILURE: {
        draft.st_surveyHistoryListLoading = false;
        draft.st_surveyHistoryListDone = false;
        draft.st_surveyHistoryListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case FILE_UPLOAD_REQUEST: {
        draft.st_surveyFileUploadLoading = true;
        draft.st_surveyFileUploadDone = false;
        draft.st_surveyFileUploadError = null;
        break;
      }
      case FILE_UPLOAD_SUCCESS: {
        draft.st_surveyFileUploadLoading = false;
        draft.st_surveyFileUploadDone = true;
        draft.st_surveyFileUploadError = null;
        draft.surveyFilePath = action.data.path;
        break;
      }
      case FILE_UPLOAD_FAILURE: {
        draft.st_surveyFileUploadLoading = false;
        draft.st_surveyFileUploadDone = false;
        draft.st_surveyFileUploadError = action.error;
        break;
      }

      //////////////////////////////////////////////

      case INNER_RESET: {
        draft.surveyInnerList = null;
        break;
      }

      case FILE_RESET: {
        draft.surveyFilePath = action.data;
      }

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
