import { combineReducers } from "redux";
import appReducer from "./appReducer";
import authReducer from "./authReducer";
import dashboardReducer from "./dashboardReducer";

const rootReducer = combineReducers({
  root: appReducer,
  auth: authReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;
