import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorsReducer from "./errorsRducer";
import homeReducer from "./homeReducer";
import cartReducer from "./cartReducer";
import panelReducer from "./panelReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  home: homeReducer,
  cart: cartReducer,
  panel: panelReducer
});
