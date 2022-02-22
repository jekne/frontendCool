import axios from "axios";
import { apiUrl } from "../../config/constants";

export function loadingSpaces(nothing) {
  return {
    type: "SPACES/spaceLoading",
    payload: nothing,
  };
}

export function spaceFullyFetched(dont_matter_now) {
  return {
    type: "SPACES/allSpacesFetched",
    payload: dont_matter_now,
  };
}

export function fetchSpaces() {
  return async function thunk(dispatch, getState) {
    try {
      dispatch(loadingSpaces());
      const response = await axios.get(`${apiUrl}/spaces`);
      //   console.log("response from thunk", response.data);

      const its_The_Same_name_1 = response.data.getAllSpaces;
      // i went more deep and give the getAllSpaces, to have just an array otherwise could use just data
      dispatch(
        spaceFullyFetched({
          its_The_Same_name_1,
        })
      );
    } catch (e) {}
  };
}

export function spaceById(id) {
  return {
    type: "SPACES/spaceById",
    payload: id,
  };
}

export function SpacesByID(id) {
  return async function thunk(dispatch, getState) {
    try {
      dispatch(loadingSpaces());
      const response = await axios.get(`${apiUrl}/spaces/${id}`);
      console.log("response from thunk", response.data);
      //   console.log("Am I getting here?", response);
      const its_The_Same_name_1 = response.data.getSpaceByIdStoriesInclude;
      // i went more deep and give the getAllSpaces, to have just an array otherwise could use just data
      dispatch(
        spaceById({
          its_The_Same_name_1,
        })
      );
    } catch (e) {}
  };
}
