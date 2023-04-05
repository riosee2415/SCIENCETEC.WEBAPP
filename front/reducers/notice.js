import produce from "../util/produce";

export const initailState = {
  notices: [],
  maxPage: 1,
  createModal: false,
  detailModal: false,
  uploadFilePath: null,
  noticeHistory: [],
  viewType: "list",
  tempType: "",
  noticeDetail: null,
  noticePrev: null,
  noticeNext: null,
  adminNotices: [],

  mainBoard: [],
  //
  st_noticeListLoading: false, // 공지사항 가져오기
  st_noticeListDone: false,
  st_noticeListError: null,
  //
  st_mainBoardLoading: false, // 메인 게시판 가져오기
  st_mainBoardDone: false,
  st_mainBoardError: null,
  //
  st_noticeAdminListLoading: false, // 관리자 공지사항
  st_noticeAdminListDone: false,
  st_noticeAdminListError: null,
  //
  st_noticeCreateLoading: false, // 공지사항 생성하기
  st_noticeCreateDone: false,
  st_noticeCreateError: null,
  //
  st_noticeUpdateToggleLoading: false, // 공지사항 사용여부 업데이트
  st_noticeUpdateToggleDone: false,
  st_noticeUpdateToggleError: null,
  //
  st_noticeUpdateLoading: false, // 공지사항 업데이트
  st_noticeUpdateDone: false,
  st_noticeUpdateError: null,
  //
  st_noticeUpdateTopLoading: false, // 공지사항 상단고정 업데이트
  st_noticeUpdateTopDone: false,
  st_noticeUpdateTopError: null,
  //
  st_noticeDeleteLoading: false, // 공지사항 삭제
  st_noticeDeleteDone: false,
  st_noticeDeleteError: null,
  //
  st_noticeFileLoading: false, // 공지사항 파일 업로드
  st_noticeFileDone: false,
  st_noticeFileError: null,
  //
  st_noticeFileInfoLoading: false, // 공지사항 파일 업로드
  st_noticeFileInfoDone: false,
  st_noticeFileInfoError: null,
  //
  st_noticeHistoryLoading: false, // 공지사항 이력
  st_noticeHistoryDone: false,
  st_noticeHistoryError: null,
  //
  st_noticeDetailLoading: false, // 공지사항 디테일
  st_noticeDetailDone: false,
  st_noticeDetailError: null,
  //
  st_noticeAnswerLoading: false, // 답변
  st_noticeAnswerDone: false,
  st_noticeAnswerError: null,
};

