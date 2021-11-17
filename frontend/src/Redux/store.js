import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { loginReducer } from "./login/reducer";
import { signupReducer } from "./signup/reducer";
import { memberInfoFormReducer } from "./signup/memberInfoFormReducer";
import { footerReducer } from "./footer/footerReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const rootReducer = combineReducers({
  loginStore: loginReducer,
  signupStore: signupReducer,
  memberInfoFormStore: memberInfoFormReducer,
  footerStore: footerReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);
