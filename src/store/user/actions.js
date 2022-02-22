import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});
//

export const logOut = () => ({ type: LOG_OUT });

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/signup`, {
        name,
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

export function storyDeleteById(id) {
  return {
    type: "USER/deleteById",
    payload: id,
  };
}

//TO DELETE THE STORYS
export function deleteStoryByID(id) {
  return async function thunk(dispatch, getState) {
    try {
      // dispatch();
      const response = await axios.delete(`${apiUrl}/stories/${id}`);
      console.log("response from thunk", response.data);
      console.log("Am I getting here?", response);

      // i went more deep and give the getAllSpaces, to have just an array otherwise could use just data
      dispatch(storyDeleteById(id));
    } catch (e) {}
  };
}

export function newStory(name, content, imageUrl) {
  return {
    type: "USERS/newStory",
    payload: name,
    content,
    imageUrl,
  };
}

export function createNewStory({ name, content, imageUrl, token }) {
  return async function thunk(dispatch, getState) {
    try {
      const { user } = getState();
      const spaceId = user.space.id;
      console.log(
        `THIS IS MY USER GETSTATE ${user}, and my spaceId from thiunk ${spaceId}`
      );
      const response = await axios.post(
        `${apiUrl}/stories/${spaceId}`,
        {
          name,
          content,
          imageUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("My token", token);
      console.log("response from thunk", response);
      //   console.log("Am I getting here?", response);

      // HERE WE ARE DISPATCHING THE MESSAGE WHO WILL RENDER ON THE TOP OF THE PAGE
      dispatch(
        showMessageWithTimeout("success", false, "Story posted on your space!")
      );
      // i went more deep and give the getAllSpaces, to have just an array otherwise could use just data
      dispatch(newStory(response.data));
    } catch (e) {}
  };
}

export function spaceToUpdate(update) {
  return {
    type: "SPACES/spaceToUpdate",
    payload: update,
  };
}

export function SpacesWillBeUpdate({
  title,
  description,
  backgroundColor,
  color,
  token,
}) {
  return async function thunk(dispatch, getState) {
    try {
      const { user } = getState();
      const spaceId = user.space.id;
      console.log(
        `THIS IS MY USER GETSTATE ${user}, and my spaceId from thunk ${spaceId}`
      );

      const response = await axios.put(
        `${apiUrl}/spaces/${spaceId}`,
        {
          title,
          description,
          backgroundColor,
          color,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("response from thunk", response.data);
      console.log("Am I getting here?", response);
      console.log("My token", token);

      // i went more deep and give the getAllSpaces, to have just an array otherwise could use just data
      dispatch(spaceToUpdate(response.data));
    } catch (e) {}
  };
}
