import { SEARCH_REQ_ACTION } from "./actions";
import { BOOKMARK_TOGGLE } from "./actions";
import { POST_NEW_REQUEST } from "./actions";
import { GET_REQUEST_DETAIL } from "./actions";

const initialState = {
  search: "",
  requestId: null,
  requestDetail: {},
  requestList: [
    {
      requestId: 0,
      grade: "S",
      gradeColor: "#fac77c",
      username: "Tester01",
      userId: 0,
      createdAt: "2021-11-16 22:12",
      title: "Testing title",
      detail: "Testing req cards",
      tag: ["Pet", "Meow", "NailTrimming"],
      reward: 20,
      requiredPpl: 2,
      district: "Eastern",
      bookmark: true,
    },
    {
      requestId: 1,
      grade: "A",
      gradeColor: "#fa7c92",
      username: "Tester01",
      userId: 1,
      createdAt: "2021-11-16 22:12",
      title: "Testing title",
      detail: "Testing req cards",
      tag: ["Pet", "Meow", "NailTrimming"],
      reward: 20,
      requiredPpl: 2,
      district: "Eastern",
      bookmark: true,
    },
    {
      requestId: 2,
      grade: "B",
      gradeColor: "#7c97fa",
      username: "Tester02",
      userId: 2,
      createdAt: "2021-11-15 22:12",
      title: "Testing title",
      detail:
        "Testing req cards, this is a really long description. Hello hi hey I'm making it to the 3rd line",
      tag: ["Pet", "Meow", "NailTrimming", "Dangerous"],
      reward: 100,
      requiredPpl: 99,
      district: "Eastern",
      bookmark: false,
    },
    {
      requestId: 3,
      grade: "C",
      gradeColor: "#52b46e",
      username: "Tester03",
      userId: 3,
      createdAt: "2020-11-16 22:12",
      title: "Testing title",
      detail: "Testing req cards",
      tag: ["Pet", "Meow", "NailTrimming", "Dangerous"],
      reward: 100,
      requiredPpl: 99,
      district: "Eastern",
      bookmark: false,
    },
    {
      requestId: 4,
      grade: "D",
      gradeColor: "#152e87",
      username: "Tester04",
      userId: 4,
      createdAt: "2021-11-16 11:12",
      title: "Testing title",
      detail: "Testing req cards",
      tag: ["Pet", "Meow", "NailTrimming", "Dangerous"],
      reward: 100,
      requiredPpl: 99,
      district: "Eastern",
      bookmark: false,
    },
    {
      requestId: 5,
      grade: "E",
      gradeColor: "#875915",
      username: "Tester05",
      userId: 5,
      createdAt: "2021-11-18 22:12",
      title: "Testing title",
      detail: "Testing req cards",
      tag: ["Pet", "Meow", "NailTrimming", "Dangerous"],
      reward: 100,
      requiredPpl: 99,
      district: "Eastern",
      bookmark: false,
    },
    {
      requestId: 6,
      grade: "F",
      gradeColor: "#333333",
      username: "Tester06",
      userId: 6,
      createdAt: "2021-11-16 22:12",
      title: "Testing title",
      detail: "Testing req cards",
      tag: ["Pet", "Meow", "NailTrimming", "Dangerous"],
      reward: 100,
      requiredPpl: 99,
      district: "Eastern",
      bookmark: false,
    },
    {
      requestId: 7,
      grade: "-",
      gradeColor: "#c4c4c4",
      username: "Tester07",
      userId: 7,
      createdAt: "2021-11-16 22:12",
      title: "Testing title",
      detail: "Testing req cards",
      tag: ["Pet", "Meow", "NailTrimming", "Dangerous"],
      reward: 100,
      requiredPpl: 99,
      district: "Eastern",
      bookmark: false,
    },
  ],
};

export function requestReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_REQ_ACTION:
      return { ...state, search: action.payload };
    case BOOKMARK_TOGGLE:
      return { ...state, requestList: action.payload };
    case POST_NEW_REQUEST:
      return { ...state, requestId: action.payload };
    case GET_REQUEST_DETAIL:
      return { ...state, requestDetail: action.payload };

    default:
      return state;
  }
}
