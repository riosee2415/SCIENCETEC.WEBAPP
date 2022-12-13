import produce from "../util/produce";

export const initailState = {
  banner: [],
  business: [],
  year: [],
  city: [],

  //
  st_mainLoading: false,
  st_mainDone: false,
  st_mainError: null,
};

export const MAIN_REQUEST = "MAIN_REQUEST";
export const MAIN_SUCCESS = "MAIN_SUCCESS";
export const MAIN_FAILURE = "MAIN_FAILURE";

const reducer = (state = initailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      //////////////////////////////////////////////

      case MAIN_REQUEST: {
        draft.st_mainLoading = true;
        draft.st_mainDone = false;
        draft.st_mainError = null;
        break;
      }
      case MAIN_SUCCESS: {
        draft.st_mainLoading = false;
        draft.st_mainDone = true;
        draft.st_mainError = null;
        draft.banner = action.data.bannerData;
        draft.business = action.data.businessData;
        draft.year = action.data.yearData;
        draft.city = action.data.cityData;
        break;
      }
      case MAIN_FAILURE: {
        draft.st_mainLoading = false;
        draft.st_mainDone = false;
        draft.st_mainError = action.error;
        break;
      }
      //////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
