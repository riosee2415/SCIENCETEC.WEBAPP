import produce from "../util/produce";

export const initailState = {
  shareProjects: [],

  previewImagePath1: null,
  previewImagePath2: null,

  shareProjectHistory: [],

  //
  underList: [], // 산하 리스트

  //
  st_shareProjectLoading: false,
  st_shareProjectDone: false,
  st_shareProjectError: null,
  //
  st_shareProjecthUpdateLoading: false, // 회원조합관리 수정
  st_shareProjecthUpdateDone: false,
  st_shareProjecthUpdateError: null,

  //
  st_shareProjecthImage1Loading: false, // 이미지 업로드1
  st_shareProjecthImage1Done: false,
  st_shareProjecthImage1Error: null,
  //
  st_shareProjecthImage2Loading: false, // 이미지 업로드2
  st_shareProjecthImage2Done: false,
  st_shareProjecthImage2Error: null,
  //
  st_shareProjectHistoryLoading: false, // 이력
  st_shareProjectHistoryDone: false,
  st_shareProjectHistoryError: null,
  //
  st_shareProjectCreateLoading: false, // 생성하기
  st_shareProjectCreateDone: false,
  st_shareProjectCreateError: null,
  //
  st_shareProjectDeleteLoading: false, // 삭제하기
  st_shareProjectDeleteDone: false,
  st_shareProjectDeleteError: null,

  //
  st_underListLoading: false, // under 가져오기
  st_underListDone: false,
  st_underListError: null,
  //
  st_underCreateLoading: false, // under 생성하기
  st_underCreateDone: false,
  st_underCreateError: null,
  //
  st_underUpdateLoading: false, // under 수정하기
  st_underUpdateDone: false,
  st_underUpdateError: null,
  //
  st_underDeleteLoading: false, // under 삭제하기
  st_underDeleteDone: false,
  st_underDeleteError: null,
  //
};

export const SHARE_PROJECT_REQUEST = "SHARE_PROJECT_REQUEST";
export const SHARE_PROJECT_SUCCESS = "SHARE_PROJECT_SUCCESS";
export const SHARE_PROJECT_FAILURE = "SHARE_PROJECT_FAILURE";

export const SHAREPROJECT_UPDATE_REQUEST = "SHAREPROJECT_UPDATE_REQUEST";
export const SHAREPROJECT_UPDATE_SUCCESS = "SHAREPROJECT_UPDATE_SUCCESS";
export const SHAREPROJECT_UPDATE_FAILURE = "SHAREPROJECT_UPDATE_FAILURE";

export const SHAREPROJECT_IMAGE1_REQUEST = "SHAREPROJECT_IMAGE1_REQUEST";
export const SHAREPROJECT_IMAGE1_SUCCESS = "SHAREPROJECT_IMAGE1_SUCCESS";
export const SHAREPROJECT_IMAGE1_FAILURE = "SHAREPROJECT_IMAGE1_FAILURE";

export const SHAREPROJECT_IMAGE2_REQUEST = "SHAREPROJECT_IMAGE2_REQUEST";
export const SHAREPROJECT_IMAGE2_SUCCESS = "SHAREPROJECT_IMAGE2_SUCCESS";
export const SHAREPROJECT_IMAGE2_FAILURE = "SHAREPROJECT_IMAGE2_FAILURE";

export const SHAREPROJECT_HISTORY_REQUEST = "SHAREPROJECT_HISTORY_REQUEST";
export const SHAREPROJECT_HISTORY_SUCCESS = "SHAREPROJECT_HISTORY_SUCCESS";
export const SHAREPROJECT_HISTORY_FAILURE = "SHAREPROJECT_HISTORY_FAILURE";

export const SHAREPROJECT_CREATE_REQUEST = "SHAREPROJECT_CREATE_REQUEST";
export const SHAREPROJECT_CREATE_SUCCESS = "SHAREPROJECT_CREATE_SUCCESS";
export const SHAREPROJECT_CREATE_FAILURE = "SHAREPROJECT_CREATE_FAILURE";

export const SHAREPROJECT_DELETE_REQUEST = "SHAREPROJECT_DELETE_REQUEST";
export const SHAREPROJECT_DELETE_SUCCESS = "SHAREPROJECT_DELETE_SUCCESS";
export const SHAREPROJECT_DELETE_FAILURE = "SHAREPROJECT_DELETE_FAILURE";

export const SHAREPROJECT_IMAGE_RESET = "SHAREPROJECT_IMAGE_RESET";

//

