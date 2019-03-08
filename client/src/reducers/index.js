import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorsReducer from "./errorsRducer";
import homeReducer from "./homeReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  home: homeReducer
});
