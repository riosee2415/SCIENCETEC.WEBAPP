import produce from "../util/produce";

export const initailState = {
  forumList: [],
  maxPage: 1,
  forumAdminList: [],
  forumDetail: null,
  forumHistoryList: [],

  //
  st_forumListLoading: false, // forum 가져오기
  st_forumListDone: false,
  st_forumListError: null,
  //
  st_forumAdminListLoading: false, // forum admin 가져오기
  st_forumAdminListDone: false,
  st_forumAdminListError: null,
  //
  st_forumDetailListLoading: false, // forum Detail 가져오기
  st_forumDetailListDone: false,
  st_forumDetailListError: null,
  //
  st_forumCreateLoading: false, // forum 생성하기
  st_forumCreateDone: false,
  st_forumCreateError: null,
  //
  st_forumUpdateLoading: false, // forum 수정하기
  st_forumUpdateDone: false,
  st_forumUpdateError: null,
  //
  st_forumDeleteLoading: false, // forum 삭제하기
  st_forumDeleteDone: false,
  st_forumDeleteError: null,
  //
  st_forumHistoryListLoading: false, // forum 삭제하기
  st_forumHistoryListDone: false,
  st_forumHistoryListError: null,
};

export const FORUM_LIST_REQUEST = "FORUM_LIST_REQUEST";
export const FORUM_LIST_SUCCESS = "FORUM_LIST_SUCCESS";
export const FORUM_LIST_FAILURE = "FORUM_LIST_FAILURE";

export const FORUM_ADMIN_LIST_REQUEST = "FORUM_ADMIN_LIST_REQUEST";
export const FORUM_ADMIN_LIST_SUCCESS = "FORUM_ADMIN_LIST_SUCCESS";
export const FORUM_ADMIN_LIST_FAILURE = "FORUM_ADMIN_LIST_FAILURE";

export const FORUM_DETAIL_REQUEST = "FORUM_DETAIL_REQUEST";
export const FORUM_DETAIL_SUCCESS = "FORUM_DETAIL_SUCCESS";
export const FORUM_DETAIL_FAILURE = "FORUM_DETAIL_FAILURE";

export const FORUM_CREATE_REQUEST = "FORUM_CREATE_REQUEST";
export const FORUM_CREATE_SUCCESS = "FORUM_CREATE_SUCCESS";
export const FORUM_CREATE_FAILURE = "FORUM_CREATE_FAILURE";

export const FORUM_UPDATE_REQUEST = "FORUM_UPDATE_REQUEST";
export const FORUM_UPDATE_SUCCESS = "FORUM_UPDATE_SUCCESS";
export const FORUM_UPDATE_FAILURE = "FORUM_UPDATE_FAILURE";

export const FORUM_DELETE_REQUEST = "FORUM_DELETE_REQUEST";
export const FORUM_DELETE_SUCCESS = "FORUM_DELETE_SUCCESS";
export const FORUM_DELETE_FAILURE = "FORUM_DELETE_FAILURE";

export const FORUM_HISTORY_LIST_REQUEST = "FORUM_HISTORY_LIST_REQUEST";
export const FORUM_HISTORY_LIST_SUCCESS = "FORUM_HISTORY_LIST_SUCCESS";
export const FORUM_HISTORY_LIST_FAILURE = "FORUM_HISTORY_LIST_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FORUM_LIST_REQUEST: {
        draft.st_forumListLoading = true;
        draft.st_forumListDone = false;
        draft.st_forumListError = null;
        break;
      }
      case FORUM_LIST_SUCCESS: {
        draft.st_forumListLoading = false;
        draft.st_forumListDone = true;
        draft.st_forumListError = null;
        draft.forumList = action.data.forums;
        draft.maxPage = action.data.lastPage;
        break;
      }
      case FORUM_LIST_FAILURE: {
        draft.st_forumListLoading = false;
        draft.st_forumListDone = false;
        draft.st_forumListError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case FORUM_ADMIN_LIST_REQUEST: {
        draft.st_forumAdminListLoading = true;
        draft.st_forumAdminListDone = false;
        draft.st_forumAdminListError = null;
        break;
      }
      case FORUM_ADMIN_LIST_SUCCESS: {
        draft.st_forumAdminListLoading = false;
        draft.st_forumAdminListDone = true;
        draft.st_forumAdminListError = null;
        draft.forumAdminList = action.data;
        break;
      }
      case FORUM_ADMIN_LIST_FAILURE: {
        draft.st_forumAdminListLoading = false;
        draft.st_forumAdminListDone = false;
        draft.st_forumAdminListError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case FORUM_DETAIL_REQUEST: {
        draft.st_forumDetailLoading = true;
        draft.st_forumDetailDone = false;
        draft.st_forumDetailError = null;
        break;
      }
      case FORUM_DETAIL_SUCCESS: {
        draft.st_forumDetailLoading = false;
        draft.st_forumDetailDone = true;
        draft.st_forumDetailError = null;
        draft.forumDetail = action.data;
        break;
      }
      case FORUM_DETAIL_FAILURE: {
        draft.st_forumDetailLoading = false;
        draft.st_forumDetailDone = false;
        draft.st_forumDetailError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case FORUM_CREATE_REQUEST: {
        draft.st_forumCreateLoading = true;
        draft.st_forumCreateDone = false;
        draft.st_forumCreateError = null;
        break;
      }
      case FORUM_CREATE_SUCCESS: {
        draft.st_forumCreateLoading = false;
        draft.st_forumCreateDone = true;
        draft.st_forumCreateError = null;
        break;
      }
      case FORUM_CREATE_FAILURE: {
        draft.st_forumCreateLoading = false;
        draft.st_forumCreateDone = false;
        draft.st_forumCreateError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case FORUM_UPDATE_REQUEST: {
        draft.st_forumUpdateLoading = true;
        draft.st_forumUpdateDone = false;
        draft.st_forumUpdateError = null;
        break;
      }
      case FORUM_UPDATE_SUCCESS: {
        draft.st_forumUpdateLoading = false;
        draft.st_forumUpdateDone = true;
        draft.st_forumUpdateError = null;
        break;
      }
      case FORUM_UPDATE_FAILURE: {
        draft.st_forumUpdateLoading = false;
        draft.st_forumUpdateDone = false;
        draft.st_forumUpdateError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case FORUM_DELETE_REQUEST: {
        draft.st_forumDeleteLoading = true;
        draft.st_forumDeleteDone = false;
        draft.st_forumDeleteError = null;
        break;
      }
      case FORUM_DELETE_SUCCESS: {
        draft.st_forumDeleteLoading = false;
        draft.st_forumDeleteDone = true;
        draft.st_forumDeleteError = null;
        break;
      }
      case FORUM_DELETE_FAILURE: {
        draft.st_forumDeleteLoading = false;
        draft.st_forumDeleteDone = false;
        draft.st_forumDeleteError = action.error;
        break;
      }

      //////////////////////////////////////////////
      case FORUM_HISTORY_LIST_REQUEST: {
        draft.st_forumHistoryListLoading = true;
        draft.st_forumHistoryListDone = false;
        draft.st_forumHistoryListError = null;
        break;
      }
      case FORUM_HISTORY_LIST_SUCCESS: {
        draft.st_forumHistoryListLoading = false;
        draft.st_forumHistoryListDone = true;
        draft.st_forumHistoryListError = null;
        draft.forumHistoryList = action.data;
        break;
      }
      case FORUM_HISTORY_LIST_FAILURE: {
        draft.st_forumHistoryListLoading = false;
        draft.st_forumHistoryListDone = false;
        draft.st_forumHistoryListError = action.error;
        break;
      }

      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
