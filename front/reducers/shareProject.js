import produce from "../util/produce";

export const initailState = {
  shareProjects: [],
  //
  st_shareProjectLoading: false,
  st_shareProjectDone: false,
  st_shareProjectError: null,
};

export const SHARE_PROJECT_REQUEST = "SHARE_PROJECT_REQUEST";
export const SHARE_PROJECT_SUCCESS = "SHARE_PROJECT_SUCCESS";
export const SHARE_PROJECT_FAILURE = "SHARE_PROJECT_FAILURE";

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
        draft.logos = action.data;
        break;
      }
      case SHARE_PROJECT_FAILURE: {
        draft.st_shareProjectLoading = false;
        draft.st_shareProjectDone = false;
        draft.st_shareProjectError = action.data;
        break;
      }

      //////////////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
