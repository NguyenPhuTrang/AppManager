import { combineReducers, createStore } from "redux";
import activeReducer from "./active";
import showToastReducer from "./toastSlice";
import pageReducer from "./page";
import isCreateOrUpdateReducer from "./isCreateOrUpdate";
import keywordReducer from "./keywordSearch";
import userProfileReducer from "./userProfile";

const rootReducer = combineReducers({
  active: activeReducer,
  toast: showToastReducer,
  page: pageReducer,
  isCreateOrUpdate: isCreateOrUpdateReducer,
  keyword: keywordReducer,
  userProfile: userProfileReducer,
});

const store = createStore(rootReducer);

export default store;
