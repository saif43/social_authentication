import * as types from "../types";
import api from "../../api/api";

export const authStart = () => {
  return {
    type: types.AUTH_START,
  };
};

export const authSuccess = (token) => {
  return {
    type: types.AUTH_SUCCESS,
    payload: token,
  };
};

export const authFail = (error) => {
  return {
    type: types.AUTH_FAIL,
    payload: error,
  };
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("expirationDate");

  return {
    type: types.AUTH_LOGOUT,
  };
};

const checkAuthTimeout = (expirationDate) => {
  return (dispatch) => {
    setTimeout(() => dispatch(logout()), expirationDate * 1000);
  };
};

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    api
      .post("rest-auth/login/", {
        username,
        password,
      })
      .then((res) => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (username, email, password1, password2) => {
  return (dispatch) => {
    dispatch(authStart());
    api
      .post("rest-auth/registration/", {
        username,
        email,
        password1,
        password2,
      })
      .then((res) => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};
export const authcheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));

      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        const checkTimeOut =
          checkAuthTimeout(expirationDate.getTime() - new Date().getTime()) /
          1000;

        dispatch(checkTimeOut);
      }
    } else {
      dispatch(logout());
    }
  };
};
