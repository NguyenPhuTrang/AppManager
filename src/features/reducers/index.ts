import { combineReducers, createStore } from "redux";
import activeReducer from "./active";
import showToastReducer from "./toastSlice";
import pageReducer from "./page";
import isCreateOrUpdateReducer from "./isCreateOrUpdate";

const rootReducer = combineReducers({
  active: activeReducer,
  toast: showToastReducer,
  page: pageReducer,
  isCreateOrUpdate: isCreateOrUpdateReducer,
});

const store = createStore(rootReducer);

export default store;
