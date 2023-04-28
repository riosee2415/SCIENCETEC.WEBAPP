import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import user from "./user";
import banner from "./banner";
import popup from "./popup";
import company from "./company";
import notice from "./notice";
import gallery from "./gallery";
import question from "./question";
import accept from "./accept";
import editor from "./editor";
import logo from "./logo";
import faq from "./faq";
import forum from "./forum";
import shareProject from "./shareProject";
import survey from "./survey";
import main from "./main";
import festival from "./festival";

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log("HYDRATE", action);
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user,
        banner,
        popup,
        company,
        notice,
        gallery,
        question,
        accept,
        editor,
        logo,
        faq,
        forum,
        survey,
        shareProject,
        main,
        festival,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
