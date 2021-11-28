import { TOKEN_PLAN_SUCCESS_ACTION } from "./tokenPlanActions";

const initialState = {
  tokenPlan: [],
};

export function tokenPlanReducer(state = initialState, action) {
  switch (action.type) {
    case TOKEN_PLAN_SUCCESS_ACTION:
      return {
        tokenPlan: action.payload,
      };

    default:
      return state;
  }
}
