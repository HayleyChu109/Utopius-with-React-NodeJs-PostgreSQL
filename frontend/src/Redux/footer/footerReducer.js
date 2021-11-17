import { SEND_MSG } from "./footerAction";

const initialState = {
  message: [],
};

export function footerReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_MSG:
      console.log("SEND_MSG");
      return {
        message: state.message.concat(action.payload),
      };

    default:
      return state;
  }
}
