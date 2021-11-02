import { combineReducers } from "redux";
import alert from "./alertReducer";
import auth from "./authReducer";

const rootReducer = combineReducers({
  alert,
  auth
});

export default rootReducer;