import { combineReducers, createStore } from "redux";
import activeReducer from "./active";
import showToastReducer from "./toastSlice";
import pageReducer from "./page";

const rootReducer = combineReducers({
  active: activeReducer,
  toast: showToastReducer,
  page: pageReducer
});

const store = createStore(rootReducer);

export default store;
