import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import giveTheFirstName from "./space/reducer";

export default combineReducers({
  appState,
  user,
  giveTheFirstName,
});
