import * as types from "../types";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  error: null,
  loading: null,
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.payload,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.payload,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_START:
      return authStart(state, action);
    case types.AUTH_SUCCESS:
      return authSuccess(state, action);
    case types.AUTH_FAIL:
      return authFail(state, action);
    case types.AUTH_LOGOUT:
      return authLogout(state, action);

    default:
      return state;
  }
};

export default reducer;
