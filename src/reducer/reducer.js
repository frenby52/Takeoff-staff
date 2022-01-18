import {combineReducers} from "redux";
import {reducer as user} from "./user/user.js";
import {reducer as contacts} from "./contacts/contacts.js";
import NameSpace from "./name-space.js";

export default combineReducers({
  [NameSpace.USER]: user,
  [NameSpace.CONTACTS]: contacts,
});