export const NOTICE_LIST_REQUEST = "NOTICE_LIST_REQUEST";
export const NOTICE_LIST_SUCCESS = "NOTICE_LIST_SUCCESS";
export const NOTICE_LIST_FAILURE = "NOTICE_LIST_FAILURE";
//
export const MAIN_BOARD_REQUEST = "MAIN_BOARD_REQUEST";
export const MAIN_BOARD_SUCCESS = "MAIN_BOARD_SUCCESS";
export const MAIN_BOARD_FAILURE = "MAIN_BOARD_FAILURE";
//
export const NOTICE_ADMIN_LIST_REQUEST = "NOTICE_ADMIN_LIST_REQUEST";
export const NOTICE_ADMIN_LIST_SUCCESS = "NOTICE_ADMIN_LIST_SUCCESS";
export const NOTICE_ADMIN_LIST_FAILURE = "NOTICE_ADMIN_LIST_FAILURE";
//
export const NOTICE_CREATE_REQUEST = "NOTICE_CREATE_REQUEST";
export const NOTICE_CREATE_SUCCESS = "NOTICE_CREATE_SUCCESS";
export const NOTICE_CREATE_FAILURE = "NOTICE_CREATE_FAILURE";
//
export const NOTICE_UPDATE_TOGGLE_REQUEST = "NOTICE_UPDATE_TOGGLE_REQUEST";
export const NOTICE_UPDATE_TOGGLE_SUCCESS = "NOTICE_UPDATE_TOGGLE_SUCCESS";
export const NOTICE_UPDATE_TOGGLE_FAILURE = "NOTICE_UPDATE_TOGGLE_FAILURE";
//
export const NOTICE_UPDATE_REQUEST = "NOTICE_UPDATE_REQUEST";
export const NOTICE_UPDATE_SUCCESS = "NOTICE_UPDATE_SUCCESS";
export const NOTICE_UPDATE_FAILURE = "NOTICE_UPDATE_FAILURE";
//
export const NOTICE_UPDATE_TOP_REQUEST = "NOTICE_UPDATE_TOP_REQUEST";
export const NOTICE_UPDATE_TOP_SUCCESS = "NOTICE_UPDATE_TOP_SUCCESS";
export const NOTICE_UPDATE_TOP_FAILURE = "NOTICE_UPDATE_TOP_FAILURE";
//
export const NOTICE_DELETE_REQUEST = "NOTICE_DELETE_REQUEST";
export const NOTICE_DELETE_SUCCESS = "NOTICE_DELETE_SUCCESS";
export const NOTICE_DELETE_FAILURE = "NOTICE_DELETE_FAILURE";
//
export const NOTICE_FILE_REQUEST = "NOTICE_FILE_REQUEST";
export const NOTICE_FILE_SUCCESS = "NOTICE_FILE_SUCCESS";
export const NOTICE_FILE_FAILURE = "NOTICE_FILE_FAILURE";
//
export const NOTICE_FILE_INFO_REQUEST = "NOTICE_FILE_INFO_REQUEST";
export const NOTICE_FILE_INFO_SUCCESS = "NOTICE_FILE_INFO_SUCCESS";
export const NOTICE_FILE_INFO_FAILURE = "NOTICE_FILE_INFO_FAILURE";
//
export const NOTICE_HISTORY_REQUEST = "NOTICE_HISTORY_REQUEST";
export const NOTICE_HISTORY_SUCCESS = "NOTICE_HISTORY_SUCCESS";
export const NOTICE_HISTORY_FAILURE = "NOTICE_HISTORY_FAILURE";
//
export const NOTICE_DETAIL_REQUEST = "NOTICE_DETAIL_REQUEST";
export const NOTICE_DETAIL_SUCCESS = "NOTICE_DETAIL_SUCCESS";
export const NOTICE_DETAIL_FAILURE = "NOTICE_DETAIL_FAILURE";
//
export const NOTICE_ANSWER_REQUEST = "NOTICE_ANSWER_REQUEST";
export const NOTICE_ANSWER_SUCCESS = "NOTICE_ANSWER_SUCCESS";
export const NOTICE_ANSWER_FAILURE = "NOTICE_ANSWER_FAILURE";
//
export const CREATE_MODAL_OPEN_REQUEST = "CREATE_MODAL_OPEN_REQUEST";
export const CREATE_MODAL_CLOSE_REQUEST = "CREATE_MODAL_CLOSE_REQUEST";

export const DETAIL_MODAL_OPEN_REQUEST = "DETAIL_MODAL_OPEN_REQUEST";
export const DETAIL_MODAL_CLOSE_REQUEST = "DETAIL_MODAL_CLOSE_REQUEST";

