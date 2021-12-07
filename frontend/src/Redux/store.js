import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { loginReducer } from "./login/reducer";
import { signupReducer } from "./signup/reducer";
import { memberInfoFormReducer } from "./signup/memberInfoFormReducer";
import { memberProfileReducer } from "./memberProfile/memberProfileReducer";
import { requestReducer } from "./request/reducer";
import { publicAnnounceReducer } from "./announcePublic/reducer";
import { footerReducer } from "./footer/footerReducer";
import { AdminDataReducer } from "./adminData/reducer";
import { memberReqDetailsReducer } from "./memberProfile/memberReqDetailsReducer";
import { memberResDetailsReducer } from "./memberProfile/memberResDetailsReducer";
import { getReviewReducer } from "./review/getReviewReducer";
import { AnnounceReducer } from "./announceData/reducer";
import { TagReducer } from "./tag/reducer";
import { AdminRequestReducer } from "./adminRequest/reducer";
import { TaskReducer } from "./task/reducer";
import { memberBookmarkReducer } from "./memberProfile/memberBookmarkReducer";
import { reportMemberReducer } from "./reportMember/reportMemberReducer";
import { memberFollowUnfollowReducer } from "./memberProfile/memberFollowReducer";
import { tokenPlanReducer } from "./token/tokenPlanReducer";
import { tokenRecordReducer } from "./token/tokenRecordReducer";
import { buyTokenReducer } from "./token/buyTokenReducer";
import { AdminTokenReducer } from "./adminToken/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  loginStore: loginReducer,
  signupStore: signupReducer,
  memberInfoFormStore: memberInfoFormReducer,
  memberProfileStore: memberProfileReducer,
  memberReqDetailsStore: memberReqDetailsReducer,
  memberResDetailsStore: memberResDetailsReducer,
  requestStore: requestReducer,
  publicAnnounceStore: publicAnnounceReducer,
  getReviewStore: getReviewReducer,
  memberBookmarkStore: memberBookmarkReducer,
  reportMemberStore: reportMemberReducer,
  memberFollowUnfollowStore: memberFollowUnfollowReducer,
  tokenPlanStore: tokenPlanReducer,
  tokenRecordStore: tokenRecordReducer,
  buyTokenStore: buyTokenReducer,
  footerStore: footerReducer,
  adminDataStore: AdminDataReducer,
  announceStore: AnnounceReducer,
  tagStore: TagReducer,
  adminRequestStore: AdminRequestReducer,
  taskStore: TaskReducer,
  adminTokenStore: AdminTokenReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);
