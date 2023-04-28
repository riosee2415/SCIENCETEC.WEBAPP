import produce from "../util/produce";

export const initailState = {
  festivalList: [],
  festivalAdminList: [],
  festivalTicketList: [],
  festivalHistory: [],

  st_festivalListLoading: false,
  st_festivalListDone: false,
  st_festivalListError: null,
  //
  st_festivalAdminListLoading: false,
  st_festivalAdminListDone: false,
  st_festivalAdminListError: null,
  //
  st_festivalCreateLoading: false,
  st_festivalCreateDone: false,
  st_festivalCreateError: null,
  //
  st_festivalUpdateLoading: false,
  st_festivalUpdateDone: false,
  st_festivalUpdateError: null,
  //
  st_festivalOnOffLoading: false,
  st_festivalOnOffDone: false,
  st_festivalOnOffError: null,
  //
  st_festivalDeleteLoading: false,
  st_festivalDeleteDone: false,
  st_festivalDeleteError: null,
  //
  st_festivalTicketListLoading: false,
  st_festivalTicketListDone: false,
  st_festivalTicketListError: null,
  //
  st_festivalTicketCreateLoading: false,
  st_festivalTicketCreateDone: false,
  st_festivalTicketCreateError: null,
  //
  st_festivalHistoryLoading: false,
  st_festivalHistoryDone: false,
  st_festivalHistoryError: null,
};

export const FESTIVAL_LIST_REQUEST = "FESTIVAL_LIST_REQUEST";
export const FESTIVAL_LIST_SUCCESS = "FESTIVAL_LIST_SUCCESS";
export const FESTIVAL_LIST_FAILURE = "FESTIVAL_LIST_FAILURE";

export const FESTIVAL_ADMIN_LIST_REQUEST = "FESTIVAL_ADMIN_LIST_REQUEST";
export const FESTIVAL_ADMIN_LIST_SUCCESS = "FESTIVAL_ADMIN_LIST_SUCCESS";
export const FESTIVAL_ADMIN_LIST_FAILURE = "FESTIVAL_ADMIN_LIST_FAILURE";

export const FESTIVAL_CREATE_REQUEST = "FESTIVAL_CREATE_REQUEST";
export const FESTIVAL_CREATE_SUCCESS = "FESTIVAL_CREATE_SUCCESS";
export const FESTIVAL_CREATE_FAILURE = "FESTIVAL_CREATE_FAILURE";

export const FESTIVAL_UPDATE_REQUEST = "FESTIVAL_UPDATE_REQUEST";
export const FESTIVAL_UPDATE_SUCCESS = "FESTIVAL_UPDATE_SUCCESS";
export const FESTIVAL_UPDATE_FAILURE = "FESTIVAL_UPDATE_FAILURE";

export const FESTIVAL_ONOFF_REQUEST = "FESTIVAL_ONOFF_REQUEST";
export const FESTIVAL_ONOFF_SUCCESS = "FESTIVAL_ONOFF_SUCCESS";
export const FESTIVAL_ONOFF_FAILURE = "FESTIVAL_ONOFF_FAILURE";

export const FESTIVAL_DELETE_REQUEST = "FESTIVAL_DELETE_REQUEST";
export const FESTIVAL_DELETE_SUCCESS = "FESTIVAL_DELETE_SUCCESS";
export const FESTIVAL_DELETE_FAILURE = "FESTIVAL_DELETE_FAILURE";

export const FESTIVAL_TICKET_LIST_REQUEST = "FESTIVAL_TICKET_LIST_REQUEST";
export const FESTIVAL_TICKET_LIST_SUCCESS = "FESTIVAL_TICKET_LIST_SUCCESS";
export const FESTIVAL_TICKET_LIST_FAILURE = "FESTIVAL_TICKET_LIST_FAILURE";

export const FESTIVAL_TICKET_CREATE_REQUEST = "FESTIVAL_TICKET_CREATE_REQUEST";
export const FESTIVAL_TICKET_CREATE_SUCCESS = "FESTIVAL_TICKET_CREATE_SUCCESS";
export const FESTIVAL_TICKET_CREATE_FAILURE = "FESTIVAL_TICKET_CREATE_FAILURE";

