import User from '../../models/user';
import history from "../../history.js";
import {AppRoute} from "../../const.js";

const initialState = {
  authUserData: null,
  authorizationStatus: false,
};

const ActionType = {
  SET_AUTH_STATUS: `SET_AUTH_STATUS`,
  SET_AUTH_USER_DATA: `SET_AUTH_USER_DATA`,
};

const ActionCreator = {
  setAuthStatus: (status) => ({type: ActionType.SET_AUTH_STATUS, payload: status}),
  setAuthUserData: (authUserData) => ({type: ActionType.SET_AUTH_USER_DATA, payload: authUserData}),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_AUTH_STATUS:
      return Object.assign({}, state, {authorizationStatus: action.payload});

    case ActionType.SET_AUTH_USER_DATA:
      return Object.assign({}, state, {authUserData: action.payload});
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
        if (!data) {
          return;
        }
        const userData = User.parseUser(data);

        dispatch(ActionCreator.setAuthUserData(userData));
        dispatch(ActionCreator.setAuthStatus(true));
        history.push(AppRoute.ROOT);
      })
      .catch((err) => {
        throw err;
      });
  },
};

export {reducer, Operation, ActionType, ActionCreator};