export const UPLOAD_PATH_INIT = "UPLOAD_PATH_INIT";
export const SET_TEMP_TYPE = "SET_TEMP_TYPE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case NOTICE_LIST_REQUEST: {
        draft.st_noticeListLoading = true;
        draft.st_noticeListDone = false;
        draft.st_noticeListError = null;
        break;
      }
      case NOTICE_LIST_SUCCESS: {
        draft.st_noticeListLoading = false;
        draft.st_noticeListDone = true;
        draft.st_noticeListError = null;
        draft.notices = action.data;
        draft.maxPage = action.data.lastPage;
        break;
      }
      case NOTICE_LIST_FAILURE: {
        draft.st_noticeListLoading = false;
        draft.st_noticeListDone = false;
        draft.st_noticeListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case MAIN_BOARD_REQUEST: {
        draft.st_mainBoardLoading = true;
        draft.st_mainBoardDone = false;
        draft.st_mainBoardError = null;
        break;
      }
      case MAIN_BOARD_SUCCESS: {
        draft.st_mainBoardLoading = false;
        draft.st_mainBoardDone = true;
        draft.st_mainBoardError = null;
        draft.mainBoard = action.data.notices;
        break;
      }
      case MAIN_BOARD_FAILURE: {
        draft.st_mainBoardLoading = false;
        draft.st_mainBoardDone = false;
        draft.st_mainBoardError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case NOTICE_ADMIN_LIST_REQUEST: {
        draft.st_noticeAdminListLoading = true;
        draft.st_noticeAdminListDone = null;
        draft.st_noticeAdminListError = false;
        break;
      }
      case NOTICE_ADMIN_LIST_SUCCESS: {
        draft.st_noticeAdminListLoading = false;
        draft.st_noticeAdminListDone = true;
        draft.st_noticeAdminListError = null;
        draft.adminNotices = action.data;
        break;
      }
      case NOTICE_ADMIN_LIST_FAILURE: {
        draft.st_noticeAdminListLoading = false;
        draft.st_noticeAdminListDone = false;
        draft.st_noticeAdminListError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case NOTICE_CREATE_REQUEST: {
        draft.st_noticeCreateLoading = true;
        draft.st_noticeCreateDone = false;
        draft.st_noticeCreateError = null;
        break;
      }
      case NOTICE_CREATE_SUCCESS: {
        draft.st_noticeCreateLoading = false;
        draft.st_noticeCreateDone = true;
        draft.st_noticeCreateError = null;
        draft.viewType = "list";
        break;
      }
      case NOTICE_CREATE_FAILURE: {
        draft.st_noticeCreateLoading = false;
        draft.st_noticeCreateDone = false;
        draft.st_noticeCreateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case NOTICE_UPDATE_TOGGLE_REQUEST: {
        draft.st_noticeUpdateToggleLoading = true;
        draft.st_noticeUpdateToggleDone = false;
        draft.st_noticeUpdateToggleError = null;
        break;
      }
      case NOTICE_UPDATE_TOGGLE_SUCCESS: {
        draft.st_noticeUpdateToggleLoading = false;
        draft.st_noticeUpdateToggleDone = true;
        draft.st_noticeUpdateToggleError = null;
        break;
      }
      case NOTICE_UPDATE_TOGGLE_FAILURE: {
        draft.st_noticeUpdateToggleLoading = false;
        draft.st_noticeUpdateToggleDone = false;
        draft.st_noticeUpdateToggleError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case NOTICE_UPDATE_REQUEST: {
        draft.st_noticeUpdateLoading = true;
        draft.st_noticeUpdateDone = false;
        draft.st_noticeUpdateError = null;
        break;
      }
      case NOTICE_UPDATE_SUCCESS: {
        draft.st_noticeUpdateLoading = false;
        draft.st_noticeUpdateDone = true;
        draft.st_noticeUpdateError = null;
        break;
      }
      case NOTICE_UPDATE_FAILURE: {
        draft.st_noticeUpdateLoading = false;
        draft.st_noticeUpdateDone = false;
        draft.st_noticeUpdateError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      case NOTICE_DELETE_REQUEST: {
        draft.st_noticeDeleteLoading = true;
        draft.st_noticeDeleteDone = null;
        draft.st_noticeDeleteError = false;
        break;
      }
      case NOTICE_DELETE_SUCCESS: {
        draft.st_noticeDeleteLoading = false;
        draft.st_noticeDeleteDone = true;
        break;
      }
      case NOTICE_DELETE_FAILURE: {
        draft.st_noticeDeleteLoading = false;
        draft.st_noticeDeleteDone = false;
        draft.st_noticeDeleteError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      case NOTICE_UPDATE_TOP_REQUEST: {
        draft.st_noticeUpdateTopLoading = true;
        draft.st_noticeUpdateTopDone = false;
        draft.st_noticeUpdateTopError = null;
        break;
      }
      case NOTICE_UPDATE_TOP_SUCCESS: {
        draft.st_noticeUpdateTopLoading = false;
        draft.st_noticeUpdateTopDone = true;
        draft.st_noticeUpdateTopError = null;
        break;
      }
      case NOTICE_UPDATE_TOP_FAILURE: {
        draft.st_noticeUpdateTopLoading = false;
        draft.st_noticeUpdateTopDone = false;
        draft.st_noticeUpdateTopError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      case NOTICE_FILE_REQUEST: {
        draft.st_noticeFileLoading = true;
        draft.st_noticeFileDone = false;
        draft.st_noticeFileError = null;
        break;
      }
      case NOTICE_FILE_SUCCESS: {
        draft.st_noticeFileLoading = false;
        draft.st_noticeFileDone = true;
        draft.st_noticeFileError = null;
        draft.uploadFilePath = action.data.path;
        break;
      }
      case NOTICE_FILE_FAILURE: {
        draft.st_noticeFileLoading = false;
        draft.st_noticeFileDone = false;
        draft.st_noticeFileError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      case NOTICE_FILE_INFO_REQUEST: {
        draft.st_noticeFileInfoLoading = true;
        draft.st_noticeFileInfoDone = false;
        draft.st_noticeFileInfoError = null;
        break;
      }
      case NOTICE_FILE_INFO_SUCCESS: {
        draft.st_noticeFileInfoLoading = false;
        draft.st_noticeFileInfoDone = true;
        draft.st_noticeFileInfoError = null;
        draft.uploadFilePath = null;
        break;
      }
      case NOTICE_FILE_INFO_FAILURE: {
        draft.st_noticeFileInfoLoading = false;
        draft.st_noticeFileInfoDone = false;
        draft.st_noticeFileInfoError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      case NOTICE_HISTORY_REQUEST: {
        draft.st_noticeHistoryLoading = true;
        draft.st_noticeHistoryDone = false;
        draft.st_noticeHistoryError = null;
        break;
      }
      case NOTICE_HISTORY_SUCCESS: {
        draft.st_noticeHistoryLoading = false;
        draft.st_noticeHistoryDone = true;
        draft.st_noticeHistoryError = null;
        draft.noticeHistory = action.data;
        break;
      }
      case NOTICE_HISTORY_FAILURE: {
        draft.st_noticeHistoryLoading = false;
        draft.st_noticeHistoryDone = false;
        draft.st_noticeHistoryError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      case NOTICE_DETAIL_REQUEST: {
        draft.st_noticeDetailLoading = true;
        draft.st_noticeDetailDone = false;
        draft.st_noticeDetailError = null;
        break;
      }
      case NOTICE_DETAIL_SUCCESS: {
        draft.st_noticeDetailLoading = false;
        draft.st_noticeDetailDone = true;
        draft.st_noticeDetailError = null;
        draft.noticeDetail = action.data.detailData;
        draft.noticePrev = action.data.nextNotice;
        draft.noticeNext = action.data.prevNotice;
        break;
      }
      case NOTICE_DETAIL_FAILURE: {
        draft.st_noticeDetailLoading = false;
        draft.st_noticeDetailDone = false;
        draft.st_noticeDetailError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      case NOTICE_ANSWER_REQUEST: {
        draft.st_noticeAnswerLoading = true;
        draft.st_noticeAnswerDone = false;
        draft.st_noticeAnswerError = null;
        break;
      }
      case NOTICE_ANSWER_SUCCESS: {
        draft.st_noticeAnswerLoading = false;
        draft.st_noticeAnswerDone = true;
        draft.st_noticeAnswerError = null;
        break;
      }
      case NOTICE_ANSWER_FAILURE: {
        draft.st_noticeAnswerLoading = false;
        draft.st_noticeAnswerDone = false;
        draft.st_noticeAnswerError = action.error;
        break;
      }
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////

      case CREATE_MODAL_OPEN_REQUEST:
        draft.createModal = true;
        break;

      case CREATE_MODAL_CLOSE_REQUEST:
        draft.createModal = false;
        break;
      ///////////////////////////////////////////////////////

      case DETAIL_MODAL_OPEN_REQUEST:
        draft.detailModal = true;
        break;

      case DETAIL_MODAL_CLOSE_REQUEST:
        draft.detailModal = false;
        break;
      ///////////////////////////////////////////////////////

      case UPLOAD_PATH_INIT:
        draft.uploadFilePath = null;
        break;
      ///////////////////////////////////////////////////////

      case SET_TEMP_TYPE:
        draft.tempType = action.data.boardType;
        draft.viewType = action.data.viewType;
        break;
      ///////////////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
