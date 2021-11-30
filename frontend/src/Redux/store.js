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
import { getBookmarkReducer } from "./memberProfile/getBookmarkReducer";
import { reportMemberReducer } from "./reportMember/reportMemberReducer";
import { tokenPlanReducer } from "./token/tokenPlanReducer";
import { tokenRecordReducer } from "./token/tokenRecordReducer";
import { buyTokenReducer } from "./token/buyTokenReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  loginStore: loginReducer,
  signupStore: signupReducer,
  memberInfoFormStore: memberInfoFormReducer,
  memberProfileStore: memberProfileReducer,
  memberReqDetailsStore: memberReqDetailsReducer,
  memberResDetailsStore: memberResDetailsReducer,
  requestStore: requestReducer,
  getReviewStore: getReviewReducer,
  getBookmarkStore: getBookmarkReducer,
  reportMemberStore: reportMemberReducer,
  tokenPlanStore: tokenPlanReducer,
  tokenRecordStore: tokenRecordReducer,
  buyTokenStore: buyTokenReducer,
  footerStore: footerReducer,
  adminDataStore: AdminDataReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);