export const UNDER_LIST_REQUEST = "UNDER_LIST_REQUEST";
export const UNDER_LIST_SUCCESS = "UNDER_LIST_SUCCESS";
export const UNDER_LIST_FAILURE = "UNDER_LIST_FAILURE";

export const UNDER_CREATE_REQUEST = "UNDER_CREATE_REQUEST";
export const UNDER_CREATE_SUCCESS = "UNDER_CREATE_SUCCESS";
export const UNDER_CREATE_FAILURE = "UNDER_CREATE_FAILURE";

export const UNDER_UPDATE_REQUEST = "UNDER_UPDATE_REQUEST";
export const UNDER_UPDATE_SUCCESS = "UNDER_UPDATE_SUCCESS";
export const UNDER_UPDATE_FAILURE = "UNDER_UPDATE_FAILURE";

export const UNDER_DELETE_REQUEST = "UNDER_DELETE_REQUEST";
export const UNDER_DELETE_SUCCESS = "UNDER_DELETE_SUCCESS";
export const UNDER_DELETE_FAILURE = "UNDER_DELETE_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SHARE_PROJECT_REQUEST: {
        draft.st_shareProjectLoading = true;
        draft.st_shareProjectDone = false;
        draft.st_shareProjectError = null;
        break;
      }
      case SHARE_PROJECT_SUCCESS: {
        draft.st_shareProjectLoading = false;
        draft.st_shareProjectDone = true;
        draft.st_shareProjectError = null;
        draft.shareProjects = action.data;
        break;
      }
      case SHARE_PROJECT_FAILURE: {
        draft.st_shareProjectLoading = false;
        draft.st_shareProjectDone = false;
        draft.st_shareProjectError = action.data;
        break;
      }

      //////////////////////////////////////////////////////
      case SHAREPROJECT_UPDATE_REQUEST: {
        draft.st_shareProjecthUpdateLoading = true;
        draft.st_shareProjecthUpdateDone = false;
        draft.st_shareProjecthUpdateError = null;
        break;
      }
      case SHAREPROJECT_UPDATE_SUCCESS: {
        draft.st_shareProjecthUpdateLoading = false;
        draft.st_shareProjecthUpdateDone = true;
        draft.st_shareProjecthUpdateError = null;
        break;
      }
      case SHAREPROJECT_UPDATE_FAILURE: {
        draft.st_shareProjecthUpdateLoading = false;
        draft.st_shareProjecthUpdateDone = false;
        draft.st_shareProjecthUpdateError = action.data;
        break;
      }

      //////////////////////////////////////////////////////
      case SHAREPROJECT_IMAGE1_REQUEST: {
        draft.st_shareProjecthImage1Loading = true;
        draft.st_shareProjecthImage1Done = false;
        draft.st_shareProjecthImage1Error = null;
        break;
      }
      case SHAREPROJECT_IMAGE1_SUCCESS: {
        draft.st_shareProjecthImage1Loading = false;
        draft.st_shareProjecthImage1Done = true;
        draft.st_shareProjecthImage1Error = null;
        draft.previewImagePath1 = action.data.path;
        break;
      }
      case SHAREPROJECT_IMAGE1_FAILURE: {
        draft.st_shareProjecthImage1Loading = false;
        draft.st_shareProjecthImage1Done = false;
        draft.st_shareProjecthImage1Error = action.data;
        break;
      }

      //////////////////////////////////////////////////////
      case SHAREPROJECT_HISTORY_REQUEST: {
        draft.st_shareProjectHistoryLoading = true;
        draft.st_shareProjectHistoryDone = false;
        draft.st_shareProjectHistoryError = null;
        break;
      }
      case SHAREPROJECT_HISTORY_SUCCESS: {
        draft.st_shareProjectHistoryLoading = false;
        draft.st_shareProjectHistoryDone = true;
        draft.st_shareProjectHistoryError = null;
        draft.shareProjectHistory = action.data;
        break;
      }
      case SHAREPROJECT_HISTORY_FAILURE: {
        draft.st_shareProjectHistoryLoading = false;
        draft.st_shareProjectHistoryDone = false;
        draft.st_shareProjectHistoryError = action.data;
        break;
      }

      //////////////////////////////////////////////////////
      case SHAREPROJECT_IMAGE2_REQUEST: {
        draft.st_shareProjecthImage2Loading = true;
        draft.st_shareProjecthImage2Done = false;
        draft.st_shareProjecthImage2Error = null;
        break;
      }
      case SHAREPROJECT_IMAGE2_SUCCESS: {
        draft.st_shareProjecthImage2Loading = false;
        draft.st_shareProjecthImage2Done = true;
        draft.st_shareProjecthImage2Error = null;
        draft.previewImagePath2 = action.data.path;
        break;
      }
      case SHAREPROJECT_IMAGE2_FAILURE: {
        draft.st_shareProjecthImage2Loading = false;
        draft.st_shareProjecthImage2Done = false;
        draft.st_shareProjecthImage2Error = action.data;
        break;
      }

      //////////////////////////////////////////////////////
      case SHAREPROJECT_CREATE_REQUEST: {
        draft.st_shareProjecthCreateLoading = true;
        draft.st_shareProjecthCreateDone = false;
        draft.st_shareProjecthCreateError = null;
        break;
      }
      case SHAREPROJECT_CREATE_SUCCESS: {
        draft.st_shareProjecthCreateLoading = false;
        draft.st_shareProjecthCreateDone = true;
        draft.st_shareProjecthCreateError = null;

        break;
      }
      case SHAREPROJECT_CREATE_FAILURE: {
        draft.st_shareProjecthCreateLoading = false;
        draft.st_shareProjecthCreateDone = false;
        draft.st_shareProjecthCreateError = action.data;
        break;
      }

      //////////////////////////////////////////////////////
      case SHAREPROJECT_DELETE_REQUEST: {
        draft.st_shareProjecthDeleteLoading = true;
        draft.st_shareProjecthDeleteDone = false;
        draft.st_shareProjecthDeleteError = null;
        break;
      }
      case SHAREPROJECT_DELETE_SUCCESS: {
        draft.st_shareProjecthDeleteLoading = false;
        draft.st_shareProjecthDeleteDone = true;
        draft.st_shareProjecthDeleteError = null;

        break;
      }
      case SHAREPROJECT_DELETE_FAILURE: {
        draft.st_shareProjecthDeleteLoading = false;
        draft.st_shareProjecthDeleteDone = false;
        draft.st_shareProjecthDeleteError = action.data;
        break;
      }
      //////////////////////////////////////////////////////

      case SHAREPROJECT_IMAGE_RESET: {
        draft.previewImagePath1 = null;
        draft.previewImagePath2 = null;
      }

      //
      case UNDER_LIST_REQUEST: {
        draft.st_underListLoading = true;
        draft.st_underListDone = false;
        draft.st_underListError = null;
        break;
      }
      case UNDER_LIST_SUCCESS: {
        draft.st_underListLoading = false;
        draft.st_underListDone = true;
        draft.st_underListError = null;
        draft.underList = action.data;
        break;
      }
      case UNDER_LIST_FAILURE: {
        draft.st_underListLoading = false;
        draft.st_underListDone = false;
        draft.st_underListError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case UNDER_CREATE_REQUEST: {
        draft.st_underCreateLoading = true;
        draft.st_underCreateDone = false;
        draft.st_underCreateError = null;
        break;
      }
      case UNDER_CREATE_SUCCESS: {
        draft.st_underCreateLoading = false;
        draft.st_underCreateDone = true;
        draft.st_underCreateError = null;
        break;
      }
      case UNDER_CREATE_FAILURE: {
        draft.st_underCreateLoading = false;
        draft.st_underCreateDone = false;
        draft.st_underCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case UNDER_UPDATE_REQUEST: {
        draft.st_underUpdateLoading = true;
        draft.st_underUpdateDone = false;
        draft.st_underUpdateError = null;
        break;
      }
      case UNDER_UPDATE_SUCCESS: {
        draft.st_underUpdateLoading = false;
        draft.st_underUpdateDone = true;
        draft.st_underUpdateError = null;
        break;
      }
      case UNDER_UPDATE_FAILURE: {
        draft.st_underUpdateLoading = false;
        draft.st_underUpdateDone = false;
        draft.st_underUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case UNDER_DELETE_REQUEST: {
        draft.st_underDeleteLoading = true;
        draft.st_underDeleteDone = false;
        draft.st_underDeleteError = null;
        break;
      }
      case UNDER_DELETE_SUCCESS: {
        draft.st_underDeleteLoading = false;
        draft.st_underDeleteDone = true;
        draft.st_underDeleteError = null;
        break;
      }
      case UNDER_DELETE_FAILURE: {
        draft.st_underDeleteLoading = false;
        draft.st_underDeleteDone = false;
        draft.st_underDeleteError = action.error;
        break;
      }

      default:
        break;
    }
  });

export default reducer;
