import produce from "../util/produce";

export const initailState = {
  mailFilePath: null,
  //
  st_mailSendLoading: false,
  st_mailSendDone: false,
  st_mailSendError: null,
  //
  st_mailFileUploadLoading: false,
  st_mailFileUploadDone: false,
  st_mailFileUploadError: null,
};

export const MAIL_SEND_REQUEST = "MAIL_SEND_REQUEST";
export const MAIL_SEND_SUCCESS = "MAIL_SEND_SUCCESS";
export const MAIL_SEND_FAILURE = "MAIL_SEND_FAILURE";

export const MAIL_FILE_UPLOAD_REQUEST = "MAIL_FILE_UPLOAD_REQUEST";
export const MAIL_FILE_UPLOAD_SUCCESS = "MAIL_FILE_UPLOAD_SUCCESS";
export const MAIL_FILE_UPLOAD_FAILURE = "MAIL_FILE_UPLOAD_FAILURE";

export const MAIL_FILE_RESET = "MAIL_FILE_RESET";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      //////////////////////////////////////////////

      case MAIL_SEND_REQUEST: {
        draft.st_mailSendLoading = true;
        draft.st_mailSendDone = false;
        draft.st_mailSendError = null;
        break;
      }
      case MAIL_SEND_SUCCESS: {
        draft.st_mailSendLoading = false;
        draft.st_mailSendDone = true;
        draft.st_mailSendError = null;
        break;
      }
      case MAIL_SEND_FAILURE: {
        draft.st_mailSendLoading = false;
        draft.st_mailSendDone = false;
        draft.st_mailSendError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case MAIL_FILE_UPLOAD_REQUEST: {
        draft.st_mailFileUploadLoading = true;
        draft.st_mailFileUploadDone = false;
        draft.st_mailFileUploadError = null;
        break;
      }
      case MAIL_FILE_UPLOAD_SUCCESS: {
        draft.st_mailFileUploadLoading = false;
        draft.st_mailFileUploadDone = true;
        draft.st_mailFileUploadError = null;
        draft.mailFilePath = action.data.path;
        break;
      }
      case MAIL_FILE_UPLOAD_FAILURE: {
        draft.st_mailFileUploadLoading = false;
        draft.st_mailFileUploadDone = false;
        draft.st_mailFileUploadError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case MAIL_FILE_RESET: {
        draft.mailFilePath = action.data.mailFilePath;
        break;
      }
      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