export const FESTIVAL_HISTORY_REQUEST = "FESTIVAL_HISTORY_REQUEST";
export const FESTIVAL_HISTORY_SUCCESS = "FESTIVAL_HISTORY_SUCCESS";
export const FESTIVAL_HISTORY_FAILURE = "FESTIVAL_HISTORY_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      //////////////////////////////////////////////

      case FESTIVAL_LIST_REQUEST: {
        draft.st_festivalListLoading = true;
        draft.st_festivalListDone = false;
        draft.st_festivalListError = null;
        break;
      }
      case FESTIVAL_LIST_SUCCESS: {
        draft.st_festivalListLoading = false;
        draft.st_festivalListDone = true;
        draft.st_festivalListError = null;
        draft.festivalList = action.data;
        break;
      }
      case FESTIVAL_LIST_FAILURE: {
        draft.st_festivalListLoading = false;
        draft.st_festivalListDone = false;
        draft.st_festivalListError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case FESTIVAL_ADMIN_LIST_REQUEST: {
        draft.st_festivalAdminListLoading = true;
        draft.st_festivalAdminListDone = false;
        draft.st_festivalAdminListError = null;
        break;
      }
      case FESTIVAL_ADMIN_LIST_SUCCESS: {
        draft.st_festivalAdminListLoading = false;
        draft.st_festivalAdminListDone = true;
        draft.st_festivalAdminListError = null;
        draft.festivalAdminList = action.data;
        break;
      }
      case FESTIVAL_ADMIN_LIST_FAILURE: {
        draft.st_festivalAdminListLoading = false;
        draft.st_festivalAdminListDone = false;
        draft.st_festivalAdminListError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case FESTIVAL_CREATE_REQUEST: {
        draft.st_festivalCreateLoading = true;
        draft.st_festivalCreateDone = false;
        draft.st_festivalCreateError = null;
        break;
      }
      case FESTIVAL_CREATE_SUCCESS: {
        draft.st_festivalCreateLoading = false;
        draft.st_festivalCreateDone = true;
        draft.st_festivalCreateError = null;
        break;
      }
      case FESTIVAL_CREATE_FAILURE: {
        draft.st_festivalCreateLoading = false;
        draft.st_festivalCreateDone = false;
        draft.st_festivalCreateError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case FESTIVAL_UPDATE_REQUEST: {
        draft.st_festivalUpdateLoading = true;
        draft.st_festivalUpdateDone = false;
        draft.st_festivalUpdateError = null;
        break;
      }
      case FESTIVAL_UPDATE_SUCCESS: {
        draft.st_festivalUpdateLoading = false;
        draft.st_festivalUpdateDone = true;
        draft.st_festivalUpdateError = null;
        break;
      }
      case FESTIVAL_UPDATE_FAILURE: {
        draft.st_festivalUpdateLoading = false;
        draft.st_festivalUpdateDone = false;
        draft.st_festivalUpdateError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case FESTIVAL_ONOFF_REQUEST: {
        draft.st_festivalOnOffLoading = true;
        draft.st_festivalOnOffDone = false;
        draft.st_festivalOnOffError = null;
        break;
      }
      case FESTIVAL_ONOFF_SUCCESS: {
        draft.st_festivalOnOffLoading = false;
        draft.st_festivalOnOffDone = true;
        draft.st_festivalOnOffError = null;
        break;
      }
      case FESTIVAL_ONOFF_FAILURE: {
        draft.st_festivalOnOffLoading = false;
        draft.st_festivalOnOffDone = false;
        draft.st_festivalOnOffError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case FESTIVAL_DELETE_REQUEST: {
        draft.st_festivalDeleteLoading = true;
        draft.st_festivalDeleteDone = false;
        draft.st_festivalDeleteError = null;
        break;
      }
      case FESTIVAL_DELETE_SUCCESS: {
        draft.st_festivalDeleteLoading = false;
        draft.st_festivalDeleteDone = true;
        draft.st_festivalDeleteError = null;
        break;
      }
      case FESTIVAL_DELETE_FAILURE: {
        draft.st_festivalDeleteLoading = false;
        draft.st_festivalDeleteDone = false;
        draft.st_festivalDeleteError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case FESTIVAL_TICKET_LIST_REQUEST: {
        draft.st_festivalTicketListLoading = true;
        draft.st_festivalTicketListDone = false;
        draft.st_festivalTicketListError = null;
        break;
      }
      case FESTIVAL_TICKET_LIST_SUCCESS: {
        draft.st_festivalTicketListLoading = false;
        draft.st_festivalTicketListDone = true;
        draft.st_festivalTicketListError = null;
        draft.festivalTicketList = action.data;
        break;
      }
      case FESTIVAL_TICKET_LIST_FAILURE: {
        draft.st_festivalTicketListLoading = false;
        draft.st_festivalTicketListDone = false;
        draft.st_festivalTicketListError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case FESTIVAL_TICKET_CREATE_REQUEST: {
        draft.st_festivalTicketCreateLoading = true;
        draft.st_festivalTicketCreateDone = false;
        draft.st_festivalTicketCreateError = null;
        break;
      }
      case FESTIVAL_TICKET_CREATE_SUCCESS: {
        draft.st_festivalTicketCreateLoading = false;
        draft.st_festivalTicketCreateDone = true;
        draft.st_festivalTicketCreateError = null;
        break;
      }
      case FESTIVAL_TICKET_CREATE_FAILURE: {
        draft.st_festivalTicketCreateLoading = false;
        draft.st_festivalTicketCreateDone = false;
        draft.st_festivalTicketCreateError = action.error;
        break;
      }
      //////////////////////////////////////////////

      case FESTIVAL_HISTORY_REQUEST: {
        draft.st_festivalHistoryLoading = true;
        draft.st_festivalHistoryDone = false;
        draft.st_festivalHistoryError = null;
        break;
      }
      case FESTIVAL_HISTORY_SUCCESS: {
        draft.st_festivalHistoryLoading = false;
        draft.st_festivalHistoryDone = true;
        draft.st_festivalHistoryError = null;
        draft.festivalHistory = action.data;
        break;
      }
      case FESTIVAL_HISTORY_FAILURE: {
        draft.st_festivalHistoryLoading = false;
        draft.st_festivalHistoryDone = false;
        draft.st_festivalHistoryError = action.error;
        break;
      }
      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
