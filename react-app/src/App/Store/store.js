import { createStore, compose } from "redux";
import rootReducer from "./Reducers/";
import { saveState, loadState } from "./localStorage";
import throttle from "lodash.throttle";

const persistedState = loadState();
const store = createStore(rootReducer, persistedState);

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

export default store;
