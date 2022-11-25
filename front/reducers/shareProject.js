import produce from "../util/produce";

export const initailState = {
  shareProjects: [],
  //
  st_shareProjectLoading: false,
  st_shareProjectDone: false,
  st_shareProjectError: null,
  //   //
  //   st_techImageUpdateLoading: false, // 기술융합협동조합 이미지 수정하기
  //   st_techImageUpdateDone: false,
  //   st_techImageUpdateError: null,
  //   //
  //   st_corImageUpdateLoading: false, // 회원법인조합 이미지 수정하기
  //   st_corImageUpdateDone: false,
  //   st_corImageUpdateError: null,
  //   //
  //   st_techUpdateLoading: false, // 기술융합협동조합 수정하기
  //   st_techUpdateDone: false,
  //   st_techUpdateError: null,
  //   //
  //   st_corUpdateLoading: false, // 회원법인조합 수정하기
  //   st_corUpdateDone: false,
  //   st_corUpdateError: null,
};

export const SHARE_PROJECT_REQUEST = "SHARE_PROJECT_REQUEST";
export const SHARE_PROJECT_SUCCESS = "SHARE_PROJECT_SUCCESS";
export const SHARE_PROJECT_FAILURE = "SHARE_PROJECT_FAILURE";

// export const TECH_IMAGE_UPDATE_REQUEST = "TECH_IMAGE_UPDATE_REQUEST";
// export const TECH_IMAGE_UPDATE_SUCCESS = "TECH_IMAGE_UPDATE_SUCCESS";
// export const TECH_IMAGE_UPDATE_FAILURE = "TECH_IMAGE_UPDATE_FAILURE";

// export const COR_IMAGE_UPDATE_REQUEST = "COR_IMAGE_UPDATE_REQUEST";
// export const COR_IMAGE_UPDATE_SUCCESS = "COR_IMAGE_UPDATE_SUCCESS";
// export const COR_IMAGE_UPDATE_FAILURE = "COR_IMAGE_UPDATE_FAILURE";

// export const TECH_UPDATE_REQUEST = "TECH_UPDATE_REQUEST";
// export const TECH_UPDATE_SUCCESS = "TECH_UPDATE_SUCCESS";
// export const TECH_UPDATE_FAILURE = "TECH_UPDATE_FAILURE";

// export const COR_UPDATE_REQUEST = "COR_UPDATE_REQUEST";
// export const COR_UPDATE_SUCCESS = "COR_UPDATE_SUCCESS";
// export const COR_UPDATE_FAILURE = "COR_UPDATE_FAILURE";

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
      //   case TECH_IMAGE_UPDATE_REQUEST: {
      //     draft.st_techImageUpdateLoading = true;
      //     draft.st_techImageUpdateDone = false;
      //     draft.st_techImageUpdateError = null;
      //     break;
      //   }
      //   case TECH_IMAGE_UPDATE_SUCCESS: {
      //     draft.st_techImageUpdateLoading = false;
      //     draft.st_techImageUpdateDone = true;
      //     draft.st_techImageUpdateError = null;
      //     break;
      //   }
      //   case TECH_IMAGE_UPDATE_FAILURE: {
      //     draft.st_techImageUpdateLoading = false;
      //     draft.st_techImageUpdateDone = false;
      //     draft.st_techImageUpdateError = action.data;
      //     break;
      //   }

      //   //////////////////////////////////////////////////////
      //   case COR_IMAGE_UPDATE_REQUEST: {
      //     draft.st_corImageUpdateLoading = true;
      //     draft.st_corImageUpdateDone = false;
      //     draft.st_corImageUpdateError = null;
      //     break;
      //   }
      //   case COR_IMAGE_UPDATE_SUCCESS: {
      //     draft.st_corImageUpdateLoading = false;
      //     draft.st_corImageUpdateDone = true;
      //     draft.st_corImageUpdateError = null;
      //     break;
      //   }
      //   case COR_IMAGE_UPDATE_FAILURE: {
      //     draft.st_corImageUpdateLoading = false;
      //     draft.st_corImageUpdateDone = false;
      //     draft.st_corImageUpdateError = action.data;
      //     break;
      //   }

      //   //////////////////////////////////////////////////////
      //   case TECH_UPDATE_REQUEST: {
      //     draft.st_techUpdateLoading = true;
      //     draft.st_techUpdateDone = false;
      //     draft.st_techUpdateError = null;
      //     break;
      //   }
      //   case TECH_UPDATE_SUCCESS: {
      //     draft.st_techUpdateLoading = false;
      //     draft.st_techUpdateDone = true;
      //     draft.st_techUpdateError = null;
      //     break;
      //   }
      //   case TECH_UPDATE_FAILURE: {
      //     draft.st_techUpdateLoading = false;
      //     draft.st_techUpdateDone = false;
      //     draft.st_techUpdateError = action.data;
      //     break;
      //   }

      //   //////////////////////////////////////////////////////
      //   case COR_UPDATE_REQUEST: {
      //     draft.st_corUpdateLoading = true;
      //     draft.st_corUpdateDone = false;
      //     draft.st_corUpdateError = null;
      //     break;
      //   }
      //   case COR_UPDATE_SUCCESS: {
      //     draft.st_corUpdateLoading = false;
      //     draft.st_corUpdateDone = true;
      //     draft.st_corUpdateError = null;
      //     break;
      //   }
      //   case COR_UPDATE_FAILURE: {
      //     draft.st_corUpdateLoading = false;
      //     draft.st_corUpdateDone = false;
      //     draft.st_corUpdateError = action.data;
      //     break;
      //   }

      //////////////////////////////////////////////////////

      default:
        break;
    }
  });

export default reducer;
