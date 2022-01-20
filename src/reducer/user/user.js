import User from '../../models/user';
import history from "../../history.js";
import {AppRoute} from "../../const.js";
import {getUserError} from "../../reducer/user/selectors";

const initialState = {
  authUserData: null,
  authorizationStatus: false,
  userError: null
};

const ActionType = {
  SET_AUTH_STATUS: `SET_AUTH_STATUS`,
  SET_AUTH_USER_DATA: `SET_AUTH_USER_DATA`,
  SET_USER_ERROR: `SET_USER_ERROR`,
  RESET_USER_ERROR: `RESET_USER_ERROR`,
};

const ActionCreator = {
  setAuthStatus: (status) => ({type: ActionType.SET_AUTH_STATUS, payload: status}),
  setAuthUserData: (authUserData) => ({type: ActionType.SET_AUTH_USER_DATA, payload: authUserData}),
  setUserError: (userError) => ({type: ActionType.SET_USER_ERROR, payload: userError}),
  resetUserError: () => ({type: ActionType.RESET_USER_ERROR, payload: null}),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_AUTH_STATUS:
      return Object.assign({}, state, {authorizationStatus: action.payload});

    case ActionType.SET_AUTH_USER_DATA:
      return Object.assign({}, state, {authUserData: action.payload});

    case ActionType.SET_USER_ERROR:
      return Object.assign({}, state, {userError: action.payload});

    case ActionType.RESET_USER_ERROR:
      return Object.assign({}, state, {userError: action.payload});
  }

  return state;
};

const Operation = {
  login: (authData) => (dispatch, getState, api) => {
    return api.post(AppRoute.LOGIN, {
      email: authData.email,
      password: authData.password,
    })
      .then(({data}) => {
        if (getUserError(getState())) {
          dispatch(ActionCreator.resetUserError());
        }

        if (!data) {
          return;
        }
        const userData = User.parseUser(data);

        dispatch(ActionCreator.setAuthUserData(userData));
        dispatch(ActionCreator.setAuthStatus(true));
        history.push(AppRoute.ROOT);
      })
      .catch((err) => {
        dispatch(ActionCreator.setUserError({
          errorCode: err.response.status,
          errorText: err.response.data
        }));
        throw err;
      });
  },
};

export {reducer, Operation, ActionType, ActionCreator};
