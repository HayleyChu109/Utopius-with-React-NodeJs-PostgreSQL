import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { loginReducer } from "./login/reducer";
import { signupReducer } from "./signup/reducer";
import { memberInfoFormReducer } from "./signup/memberInfoFormReducer";
import { memberProfileReducer } from "./memberProfile/memberProfileReducer";
import { requestReducer } from "./request/reducer";
import { footerReducer } from "./footer/footerReducer";
import { AdminDataReducer } from "./adminData/reducer";
import { memberReqDetailsReducer } from "./memberProfile/memberReqDetailsReducer";
import { memberResDetailsReducer } from "./memberProfile/memberResDetailsReducer";
import { getReviewReducer } from "./review/getReviewReducer";
import { AnnounceReducer } from "./announceData/reducer";
import { TagReducer } from "./tag/reducer";
import { AdminRequestReducer } from "./adminRequest/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const rootReducer = combineReducers({
  loginStore: loginReducer,
  signupStore: signupReducer,
  memberInfoFormStore: memberInfoFormReducer,
  memberProfileStore: memberProfileReducer,
  memberReqDetailsStore: memberReqDetailsReducer,
  memberResDetailsStore: memberResDetailsReducer,
  requestStore: requestReducer,
  getReviewStore: getReviewReducer,
  footerStore: footerReducer,
  adminDataStore:AdminDataReducer,
  announceStore:AnnounceReducer,
  tagStore:TagReducer,
  adminRequestStore:AdminRequestReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);
