import NameSpace from "../name-space.js";

const getAuthStatus = (state) => state[NameSpace.USER].authorizationStatus;
const getAuthUserData = (state) => state[NameSpace.USER].authUserData;

export {getAuthStatus, getAuthUserData};
