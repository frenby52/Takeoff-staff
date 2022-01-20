import NameSpace from "../name-space.js";

const getAuthStatus = (state) => state[NameSpace.USER].authorizationStatus;
const getAuthUserData = (state) => state[NameSpace.USER].authUserData;
const getUserError = (state) => state[NameSpace.USER].userError;

export {getAuthStatus, getAuthUserData, getUserError};
