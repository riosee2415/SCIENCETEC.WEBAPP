import produce from "../util/produce";

export const initailState = {
  tableSurveyList: [],

  st_tableSurveyListLoading: false,
  st_tableSurveyListDone: false,
  st_tableSurveyListError: null,
  //
  st_tableSurveyCreateLoading: false,
  st_tableSurveyCreateDone: false,
  st_tableSurveyCreateError: null,
};

export const TABLE_SURVEY_LIST_REQUEST = "TABLE_SURVEY_LIST_REQUEST";
export const TABLE_SURVEY_LIST_SUCCESS = "TABLE_SURVEY_LIST_SUCCESS";
export const TABLE_SURVEY_LIST_FAILURE = "TABLE_SURVEY_LIST_FAILURE";

export const TABLE_SURVEY_CREATE_REQUEST = "TABLE_SURVEY_CREATE_REQUEST";
export const TABLE_SURVEY_CREATE_SUCCESS = "TABLE_SURVEY_CREATE_SUCCESS";
export const TABLE_SURVEY_CREATE_FAILURE = "TABLE_SURVEY_CREATE_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      ///////////////////////////////////////////////////////

      case TABLE_SURVEY_LIST_REQUEST: {
        draft.st_tableSurveyListLoading = true;
        draft.st_tableSurveyListDone = false;
        draft.st_tableSurveyListError = null;
        break;
      }
      case TABLE_SURVEY_LIST_SUCCESS: {
        draft.st_tableSurveyListLoading = false;
        draft.st_tableSurveyListDone = true;
        draft.st_tableSurveyListError = null;
        draft.tableSurveyList = action.data;
        break;
      }
      case TABLE_SURVEY_LIST_FAILURE: {
        draft.st_tableSurveyListLoading = false;
        draft.st_tableSurveyListDone = false;
        draft.st_tableSurveyListError = action.data;
        break;
      }
      ///////////////////////////////////////////////////////

      case TABLE_SURVEY_CREATE_REQUEST: {
        draft.st_tableSurveyCreateLoading = true;
        draft.st_tableSurveyCreateDone = false;
        draft.st_tableSurveyCreateError = null;
        break;
      }
      case TABLE_SURVEY_CREATE_SUCCESS: {
        draft.st_tableSurveyCreateLoading = false;
        draft.st_tableSurveyCreateDone = true;
        draft.st_tableSurveyCreateError = null;
        break;
      }
      case TABLE_SURVEY_CREATE_FAILURE: {
        draft.st_tableSurveyCreateLoading = false;
        draft.st_tableSurveyCreateDone = false;
        draft.st_tableSurveyCreateError = action.data;
        break;
      }

      ///////////////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
