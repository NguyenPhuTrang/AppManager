import { combineReducers, createStore } from "redux";
import activeReducer from "./active";
import showToastReducer from "./toastSlice";

const rootReducer = combineReducers({
  active: activeReducer,
  toast: showToastReducer
});

const store = createStore(rootReducer);

export default store;
