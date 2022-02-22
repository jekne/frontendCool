// src/store/restaurants/reducer.js
const initialState = {
  loading: true,
  change: [],
};

export default function reducer(state = initialState, action) {
  //   console.log("home reducer reveived", action);
  switch (action.type) {
    case "SPACES/spaceLoading": {
      return {
        ...state,
        loading: false,
      };
    }
    case "SPACES/allSpacesFetched": {
      //   console.log("action from reducer", action);
      //   console.log("action.PAYLOAD from reducer", action.payload);

      return {
        ...state,
        change: action.payload.its_The_Same_name_1,
      };
    }
    case "SPACES/spaceById": {
      //   console.log("action from reducer", action);
      // console.log("action.PAYLOAD from reducer", action.payload);
      return {
        ...state,
        //just with action payload
        change: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
