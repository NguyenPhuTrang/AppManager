import { combineReducers, createStore } from "redux";
import activeReducer from "./active";

const rootReducer = combineReducers({
  active: activeReducer,
});

const store = createStore(rootReducer);

export default store;
