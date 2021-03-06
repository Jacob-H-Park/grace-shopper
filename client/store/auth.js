import axios from "axios";

import history from "../history";

import { combineCart } from "../store/order";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";
const UPDATE = "UPDATE";
/**
 * ACTION CREATORS
 */
export const setAuth = (auth) => ({ type: SET_AUTH, auth });
const _updateAuth = (auth) => ({ type: UPDATE, auth });
/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });

    // Immediately after a user signed up or logged in
    // Check if there is a cart in the browser local storage
    // If yes, transmit the guest cart to user cart upon logged in
    const cart = JSON.parse(localStorage.getItem("cart"));

    if (cart) {
      dispatch(combineCart(res.data.id, cart));
      localStorage.removeItem("cart");
    }

    console.log("me", res.data);
    return dispatch(setAuth(res.data));
  }
};

export function authenticate(username, password, method, email) {
  return async (dispatch) => {
    try {
      let res;
      if (arguments.length === 3) {
        res = await axios.post(`/auth/${method}`, { username, password });
      } else {
        res = await axios.post(`/auth/${method}`, {
          username,
          password,
          email,
        });
      }
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };
}

export const updateAuth =
  (username, email, password, DOB, address, history) => async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const res = await axios.put(
        `/auth/edit`,
        { username, email, password,DOB,address },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(_updateAuth(res.data));
      history.push("/account");
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };
export const comparePass = (oldPassword) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    const res = await axios.post(
      "/auth/comparepassword",
      { oldPassword },
      {
        headers: {
          authorization: token,
        },
      }
    );
    console.log("compare pass", res.data.isTrue);
    return res.data.isTrue;
  } catch (err) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const updatePass = (password, history) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    const res = await axios.put(
      "/auth/changepassword",
      { password },
      {
        headers: {
          authorization: token,
        },
      }
    );
    history.push("/account");
  } catch (err) {
    return dispatch(setAuth({ error: authError }));
  }
};

// update user's favorite list
export const updateAuthFavoriteList = (favoriteList) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    const res = await axios.put(
      '/auth/favorite',
      { favoriteList },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(_updateAuth(res.data));
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => async(dispatch) => {
  // remove oauth login cookie session, in order to log user out
  const res = await axios.get("/auth/logout", {
    withCredentials: true
  });
  // also remove the user server token in the browser local storage
  window.localStorage.removeItem(TOKEN);
  // history.push("/login");
  // return {
  //   type: SET_AUTH,
  //   auth: {},
  // };
  dispatch(setAuth({}));
};

/**
 * Google OAuth login
 */
export const onSuccessGoogle = (googleResponse, history) => {
  return async (dispatch) => {
    // console.log('Login Success: currentUser:', googleResponse.profileObj);
    // console.log('Response from google:', googleResponse);
    // Check if a token was recieved and send it to our API:
    if (googleResponse.tokenId) {
      const res = await axios.post("/auth/googlelogin", {
        tokenId: googleResponse.tokenId,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
      history.push('/');
    }
  };
};

export const onFailureGoogle = (res) => {
  console.log("Login failed: res:", res);
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    case UPDATE:
      return action.auth;
    default:
      return state;
  }
}
