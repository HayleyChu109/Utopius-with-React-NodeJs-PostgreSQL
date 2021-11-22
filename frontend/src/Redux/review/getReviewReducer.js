import { GET_REVIEW_SUCCESS_ACTION } from "./getReviewActions";

const initialState = {
  review: [],
};

export function getReviewReducer(state = initialState, action) {
  switch (action.type) {
    case GET_REVIEW_SUCCESS_ACTION:
      console.log(action.payload);
      return {
        review: state.review.concat(action.payload),
      };

    default:
      return state;
  }
}
